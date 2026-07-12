from math import ceil
from typing import Any

from pydantic import BaseModel, Field


class PaginationMeta(BaseModel):
    page: int
    limit: int
    total: int
    totalPages: int


class ApiEnvelope(BaseModel):
    success: bool
    message: str
    data: Any | None = None
    errors: dict[str, Any] = Field(default_factory=dict)


def pagination_meta(page: int, limit: int, total: int) -> dict[str, int]:
    return {
        "page": page,
        "limit": limit,
        "total": total,
        "totalPages": ceil(total / limit) if total else 0,
    }


def clamp_pagination(page: int = 1, limit: int = 10) -> tuple[int, int]:
    return max(page, 1), min(max(limit, 1), 50)
