import strawberry
from strawberry.types import Info
from typing import Optional, List
from .types import CandidateVideo
from ..repo.base import Repo


@strawberry.type
class Query:
    @strawberry.field
    async def video(self, info: Info, invite_id: str) -> CandidateVideo:
        repo: Repo = info.context["repo"]
        v = await repo.get_video(invite_id)
        return CandidateVideo(invite_id=v["invite_id"], url=v["url"], tags=v["tags"])  # type: ignore


@strawberry.type
class Mutation:
    @strawberry.mutation
    async def createInvite(self, info: Info, invite_id: str) -> str:
        repo: Repo = info.context["repo"]
        return await repo.create_invite(invite_id)

    @strawberry.mutation
    async def addTag(self, info: Info, invite_id: str, tag: str) -> CandidateVideo:
        repo: Repo = info.context["repo"]
        tags = await repo.add_tag(invite_id, tag)
        v = await repo.get_video(invite_id)
        return CandidateVideo(invite_id=v["invite_id"], url=v["url"], tags=tags)  # type: ignore


schema = strawberry.Schema(query=Query, mutation=Mutation)
