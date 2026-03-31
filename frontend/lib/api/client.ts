export type ChatRole = "user" | "assistant" | "system" | "tool";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
}

export interface AgentStep {
  id: string;
  agent: string;
  message: string;
  status: "running" | "completed" | "failed";
  createdAt: string;
}

export interface ToolConnection {
  id: string;
  label: string;
  connected: boolean;
  status: "connected" | "disconnected" | "error";
  lastUsed?: string;
}

export interface AuditAction {
  id: string;
  label: string;
  createdAt: string;
  undoable: boolean;
  undone?: boolean;
}

export interface StreamEnvelope<T = unknown> {
  event: string;
  data: T;
}

export interface ChatRequestPayload {
  chatId: string;
  message: string;
}
