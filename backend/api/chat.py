from __future__ import annotations

import asyncio

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from agents.orchestrator import run_orchestration
from core.auth import get_current_user_optional
from core.streaming import format_sse, stream_text_tokens

router = APIRouter(prefix="/api/chat", tags=["chat"])


class ChatRequest(BaseModel):
    chatId: str = Field(min_length=1)
    message: str = Field(min_length=1)


@router.post("/stream")
async def stream_chat(
    payload: ChatRequest,
    user: dict | None = Depends(get_current_user_optional),
) -> StreamingResponse:
    async def event_generator():
        try:
            state = await run_orchestration(chat_id=payload.chatId, message=payload.message)

            for status_event in state["events"]:
                yield format_sse("status", status_event)
                await asyncio.sleep(0.03)

            async for token_event in stream_text_tokens(state["answer"], delay=0.018):
                yield token_event

            yield format_sse(
                "done",
                {
                    "chatId": payload.chatId,
                    "route": state["route"],
                    "tools": list(state["tool_results"].keys()),
                    "user": user.get("sub") if user else "anonymous",
                },
            )
        except Exception as exc:
            yield format_sse("error", str(exc))

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache, no-transform",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )

