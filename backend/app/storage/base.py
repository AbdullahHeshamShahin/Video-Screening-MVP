from abc import ABC, abstractmethod
from typing import BinaryIO


class Storage(ABC):
    @abstractmethod
    async def save(
        self, key: str, fileobj: BinaryIO, content_type: str | None = None
    ) -> str: ...
    @abstractmethod
    def url(self, key: str) -> str: ...
