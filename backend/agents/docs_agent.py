from __future__ import annotations

from agents.types import AgentEvent, AgentOutput
from tools.gdrive import search_drive_files
from tools.local_files import search_local_files


class DocsAgent:
    name = "DocsAgent"

    async def run(self, user_message: str) -> AgentOutput:
        running: AgentEvent = {
            "agent": self.name,
            "message": "Searching Google Drive and local docs",
            "status": "running",
        }

        drive_hits = await search_drive_files(user_message)
        local_hits = await search_local_files(user_message)

        summary_parts = []
        if drive_hits:
            summary_parts.append(f"Found {len(drive_hits)} Drive items")
        if local_hits:
            summary_parts.append(f"Found {len(local_hits)} local files")

        if not summary_parts:
            summary = "I could not find matching docs yet. Connect Drive or upload files to continue."
        else:
            summary = ". ".join(summary_parts)

        completed: AgentEvent = {
            "agent": self.name,
            "message": "Prepared document summary",
            "status": "completed",
        }

        return {
            "answer": f"{summary}. I can draft a concise brief if you want.",
            "events": [running, completed],
            "tool_results": {
                "drive": drive_hits,
                "local_files": local_hits,
            },
        }

