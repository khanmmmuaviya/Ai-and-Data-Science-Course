from fastapi import APIRouter, HTTPException, Query, status

from app.repositories import audit_logs
from app.repositories import jobs as repo
from app.schemas.common import clamp_pagination, pagination_meta
from app.schemas.job import JobCreate, JobUpdate
from app.services.validators import object_id_or_404
from app.utils.object_id import serialize_document, serialize_documents

router = APIRouter(prefix="/jobs", tags=["jobs"])


def envelope(success: bool, message: str, data=None, errors=None):
    return {"success": success, "message": message, "data": data, "errors": errors or {}}


@router.post("", status_code=status.HTTP_201_CREATED)
def create_job(payload: JobCreate):
    try:
        job = repo.create_job(payload.model_dump())
        audit_logs.log_event("job_created", "job", str(job["_id"]), metadata={"jobCode": job["jobCode"]})
        return envelope(True, "Job created successfully", serialize_document(job))
    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc)) from exc


@router.get("")
def list_jobs(
    search: str = "",
    status_filter: str = Query("", alias="status"),
    department: str = "",
    page: int = 1,
    limit: int = 10,
):
    page, limit = clamp_pagination(page, limit)
    try:
        jobs, total = repo.list_jobs({"search": search.strip(), "status": status_filter.strip(), "department": department.strip()}, page, limit)
        return envelope(True, "Jobs loaded successfully", {"items": serialize_documents(jobs), "pagination": pagination_meta(page, limit, total)})
    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc)) from exc


@router.get("/{job_id}")
def get_job(job_id: str):
    oid = object_id_or_404(job_id, "Job")
    try:
        job = repo.get_job(oid)
    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc)) from exc
    if job is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
    return envelope(True, "Job loaded successfully", serialize_document(job))


@router.patch("/{job_id}")
def update_job(job_id: str, payload: JobUpdate):
    oid = object_id_or_404(job_id, "Job")
    updates = payload.model_dump(exclude_unset=True)
    try:
        previous = repo.get_job(oid)
        if previous is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        job = repo.update_job(oid, updates)
        action = "job_status_changed" if "status" in updates and updates["status"] != previous.get("status") else "job_updated"
        audit_logs.log_event(action, "job", job_id, metadata={"jobCode": job["jobCode"]})
        return envelope(True, "Job updated successfully", serialize_document(job))
    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc)) from exc


@router.delete("/{job_id}")
def delete_job(job_id: str):
    oid = object_id_or_404(job_id, "Job")
    try:
        job, deleted = repo.delete_or_close_job(oid)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        audit_logs.log_event("job_deleted" if deleted else "job_status_changed", "job", job_id, metadata={"jobCode": job["jobCode"]})
        message = "Job deleted successfully" if deleted else "Job has candidates and was closed instead of deleted"
        return envelope(True, message, serialize_document(job))
    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc)) from exc
