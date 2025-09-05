from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_ENV: str = "dev"
    CORS_ORIGINS: str = (
        "http://localhost:5173,http://localhost:5174,http://localhost:5175"
    )
    # repo
    REPO_BACKEND: str = "mongo"  # "memory" | "mongo"
    MONGO_URI: str = ""
    MONGO_DB: str = "video_mvp"
    # storage
    STORAGE_BACKEND: str = "local"  # "local"
    UPLOAD_DIR: str = "app/uploads"

    class Config:
        env_file = ".env"


settings = Settings()
