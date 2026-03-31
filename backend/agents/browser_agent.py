from __future__ import annotations

from agents.types import AgentEvent, AgentOutput
from tools.browser import run_browser_task


class BrowserAgent:
    name = "BrowserAgent"

    async def run(self, user_message: str) -> AgentOutput:
        events: list[AgentEvent] = [
            {"agent": self.name, "message": "Preparing browser automation", "status": "running"}
        ]

        result = await run_browser_task(user_message)

        events.append(
            {
                "agent": self.name,
                "message": "Browser task simulated",
                "status": "completed",
            }
        )

        return {
            "answer": result,
            "events": events,
            "tool_results": {"browser": result},
        }

