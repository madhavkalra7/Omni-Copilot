from __future__ import annotations

from typing import Any


async def search_gmail_threads(query: str) -> list[dict[str, Any]]:
    if not query.strip():
        return []

    return [
        {
            "id": "gmail-thread-1",
            "subject": "Project sync follow-up",
            "snippet": "Can you share an update before tomorrow?",
            "from": "team@example.com",
        }
    ]
