from __future__ import annotations

import hashlib
import random
from collections.abc import Sequence
from typing import Any

from qdrant_client import QdrantClient
from qdrant_client.http import models

from core.config import settings


class MemoryVectorStore:
    def __init__(self) -> None:
        self._client = QdrantClient(url=settings.qdrant_url, api_key=settings.qdrant_api_key or None)
        self.collection = settings.qdrant_collection
        self.vector_size = 32

    async def ensure_collection(self) -> None:
        try:
            exists = self._client.collection_exists(self.collection)
        except Exception:
            return

        if not exists:
            self._client.create_collection(
                collection_name=self.collection,
                vectors_config=models.VectorParams(size=self.vector_size, distance=models.Distance.COSINE),
            )

    async def upsert_memory(self, user_id: str, text: str, metadata: dict[str, Any] | None = None) -> None:
        await self.ensure_collection()
        vector = build_embedding_stub(text, self.vector_size)
        payload = {"user_id": user_id, "text": text, **(metadata or {})}
        point_id = hashlib.md5(f"{user_id}:{text}".encode("utf-8")).hexdigest()
        self._client.upsert(
            collection_name=self.collection,
            points=[models.PointStruct(id=point_id, vector=vector, payload=payload)],
        )

    async def search_memory(self, query: str, limit: int = 5) -> list[dict[str, Any]]:
        await self.ensure_collection()
        vector = build_embedding_stub(query, self.vector_size)

        try:
            results = self._client.search(collection_name=self.collection, query_vector=vector, limit=limit)
        except Exception:
            return []

        parsed: list[dict[str, Any]] = []
        for row in results:
            payload = dict(row.payload or {})
            payload["score"] = row.score
            parsed.append(payload)
        return parsed


def build_embedding_stub(text: str, size: int) -> Sequence[float]:
    seed = int(hashlib.md5(text.encode("utf-8")).hexdigest(), 16)
    rng = random.Random(seed)
    return [rng.uniform(-1, 1) for _ in range(size)]


memory_store = MemoryVectorStore()

