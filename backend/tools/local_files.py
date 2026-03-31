from __future__ import annotations

from typing import Any


async def search_local_files(query: str) -> list[dict[str, Any]]:
    if not query.strip():
        return []

    return [
        {
            "path": "workspace/notes/todo.md",
            "snippet": "Draft outreach plan and update architecture document.",
        }
    ]
