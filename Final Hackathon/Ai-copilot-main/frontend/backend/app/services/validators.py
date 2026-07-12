from fastapi import HTTPException, status

from app.utils.object_id import is_valid_object_id, to_object_id


def object_id_or_404(value: str, label: str = "Record"):
    if not is_valid_object_id(value):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"{label} not found.")
    return to_object_id(value)


def split_skills(value: str | list[str]) -> list[str]:
    if isinstance(value, list):
        raw = value
    else:
        raw = value.replace("\n", ",").split(",")
    return [item.strip() for item in raw if item.strip()]
