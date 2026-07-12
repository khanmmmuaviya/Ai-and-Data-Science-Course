from fastapi import APIRouter, File, Form, HTTPException, Query, UploadFile, status
from fastapi.responses import FileResponse

from app.repositories import audit_logs
from app.repositories import candidates as repo
from app.repositories import jobs as jobs_repo
from app.schemas.candidate import CandidateForm, CandidateStatusUpdate
from app.schemas.common import clamp_pagination, pagination_meta
from app.services.file_storage import delete_upload, resume_path, store_resume_image, store_resume_pdf
from app.services.validators import object_id_or_404, split_skills
from app.utils.object_id import serialize_document, serialize_documents

router = APIRouter(prefix="/candidates", tags=["candidates"])


def envelope(success: bool, message: str, data=None, errors=None):
    return {"success": success, "message": message, "data": data, "errors": errors or {}}


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_candidate(
    job_id: str = Form(...),
    full_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    education_level: str = Form(...),
    total_experience_years: float = Form(...),
    current_job_title: str = Form(""),
    skills: str = Form(""),
    expected_salary: float | None = Form(None),
    current_location: str = Form(""),
    consent_given: bool = Form(...),
    resume: UploadFile = File(...),
    resume_image: UploadFile | None = File(None),
):
    job_oid = object_id_or_404(job_id, "Job")
    form = CandidateForm(
        job_id=job_id,
        full_name=full_name,
        email=email,
        phone=phone,
        education_level=education_level,
        total_experience_years=total_experience_years,
        current_job_title=current_job_title,
        skills=split_skills(skills),
        expected_salary=expected_salary,
        current_location=current_location,
        consent_given=consent_given,
    )
    if not form.consent_given:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Consent is required to register a candidate.")
    saved_resume = None
    saved_image = None
    try:
        job = jobs_repo.get_job(job_oid)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        if job.get("status") == "closed":
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="This job is closed.")
        saved_resume = await store_resume_pdf(resume)
        saved_image = await store_resume_image(resume_image)
        candidate = repo.create_candidate(
            {
                "jobId": job_oid,
                "fullName": form.full_name,
                "email": form.email,
                "phone": form.phone,
                "educationLevel": form.education_level,
                "totalExperienceYears": form.total_experience_years,
                "currentJobTitle": form.current_job_title,
                "skills": form.skills,
                "expectedSalary": form.expected_salary,
                "currentLocation": form.current_location,
                "resume": saved_resume,
                "resumeImage": saved_image,
                "consentGiven": form.consent_given,
            }
        )
        audit_logs.log_event("candidate_registered", "candidate", str(candidate["_id"]), metadata={"jobId": job_id})
        return envelope(True, "Candidate registered successfully", serialize_document(candidate))
    except ValueError as exc:
        delete_upload(saved_resume)
        delete_upload(saved_image)
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(exc)) from exc
    except RuntimeError as exc:
        delete_upload(saved_resume)
        delete_upload(saved_image)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc)) from exc
    except HTTPException:
        delete_upload(saved_resume)
        delete_upload(saved_image)
        raise


@router.get("")
def list_candidates(
    search: str = "",
    job_id: str = "",
    status_filter: str = Query("", alias="status"),
    processing_status: str = "",
    page: int = 1,
    limit: int = 10,
):
    page, limit = clamp_pagination(page, limit)
    if job_id:
        object_id_or_404(job_id, "Job")
    try:
        candidates, total = repo.list_candidates(
            {"search": search.strip(), "job_id": job_id.strip(), "status": status_filter.strip(), "processing_status": processing_status.strip()},
            page,
            limit,
        )
        db = jobs_repo.require_db()
        job_ids = [candidate["jobId"] for candidate in candidates]
        jobs = {str(job["_id"]): job for job in db.jobs.find({"_id": {"$in": job_ids}})} if job_ids else {}
        items = []
        for candidate in candidates:
            item = serialize_document(candidate)
            item["job"] = serialize_document(jobs.get(str(candidate["jobId"])))
            items.append(item)
        return envelope(True, "Candidates loaded successfully", {"items": items, "pagination": pagination_meta(page, limit, total)})
    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc)) from exc


@router.get("/{candidate_id}")
def get_candidate(candidate_id: str):
    oid = object_id_or_404(candidate_id, "Candidate")
    try:
        candidate = repo.get_candidate(oid)
        if candidate is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Candidate not found.")
        item = serialize_document(candidate)
        item["job"] = serialize_document(jobs_repo.get_job(candidate["jobId"]))
        return envelope(True, "Candidate loaded successfully", item)
    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc)) from exc


@router.patch("/{candidate_id}/status")
def update_candidate_status(candidate_id: str, payload: CandidateStatusUpdate):
    oid = object_id_or_404(candidate_id, "Candidate")
    try:
        candidate = repo.update_candidate_status(oid, payload.status)
        if candidate is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Candidate not found.")
        audit_logs.log_event("candidate_status_changed", "candidate", candidate_id, metadata={"status": payload.status})
        return envelope(True, "Candidate status updated successfully", serialize_document(candidate))
    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc)) from exc


@router.get("/{candidate_id}/resume")
def download_resume(candidate_id: str):
    oid = object_id_or_404(candidate_id, "Candidate")
    try:
        candidate = repo.get_candidate(oid)
        if candidate is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Candidate not found.")
        path = resume_path(candidate["resume"])
        audit_logs.log_event("resume_downloaded", "candidate", candidate_id)
        return FileResponse(path, media_type="application/pdf", filename=candidate["resume"]["originalName"])
    except RuntimeError as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc)) from exc
