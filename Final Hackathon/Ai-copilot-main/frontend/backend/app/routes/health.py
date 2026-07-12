from fastapi import APIRouter

from app.config import get_settings
from app.database import database_status

router = APIRouter()


@router.get("/health")
def health() -> dict[str, str | bool]:
    settings = get_settings()
    return {
        "success": True,
        "message": "AI Recruitment Co-Pilot API is running",
        "database": database_status(),
        "version": settings.api_version,
    }
