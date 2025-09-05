from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from pathlib import Path

from .settings import settings
from .graphql.schema import schema
from .repo.memory import MemoryRepo
from .repo.mongo import MongoRepo
from .storage.local import LocalStorage

# --- Repo wiring ---
repo = MemoryRepo()
client = None
if settings.REPO_BACKEND == "mongo":
    client = AsyncIOMotorClient(settings.MONGO_URI, server_api=ServerApi("1"))
    db = client[settings.MONGO_DB]
    repo = MongoRepo(db)  # type: ignore[assignment]

# --- Storage wiring ---
storage = LocalStorage(settings.UPLOAD_DIR)


# --- GraphQL Router with context (inject repo) ---
def get_context():
    return {"repo": repo}


graphql_app = GraphQLRouter(schema, context_getter=get_context)

app = FastAPI(title="Video Screening API (GraphQL + Upload)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in settings.CORS_ORIGINS.split(",")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(graphql_app, prefix="/graphql")


# Pragmatic REST upload endpoint (multipart form)
@app.post("/upload/{invite_id}")
async def upload(invite_id: str, file: UploadFile = File(...)):
    key = f"{invite_id}.webm"
    # Save content
    await storage.save(key, file.file, getattr(file, "content_type", None))  # type: ignore
    url = storage.url(key)
    await repo.set_video_url(invite_id, url)
    return {"status": "uploaded", "videoUrl": url}


@app.get("/health")
def health():
    return {"healthy": True}
