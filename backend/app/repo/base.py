from abc import ABC, abstractmethod
from typing import List, Optional, TypedDict


class CandidateVideoDict(TypedDict, total=False):
    invite_id: str
    url: Optional[str]
    tags: List[str]


class Repo(ABC):
    @abstractmethod
    async def create_invite(self, invite_id: str) -> str: ...
    @abstractmethod
    async def get_video(self, invite_id: str) -> CandidateVideoDict | None: ...
    @abstractmethod
    async def set_video_url(self, invite_id: str, url: str) -> None: ...
    @abstractmethod
    async def add_tag(self, invite_id: str, tag: str) -> List[str]: ...
