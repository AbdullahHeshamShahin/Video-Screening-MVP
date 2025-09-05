import strawberry
from typing import Optional, List


@strawberry.type
class CandidateVideo:
    invite_id: str
    url: Optional[str]
    tags: List[str]
