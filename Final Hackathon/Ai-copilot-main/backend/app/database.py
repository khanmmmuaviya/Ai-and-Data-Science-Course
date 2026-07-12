from pymongo import ASCENDING, MongoClient
from pymongo.errors import PyMongoError

from app.config import get_settings

client: MongoClient | None = None


def connect_to_mongo() -> None:
    global client
    settings = get_settings()
    try:
        client = MongoClient(settings.mongodb_uri, serverSelectionTimeoutMS=2500)
        client.admin.command("ping")
        create_indexes()
    except PyMongoError:
        client = None


def get_database():
    if client is None:
        return None
    return client[get_settings().database_name]


def create_indexes() -> None:
    db = get_database()
    if db is None:
        return
    db.jobs.create_index([("jobCode", ASCENDING)], unique=True)
    db.jobs.create_index([("status", ASCENDING)])
    db.jobs.create_index([("createdAt", ASCENDING)])
    db.jobs.create_index([("department", ASCENDING)])
    db.candidates.create_index([("email", ASCENDING)])
    db.candidates.create_index([("jobId", ASCENDING)])
    db.candidates.create_index([("status", ASCENDING)])
    db.candidates.create_index([("createdAt", ASCENDING)])
    db.candidates.create_index([("email", ASCENDING), ("jobId", ASCENDING)], unique=True)
    db.audit_logs.create_index([("createdAt", ASCENDING)])


def close_mongo_connection() -> None:
    global client
    if client is not None:
        client.close()
    client = None


def database_status() -> str:
    if client is None:
        return "disconnected"
    try:
        client.admin.command("ping")
        return "connected"
    except PyMongoError:
        return "disconnected"
