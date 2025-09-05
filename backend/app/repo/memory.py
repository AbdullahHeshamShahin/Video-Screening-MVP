from typing import Dict, List
from .base import Repo, CandidateVideoDict


class MemoryRepo(Repo):
    def __init__(self) -> None:
        self._videos: Dict[str, CandidateVideoDict] = {}

    async def create_invite(self, invite_id: str) -> str:
        self._videos.setdefault(
            invite_id, {"invite_id": invite_id, "url": None, "tags": []}
        )
        return invite_id

    async def get_video(self, invite_id: str) -> CandidateVideoDict | None:
        return self._videos.get(invite_id) or {
            "invite_id": invite_id,
            "url": None,
            "tags": [],
        }

    async def set_video_url(self, invite_id: str, url: str) -> None:
        v = self._videos.setdefault(
            invite_id, {"invite_id": invite_id, "url": None, "tags": []}
        )
        v["url"] = url

    async def add_tag(self, invite_id: str, tag: str) -> List[str]:
        v = self._videos.setdefault(
            invite_id, {"invite_id": invite_id, "url": None, "tags": []}
        )
        tags: List[str] = v.get("tags", [])
        if tag not in tags:
            tags.append(tag)
        v["tags"] = tags
        return tags

    async def remove_tag(self, invite_id: str, tag: str) -> List[str]:
        v = self._videos.setdefault(
            invite_id, {"invite_id": invite_id, "url": None, "tags": []}
        )
        tags: List[str] = v.get("tags", [])
        if tag in tags:
            tags.remove(tag)
        v["tags"] = tags
        return tags
