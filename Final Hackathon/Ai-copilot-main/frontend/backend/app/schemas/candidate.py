from typing import Literal

from pydantic import BaseModel, EmailStr, Field, field_validator

from app.schemas.job import normalize_skills, normalize_whitespace

CandidateStatus = Literal["submitted", "reviewing", "shortlisted", "rejected", "withdrawn"]
ProcessingStatus = Literal["pending", "ready", "failed"]


class CandidateStatusUpdate(BaseModel):
    status: CandidateStatus


class CandidateForm(BaseModel):
    job_id: str
    full_name: str = Field(min_length=2, max_length=140)
    email: EmailStr
    phone: str = Field(min_length=5, max_length=40)
    education_level: str = Field(min_length=2, max_length=120)
    total_experience_years: float = Field(ge=0, le=60)
    current_job_title: str = Field(default="", max_length=140)
    skills: list[str] = Field(default_factory=list, max_length=40)
    expected_salary: float | None = Field(default=None, ge=0)
    current_location: str = Field(default="", max_length=160)
    consent_given: bool

    @field_validator("full_name", "phone", "education_level", "current_job_title", "current_location")
    @classmethod
    def clean_text(cls, value: str) -> str:
        return normalize_whitespace(value)

    @field_validator("email")
    @classmethod
    def lower_email(cls, value: EmailStr) -> str:
        return str(value).strip().lower()

    @field_validator("skills")
    @classmethod
    def clean_skills(cls, value: list[str]) -> list[str]:
        return normalize_skills(value)
