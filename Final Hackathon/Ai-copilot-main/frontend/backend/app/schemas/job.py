from typing import Literal

from pydantic import BaseModel, Field, field_validator


JobStatus = Literal["active", "inactive", "closed"]
EmploymentType = Literal["full-time", "part-time", "contract", "internship", "temporary"]


def normalize_whitespace(value: str) -> str:
    return " ".join(value.strip().split())


def normalize_skills(skills: list[str]) -> list[str]:
    normalized: list[str] = []
    seen: set[str] = set()
    for skill in skills:
        clean = normalize_whitespace(skill)
        key = clean.lower()
        if clean and key not in seen:
            normalized.append(clean)
            seen.add(key)
    return normalized


class JobCreate(BaseModel):
    title: str = Field(min_length=3, max_length=140)
    department: str = Field(min_length=2, max_length=100)
    description: str = Field(min_length=40, max_length=8000)
    requiredSkills: list[str] = Field(default_factory=list, max_length=40)
    minimumExperienceYears: float = Field(default=0, ge=0, le=60)
    educationRequirement: str = Field(default="", max_length=120)
    employmentType: EmploymentType = "full-time"
    location: str = Field(default="", max_length=160)
    vacancies: int = Field(default=1, ge=1, le=500)
    status: JobStatus = "active"

    @field_validator("title", "department", "description", "educationRequirement", "location")
    @classmethod
    def clean_text(cls, value: str) -> str:
        return normalize_whitespace(value)

    @field_validator("requiredSkills")
    @classmethod
    def clean_skills(cls, value: list[str]) -> list[str]:
        return normalize_skills(value)


class JobUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=3, max_length=140)
    department: str | None = Field(default=None, min_length=2, max_length=100)
    description: str | None = Field(default=None, min_length=40, max_length=8000)
    requiredSkills: list[str] | None = Field(default=None, max_length=40)
    minimumExperienceYears: float | None = Field(default=None, ge=0, le=60)
    educationRequirement: str | None = Field(default=None, max_length=120)
    employmentType: EmploymentType | None = None
    location: str | None = Field(default=None, max_length=160)
    vacancies: int | None = Field(default=None, ge=1, le=500)
    status: JobStatus | None = None

    @field_validator("title", "department", "description", "educationRequirement", "location")
    @classmethod
    def clean_optional_text(cls, value: str | None) -> str | None:
        return normalize_whitespace(value) if value is not None else value

    @field_validator("requiredSkills")
    @classmethod
    def clean_optional_skills(cls, value: list[str] | None) -> list[str] | None:
        return normalize_skills(value) if value is not None else value
