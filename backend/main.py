from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import strawberry
from strawberry.fastapi import GraphQLRouter
from typing import List, Optional, Dict

# --- Simple in-memory store ---
VIDEOS: Dict[str, Dict[str, object]] = (
    {}
)  # invite_id -> {"url": Optional[str], "tags": list[str]}


@strawberry.type
class CandidateVideo:
    invite_id: str
    url: Optional[str]
    tags: List[str]


@strawberry.type
class Query:
    def video(self, invite_id: str) -> CandidateVideo:
        v = VIDEOS.get(invite_id, {"url": None, "tags": []})
        return CandidateVideo(invite_id=invite_id, url=v["url"], tags=v["tags"])  # type: ignore


@strawberry.type
class Mutation:
    def createInvite(self, invite_id: str) -> str:
        VIDEOS.setdefault(invite_id, {"url": None, "tags": []})
        return invite_id

    def addTag(self, invite_id: str, tag: str) -> CandidateVideo:
        v = VIDEOS.setdefault(invite_id, {"url": None, "tags": []})
        tags: List[str] = v["tags"]  # type: ignore
        if tag not in tags:
            tags.append(tag)
        return CandidateVideo(invite_id=invite_id, url=v["url"], tags=tags)  # type: ignore


schema = strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQLRouter(schema)

app = FastAPI(title="Video Screening API (GraphQL + simple REST upload)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GraphQL endpoint
app.include_router(graphql_app, prefix="/graphql")

# Pragmatic REST upload endpoint (multipart form)
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@app.post("/upload/{invite_id}")
async def upload(invite_id: str, file: UploadFile = File(...)):
    dest = UPLOAD_DIR / f"{invite_id}.webm"
    with dest.open("wb") as f:
        f.write(await file.read())
    v = VIDEOS.setdefault(invite_id, {"url": None, "tags": []})
    v["url"] = str(dest)
    return {"status": "uploaded", "videoUrl": v["url"]}


@app.get("/health")
def health():
    return {"healthy": True}
