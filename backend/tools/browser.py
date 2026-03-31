from __future__ import annotations


async def run_browser_task(prompt: str) -> str:
    if not prompt.strip():
        return "No browser task requested."

    return "Browser automation stub executed. Connect Playwright-backed MCP to run live tasks."
