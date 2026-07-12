from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.config import get_settings
from app.database import close_mongo_connection, connect_to_mongo
from app.routes.candidates import router as candidates_router
from app.routes.health import router as health_router
from app.routes.jobs import router as jobs_router
from app.services.file_storage import ensure_upload_dirs


@asynccontextmanager
async def lifespan(app: FastAPI):
    ensure_upload_dirs()
    connect_to_mongo()
    yield
    close_mongo_connection()


settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version=settings.api_version,
    docs_url="/docs",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "message": str(exc.detail), "errors": {}},
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={"success": False, "message": "Validation failed.", "errors": {"fields": exc.errors()}},
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"success": False, "message": "Internal server error.", "errors": {}},
    )


@app.get("/")
def root() -> dict[str, str | bool]:
    return {
        "success": True,
        "message": "AI Recruitment Co-Pilot API is running",
        "version": settings.api_version,
    }


app.include_router(health_router, prefix="/api")
app.include_router(jobs_router, prefix="/api")
app.include_router(candidates_router, prefix="/api")
