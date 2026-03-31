from __future__ import annotations

from functools import lru_cache

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_env: str = "development"
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    cors_allow_origins: str = "http://localhost:3000"

    anthropic_api_key: str = ""
    openai_api_key: str = ""
    openai_embedding_model: str = "text-embedding-3-small"
    default_model: str = "claude-sonnet-4-20250514"
    fallback_model: str = "gpt-4o"

    upstash_redis_rest_url: str = ""
    upstash_redis_rest_token: str = ""

    database_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/omni"
    qdrant_url: str = "http://localhost:6333"
    qdrant_api_key: str = ""
    qdrant_collection: str = "omni_memory"

    jwt_issuer: str = "omni-copilot"
    jwt_audience: str = "omni-copilot-api"
    jwt_secret: str = "replace-with-long-secret"

    @field_validator("cors_allow_origins")
    @classmethod
    def normalize_origins(cls, value: str) -> str:
        return value.strip()

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.cors_allow_origins.split(",") if origin.strip()]


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
