from datetime import datetime, timezone
from typing import Any

from bson import ObjectId
from pymongo.errors import DuplicateKeyError

from app.database import get_database


def now_utc() -> datetime:
    return datetime.now(timezone.utc)


def require_db():
    db = get_database()
    if db is None:
        raise RuntimeError("MongoDB is unavailable.")
    return db


def next_job_code(db) -> str:
    year = now_utc().year
    count = db.jobs.count_documents({"jobCode": {"$regex": f"^JOB-{year}-"}})
    return f"JOB-{year}-{count + 1:04d}"


def create_job(payload: dict[str, Any]) -> dict[str, Any]:
    db = require_db()
    document = {
        **payload,
        "jobCode": next_job_code(db),
        "createdAt": now_utc(),
        "updatedAt": now_utc(),
    }
    try:
        result = db.jobs.insert_one(document)
    except DuplicateKeyError:
        document["jobCode"] = next_job_code(db)
        result = db.jobs.insert_one(document)
    return db.jobs.find_one({"_id": result.inserted_id})


def list_jobs(filters: dict[str, Any], page: int, limit: int) -> tuple[list[dict[str, Any]], int]:
    db = require_db()
    query: dict[str, Any] = {}
    if filters.get("status"):
        query["status"] = filters["status"]
    if filters.get("department"):
        query["department"] = {"$regex": filters["department"], "$options": "i"}
    if filters.get("search"):
        search = filters["search"]
        query["$or"] = [
            {"jobCode": {"$regex": search, "$options": "i"}},
            {"title": {"$regex": search, "$options": "i"}},
            {"department": {"$regex": search, "$options": "i"}},
        ]
    total = db.jobs.count_documents(query)
    docs = list(db.jobs.find(query).sort("createdAt", -1).skip((page - 1) * limit).limit(limit))
    return docs, total


def get_job(job_id: ObjectId) -> dict[str, Any] | None:
    return require_db().jobs.find_one({"_id": job_id})


def update_job(job_id: ObjectId, payload: dict[str, Any]) -> dict[str, Any] | None:
    if not payload:
        return get_job(job_id)
    payload["updatedAt"] = now_utc()
    db = require_db()
    db.jobs.update_one({"_id": job_id}, {"$set": payload})
    return db.jobs.find_one({"_id": job_id})


def delete_or_close_job(job_id: ObjectId) -> tuple[dict[str, Any] | None, bool]:
    db = require_db()
    job = db.jobs.find_one({"_id": job_id})
    if job is None:
        return None, False
    has_candidates = db.candidates.count_documents({"jobId": job_id}) > 0
    if has_candidates:
        updated = update_job(job_id, {"status": "closed"})
        return updated, False
    db.jobs.delete_one({"_id": job_id})
    return job, True
