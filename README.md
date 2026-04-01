# Omni Copilot

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.116-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![LangGraph](https://img.shields.io/badge/LangGraph-Orchestrator-4B5563?style=for-the-badge)](https://www.langchain.com/langgraph)
[![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

Omni Copilot is a chat-first universal AI workspace that orchestrates your daily tools from one interface.

## What You Get

- Real-time chat with streaming responses
- Agent activity timeline with step updates
- Tool integrations hub (Gmail, Calendar, GitHub, Notion, Slack, Drive stubs)
- Command palette workflow (`Cmd+K`)
- Memory viewer/editor
- Action history with undo patterns
- Separate dark and light landing pages for visual QA

## Theme Routes

- `/dark` forces dark mode landing experience
- `/light` forces light mode landing experience
- `/` uses your saved theme preference

## Monorepo Structure

```text
frontend/  -> Next.js App Router (UI, auth, Prisma schema, API proxy)
backend/   -> FastAPI + LangGraph orchestration and tool/api stubs
```

## Tech Stack

### Frontend

- Next.js 14 + TypeScript
- Tailwind CSS + Framer Motion
- shadcn/ui primitives + 21st-inspired components
- Zustand + React Query
- NextAuth v5
- Prisma

### Backend

- FastAPI
- LangGraph (multi-agent orchestration)
- Pydantic v2
- SQLAlchemy + Psycopg
- Qdrant client + FastEmbed (`sentence-transformers/all-MiniLM-L6-v2`)
- Upstash/Redis ready config

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

## Environment Setup

Configured files:

- `frontend/.env`
- `frontend/.env.example`
- `backend/.env`
- `backend/.env.example`

`*.env.example` files intentionally use placeholders only. Add your real keys and database URL in local `.env` files.

## Prisma Database and Studio

From `frontend/` run:

```bash
npx prisma generate --config prisma.config.ts
npx prisma db push --config prisma.config.ts
npx prisma studio --config prisma.config.ts
```

This will generate the client, sync tables from `prisma/schema.prisma`, and open Prisma Studio with expected models.

## Core API Endpoints

- `GET /health`
- `POST /api/chat/stream`
- `GET /api/integrations`
- `POST /api/integrations/{tool_id}/connect`
- `POST /api/integrations/{tool_id}/disconnect`
- `GET /api/memory`
- `POST /api/memory`

## Current Agent Nodes

- OrchestratorAgent
- DocsAgent
- CommsAgent
- CalendarAgent
- CodeAgent
- BrowserAgent
- MemoryAgent

## Scripts

From `frontend/`:

- `npm run dev`
- `npm run build`
- `npm run typecheck`
- `npm run prisma:generate`
- `npm run prisma:migrate`

From `backend/`:

- `uvicorn main:app --reload --port 8000`

## Validation Checklist

- Frontend typecheck and build pass
- Backend syntax/import checks pass
- Prisma client generation works
- Prisma table sync works

## Notes

This repository currently contains a strong production-style scaffold with live UI flows and agent orchestration stubs. Provider-specific OAuth and deep API actions can be layered on top of this base without restructuring the architecture.
