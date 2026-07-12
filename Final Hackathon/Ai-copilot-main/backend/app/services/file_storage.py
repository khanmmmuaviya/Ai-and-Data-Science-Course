from pathlib import Path
from uuid import uuid4

import fitz
from fastapi import HTTPException, UploadFile, status
from PIL import Image, UnidentifiedImageError

MAX_SIZE_BYTES = 5 * 1024 * 1024
MAX_PDF_PAGES = 10
MAX_IMAGE_DIMENSION = 5000
UPLOAD_ROOT = Path(__file__).resolve().parents[2] / "uploads"
RESUME_DIR = UPLOAD_ROOT / "resumes"
IMAGE_DIR = UPLOAD_ROOT / "resume-images"


def ensure_upload_dirs() -> None:
    RESUME_DIR.mkdir(parents=True, exist_ok=True)
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)


async def read_limited(file: UploadFile) -> bytes:
    content = await file.read()
    if len(content) > MAX_SIZE_BYTES:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Uploaded file must be 5 MB or smaller.")
    return content


def safe_name(extension: str) -> str:
    return f"{uuid4().hex}{extension.lower()}"


async def store_resume_pdf(file: UploadFile) -> dict:
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Resume must be a PDF file.")
    if file.content_type not in {"application/pdf", "application/x-pdf"}:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Resume MIME type must be application/pdf.")
    content = await read_limited(file)
    if not content.startswith(b"%PDF"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Resume is not a valid PDF.")
    try:
        document = fitz.open(stream=content, filetype="pdf")
        if document.is_encrypted:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Encrypted PDFs are not supported.")
        page_count = document.page_count
        if page_count < 1 or page_count > MAX_PDF_PAGES:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Resume PDF must contain 1 to 10 pages.")
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Resume PDF is corrupt or unsupported.") from exc
    finally:
        try:
            document.close()
        except Exception:
            pass
    ensure_upload_dirs()
    stored_name = safe_name(".pdf")
    path = RESUME_DIR / stored_name
    path.write_bytes(content)
    return {
        "originalName": Path(file.filename).name,
        "storedName": stored_name,
        "relativePath": f"uploads/resumes/{stored_name}",
        "mimeType": "application/pdf",
        "sizeBytes": len(content),
        "pageCount": page_count,
    }


async def store_resume_image(file: UploadFile | None) -> dict | None:
    if file is None or not file.filename:
        return None
    allowed = {"image/png": ".png", "image/jpeg": ".jpg", "image/webp": ".webp"}
    if file.content_type not in allowed:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Supporting document image must be PNG, JPEG or WEBP.")
    content = await read_limited(file)
    try:
        from io import BytesIO

        image = Image.open(BytesIO(content))
        image.verify()
        image = Image.open(BytesIO(content))
        width, height = image.size
        if width > MAX_IMAGE_DIMENSION or height > MAX_IMAGE_DIMENSION:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Supporting image dimensions must be 5000x5000 or smaller.")
        clean = Image.new(image.mode, image.size)
        clean.putdata(list(image.getdata()))
        buffer = BytesIO()
        fmt = "JPEG" if file.content_type == "image/jpeg" else image.format
        clean.save(buffer, format=fmt)
        sanitized = buffer.getvalue()
    except HTTPException:
        raise
    except (UnidentifiedImageError, OSError, ValueError) as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Supporting document image is corrupt or unsupported.") from exc
    ensure_upload_dirs()
    extension = allowed[file.content_type]
    stored_name = safe_name(extension)
    path = IMAGE_DIR / stored_name
    path.write_bytes(sanitized)
    return {
        "originalName": Path(file.filename).name,
        "storedName": stored_name,
        "relativePath": f"uploads/resume-images/{stored_name}",
        "mimeType": file.content_type,
        "sizeBytes": len(sanitized),
        "width": width,
        "height": height,
    }


def delete_upload(metadata: dict | None) -> None:
    if not metadata:
        return
    relative = metadata.get("relativePath", "")
    path = (UPLOAD_ROOT.parent / relative).resolve()
    if UPLOAD_ROOT.resolve() in path.parents and path.exists():
        path.unlink()


def resume_path(metadata: dict) -> Path:
    relative = metadata.get("relativePath", "")
    path = (UPLOAD_ROOT.parent / relative).resolve()
    if UPLOAD_ROOT.resolve() not in path.parents or not path.exists():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resume file not found.")
    return path
