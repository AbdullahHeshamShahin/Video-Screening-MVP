from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase
from .base import Repo, CandidateVideoDict


class MongoRepo(Repo):
    def __init__(self, db: AsyncIOMotorDatabase) -> None:
        self.db = db
        self.col = self.db["videos"]

    async def create_invite(self, invite_id: str) -> str:
        await self.col.update_one(
            {"invite_id": invite_id},
            {"$setOnInsert": {"invite_id": invite_id, "url": None, "tags": []}},
            upsert=True,
        )
        return invite_id

    async def get_video(self, invite_id: str) -> CandidateVideoDict | None:
        doc = await self.col.find_one({"invite_id": invite_id}, {"_id": 0})
        return doc or {"invite_id": invite_id, "url": None, "tags": []}

    async def set_video_url(self, invite_id: str, url: str) -> None:
        await self.col.update_one(
            {"invite_id": invite_id}, {"$set": {"url": url}}, upsert=True
        )

    async def add_tag(self, invite_id: str, tag: str) -> List[str]:
        await self.col.update_one(
            {"invite_id": invite_id}, {"$addToSet": {"tags": tag}}, upsert=True
        )
        doc = await self.col.find_one({"invite_id": invite_id}, {"_id": 0, "tags": 1})
        return (doc or {}).get("tags", [])

    async def remove_tag(self, invite_id: str, tag: str) -> List[str]:
        await self.col.update_one(
            {"invite_id": invite_id}, {"$pull": {"tags": tag}}, upsert=True
        )
        doc = await self.col.find_one({"invite_id": invite_id}, {"_id": 0, "tags": 1})
        return (doc or {}).get("tags", [])
