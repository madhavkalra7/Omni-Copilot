from __future__ import annotations

from agents.types import AgentEvent, AgentOutput
from tools.gmail import search_gmail_threads
from tools.slack import search_slack_messages


class CommsAgent:
    name = "CommsAgent"

    async def run(self, user_message: str) -> AgentOutput:
        events: list[AgentEvent] = [
            {"agent": self.name, "message": "Checking Gmail and Slack", "status": "running"}
        ]

        gmail_hits = await search_gmail_threads(user_message)
        slack_hits = await search_slack_messages(user_message)

        events.append(
            {
                "agent": self.name,
                "message": "Built communication digest",
                "status": "completed",
            }
        )

        answer = (
            f"I scanned communications and found {len(gmail_hits)} relevant Gmail threads "
            f"and {len(slack_hits)} Slack messages."
        )

        return {
            "answer": answer,
            "events": events,
            "tool_results": {"gmail": gmail_hits, "slack": slack_hits},
        }

