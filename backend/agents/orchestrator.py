from __future__ import annotations

from typing import cast

from langgraph.graph import END, START, StateGraph

from agents.browser_agent import BrowserAgent
from agents.calendar_agent import CalendarAgent
from agents.code_agent import CodeAgent
from agents.comms_agent import CommsAgent
from agents.docs_agent import DocsAgent
from agents.memory_agent import MemoryAgent
from agents.types import AgentOutput, AgentRoute, GraphState


docs_agent = DocsAgent()
comms_agent = CommsAgent()
calendar_agent = CalendarAgent()
code_agent = CodeAgent()
browser_agent = BrowserAgent()
memory_agent = MemoryAgent()


def route_intent(message: str) -> AgentRoute:
    text = message.lower()

    if any(word in text for word in ["gmail", "slack", "outlook", "email", "message"]):
        return "comms"
    if any(word in text for word in ["calendar", "meeting", "schedule", "invite"]):
        return "calendar"
    if any(word in text for word in ["github", "gitlab", "pr", "pull request", "code"]):
        return "code"
    if any(word in text for word in ["browser", "form", "scrape", "web", "site", "playwright"]):
        return "browser"
    if any(word in text for word in ["remember", "memory", "preference", "context"]):
        return "memory"
    return "docs"


async def orchestrator_node(state: GraphState) -> dict:
    route = route_intent(state["message"])
    return {
        "route": route,
    }


async def docs_node(state: GraphState) -> dict:
    output: AgentOutput = await docs_agent.run(state["message"])
    return output


async def comms_node(state: GraphState) -> dict:
    output: AgentOutput = await comms_agent.run(state["message"])
    return output


async def calendar_node(state: GraphState) -> dict:
    output: AgentOutput = await calendar_agent.run(state["message"])
    return output


async def code_node(state: GraphState) -> dict:
    output: AgentOutput = await code_agent.run(state["message"])
    return output


async def browser_node(state: GraphState) -> dict:
    output: AgentOutput = await browser_agent.run(state["message"])
    return output


async def memory_node(state: GraphState) -> dict:
    output: AgentOutput = await memory_agent.run(state["message"])
    return output


def pick_route(state: GraphState) -> str:
    return cast(str, state["route"])


def build_graph():
    graph = StateGraph(GraphState)

    graph.add_node("orchestrator", orchestrator_node)
    graph.add_node("docs", docs_node)
    graph.add_node("comms", comms_node)
    graph.add_node("calendar", calendar_node)
    graph.add_node("code", code_node)
    graph.add_node("browser", browser_node)
    graph.add_node("memory", memory_node)

    graph.add_edge(START, "orchestrator")
    graph.add_conditional_edges(
        "orchestrator",
        pick_route,
        {
            "docs": "docs",
            "comms": "comms",
            "calendar": "calendar",
            "code": "code",
            "browser": "browser",
            "memory": "memory",
        },
    )

    graph.add_edge("docs", END)
    graph.add_edge("comms", END)
    graph.add_edge("calendar", END)
    graph.add_edge("code", END)
    graph.add_edge("browser", END)
    graph.add_edge("memory", END)

    return graph.compile()


graph = build_graph()


async def run_orchestration(chat_id: str, message: str) -> GraphState:
    initial_state: GraphState = {
        "chat_id": chat_id,
        "message": message,
        "route": "docs",
        "answer": "",
        "events": [],
        "tool_results": {},
    }

    result = await graph.ainvoke(initial_state)
    return cast(GraphState, result)

