from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api/integrations", tags=["integrations"])


class IntegrationState(BaseModel):
    id: str
    label: str
    connected: bool


INTEGRATIONS: dict[str, IntegrationState] = {
    "gmail": IntegrationState(id="gmail", label="Gmail", connected=False),
    "gcal": IntegrationState(id="gcal", label="Google Calendar", connected=False),
    "github": IntegrationState(id="github", label="GitHub", connected=False),
    "notion": IntegrationState(id="notion", label="Notion", connected=False),
    "slack": IntegrationState(id="slack", label="Slack", connected=False),
    "drive": IntegrationState(id="drive", label="Google Drive", connected=False),
}


@router.get("")
async def list_integrations() -> list[IntegrationState]:
    return list(INTEGRATIONS.values())


@router.post("/{tool_id}/connect")
async def connect_tool(tool_id: str) -> IntegrationState:
    item = INTEGRATIONS[tool_id]
    item.connected = True
    return item


@router.post("/{tool_id}/disconnect")
async def disconnect_tool(tool_id: str) -> IntegrationState:
    item = INTEGRATIONS[tool_id]
    item.connected = False
    return item
