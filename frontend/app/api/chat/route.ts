import { NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:8000";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.text();

  const upstream = await fetch(`${BACKEND_URL}/api/chat/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body,
    cache: "no-store"
  });

  if (!upstream.ok || !upstream.body) {
    return new Response(JSON.stringify({ error: "Unable to connect to backend stream" }), {
      status: upstream.status || 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive"
    }
  });
}
