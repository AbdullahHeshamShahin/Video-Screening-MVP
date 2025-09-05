from pathlib import Path
from typing import BinaryIO
from .base import Storage


class LocalStorage(Storage):
    def __init__(self, base_dir: str) -> None:
        self.base = Path(base_dir)
        self.base.mkdir(parents=True, exist_ok=True)

    async def save(
        self, key: str, fileobj: BinaryIO, content_type: str | None = None
    ) -> str:
        dest = self.base / key
        dest.parent.mkdir(parents=True, exist_ok=True)
        with open(dest, "wb") as f:
            f.write(fileobj.read())
        return str(dest)

    def url(self, key: str) -> str:
        return str(self.base / key)
