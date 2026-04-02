from __future__ import annotations

import json
from typing import Any

from core.config import settings

try:
    from openai import AsyncOpenAI  # type: ignore[import-not-found]
except Exception:  # pragma: no cover - handled gracefully at runtime
    AsyncOpenAI = None  # type: ignore[assignment]

_client: Any | None = None


def _get_client() -> Any | None:
    global _client

    if _client is not None:
        return _client

    if not settings.openai_api_key or AsyncOpenAI is None:
        return None

    _client = AsyncOpenAI(api_key=settings.openai_api_key)
    return _client


async def generate_assistant_reply(
    user_message: str,
    *,
    system_prompt: str,
    context: dict[str, Any] | None = None,
    max_tokens: int = 300,
) -> str | None:
    client = _get_client()
    if client is None:
        return None

    context_text = ""
    if context:
        context_text = "\n\nContext JSON:\n" + json.dumps(context, ensure_ascii=True)

    user_payload = f"User message:\n{user_message}{context_text}"

    for model in (settings.default_model, settings.fallback_model):
        try:
            completion = await client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_payload},
                ],
                temperature=0.3,
                max_tokens=max_tokens,
            )
            answer = completion.choices[0].message.content
            if isinstance(answer, str) and answer.strip():
                return answer.strip()
        except Exception:
            continue

    return None
