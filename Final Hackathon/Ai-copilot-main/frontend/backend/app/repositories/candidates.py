from typing import Any

from bson import ObjectId
from pymongo.errors import DuplicateKeyError

from app.repositories.jobs import now_utc, require_db


def next_candidate_code(db) -> str:
    year = now_utc().year
    count = db.candidates.count_documents({"candidateCode": {"$regex": f"^CAN-{year}-"}})
    return f"CAN-{year}-{count + 1:04d}"


def create_candidate(payload: dict[str, Any]) -> dict[str, Any]:
    db = require_db()
    document = {
        **payload,
        "candidateCode": next_candidate_code(db),
        "status": "submitted",
        "processingStatus": "pending",
        "createdAt": now_utc(),
        "updatedAt": now_utc(),
    }
    try:
        result = db.candidates.insert_one(document)
    except DuplicateKeyError as exc:
        raise ValueError("A candidate with this email is already registered for this job.") from exc
    return db.candidates.find_one({"_id": result.inserted_id})


def list_candidates(filters: dict[str, Any], page: int, limit: int) -> tuple[list[dict[str, Any]], int]:
    db = require_db()
    query: dict[str, Any] = {}
    if filters.get("job_id"):
        query["jobId"] = ObjectId(filters["job_id"])
    if filters.get("status"):
        query["status"] = filters["status"]
    if filters.get("processing_status"):
        query["processingStatus"] = filters["processing_status"]
    if filters.get("search"):
        search = filters["search"]
        query["$or"] = [
            {"candidateCode": {"$regex": search, "$options": "i"}},
            {"fullName": {"$regex": search, "$options": "i"}},
            {"email": {"$regex": search, "$options": "i"}},
        ]
    total = db.candidates.count_documents(query)
    docs = list(db.candidates.find(query).sort("createdAt", -1).skip((page - 1) * limit).limit(limit))
    return docs, total


def get_candidate(candidate_id: ObjectId) -> dict[str, Any] | None:
    return require_db().candidates.find_one({"_id": candidate_id})


def update_candidate_status(candidate_id: ObjectId, status: str) -> dict[str, Any] | None:
    db = require_db()
    db.candidates.update_one({"_id": candidate_id}, {"$set": {"status": status, "updatedAt": now_utc()}})
    return db.candidates.find_one({"_id": candidate_id})
