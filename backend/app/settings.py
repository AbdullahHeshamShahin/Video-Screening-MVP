from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_ENV: str = "dev"
    CORS_ORIGINS: str = (
        "http://localhost:5173,http://localhost:5174,http://localhost:5175"
    )
    # repo
    REPO_BACKEND: str = "mongo"  # "memory" | "mongo"
    MONGO_URI: str = (
        "mongodb+srv://abdullahesham123_db_user:jRC4619ba67jhxVj@cluster0.za6aqxc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    MONGO_DB: str = "video_mvp"
    # storage
    STORAGE_BACKEND: str = "local"  # "local"
    UPLOAD_DIR: str = "app/uploads"

    class Config:
        env_file = ".env"


settings = Settings()
