# Omni Copilot

Omni Copilot is a chat-first universal AI workspace with a Next.js frontend and FastAPI + LangGraph backend.

## Monorepo Layout

- `frontend/` Next.js 14 App Router UI
- `backend/` FastAPI service with LangGraph orchestration

## Quick Start

### 1) Frontend

```bash
cd frontend
npm install
npm run dev
```

### 2) Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## Environment

Copy the examples and fill secrets.

- `frontend/.env.example`
- `backend/.env.example`

## Implemented Starter Slice

- Next.js + FastAPI monorepo scaffold
- 21st.dev sourced UI components wired into the product shell:
	- Animated chat input and chat visuals
	- Glassmorphism sidebar navigation
	- Command palette (Cmd+K)
	- Tool auth modal and connection cards
	- Upload card + uploader toast
	- Agent timeline / step tracker
	- Animated background paths
- App routes implemented:
	- `/login`
	- `/chat/[id]`
	- `/integrations`
	- `/memory`
	- `/settings`
- Streaming SSE chat path: FastAPI -> Next.js API route -> React hook
- LangGraph orchestrator with route-based specialist agent stubs:
	- DocsAgent
	- CommsAgent
	- CalendarAgent
	- CodeAgent
	- BrowserAgent
	- MemoryAgent
- FastAPI APIs implemented:
	- `POST /api/chat/stream`
	- `GET /api/integrations`
	- `POST /api/integrations/{tool_id}/connect`
	- `POST /api/integrations/{tool_id}/disconnect`
	- `POST /api/memory`
	- `GET /api/memory`
- NextAuth v5 Google provider wiring scaffold
- Prisma schema scaffold for user, tool connections, memory, and audit logs

## Validation Performed

- Frontend type check: `npm run typecheck`
- Frontend production build: `npm run build`
- Backend syntax check: `python -m compileall backend`
- Backend import smoke check: `python -c "import main; print(main.app.title)"` from `backend/`
