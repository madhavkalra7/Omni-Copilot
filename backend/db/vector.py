from __future__ import annotations

import hashlib
import random
from collections.abc import Sequence
from typing import Any

from fastembed import TextEmbedding
from qdrant_client import QdrantClient
from qdrant_client.http import models

from core.config import settings


class MemoryVectorStore:
    def __init__(self) -> None:
        self._client = QdrantClient(url=settings.qdrant_url, api_key=settings.qdrant_api_key or None)
        self.collection = settings.qdrant_collection
        self.vector_size = 384
        self._embedder: TextEmbedding | None = None

    def _get_embedder(self) -> TextEmbedding:
        if self._embedder is None:
            self._embedder = TextEmbedding(model_name=settings.embedding_model)
        return self._embedder

    def _embed_text(self, text: str) -> Sequence[float]:
        try:
            vector = next(self._get_embedder().embed([text]))
            values = vector.tolist() if hasattr(vector, "tolist") else list(vector)
            if len(values) != self.vector_size:
                self.vector_size = len(values)
            return values
        except Exception:
            # Keep memory routes available in local/dev even when model download fails.
            return build_embedding_stub(text, self.vector_size)

    def _collection_vector_size(self) -> int | None:
        try:
            collection_info = self._client.get_collection(self.collection)
        except Exception:
            return None

        vectors = collection_info.config.params.vectors
        if isinstance(vectors, models.VectorParams):
            return int(vectors.size)
        if isinstance(vectors, dict):
            first_vector = next(iter(vectors.values()), None)
            if first_vector is not None:
                return int(first_vector.size)
        return None

    async def ensure_collection(self) -> None:
        try:
            exists = self._client.collection_exists(self.collection)
        except Exception:
            return

        if exists:
            existing_size = self._collection_vector_size()
            if existing_size is not None and existing_size != self.vector_size:
                self._client.recreate_collection(
                    collection_name=self.collection,
                    vectors_config=models.VectorParams(size=self.vector_size, distance=models.Distance.COSINE),
                )
            return

        if not exists:
            self._client.create_collection(
                collection_name=self.collection,
                vectors_config=models.VectorParams(size=self.vector_size, distance=models.Distance.COSINE),
            )

    async def upsert_memory(self, user_id: str, text: str, metadata: dict[str, Any] | None = None) -> None:
        await self.ensure_collection()
        vector = self._embed_text(text)
        payload = {"user_id": user_id, "text": text, **(metadata or {})}
        point_id = hashlib.md5(f"{user_id}:{text}".encode("utf-8")).hexdigest()
        self._client.upsert(
            collection_name=self.collection,
            points=[models.PointStruct(id=point_id, vector=vector, payload=payload)],
        )

    async def search_memory(self, query: str, limit: int = 5) -> list[dict[str, Any]]:
        await self.ensure_collection()
        vector = self._embed_text(query)

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

