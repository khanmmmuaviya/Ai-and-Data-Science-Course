from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "AI Recruitment Co-Pilot"
    app_env: str = "development"
    api_version: str = "1.0.0"
    mongodb_uri: str = "mongodb://localhost:27017"
    database_name: str = "ai_recruitment"
    frontend_url: str = "http://localhost:3000"
    gemini_api_key: str = ""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")


@lru_cache
def get_settings() -> Settings:
    return Settings()
