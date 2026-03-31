"use client";

import { create } from "zustand";
import { createId, nowIso } from "@/lib/utils";
import type { AgentStep, AuditAction, ChatMessage, ToolConnection } from "@/lib/api/client";

type MessageMap = Record<string, ChatMessage[]>;

type AppStore = {
  activeChatId: string | null;
  messagesByChat: MessageMap;
  agentSteps: AgentStep[];
  auditLog: AuditAction[];
  connectedTools: Record<string, ToolConnection>;

  setActiveChat: (chatId: string) => void;
  ensureChat: (chatId: string) => void;
  addMessage: (chatId: string, message: ChatMessage) => void;
  addMessageText: (chatId: string, role: ChatMessage["role"], content: string) => string;
  updateMessageContent: (chatId: string, messageId: string, content: string) => void;

  pushAgentStep: (step: Omit<AgentStep, "id" | "createdAt">) => void;
  clearAgentSteps: () => void;

  pushAuditAction: (action: Omit<AuditAction, "id" | "createdAt">) => void;
  markAuditUndone: (auditId: string) => void;

  upsertTool: (tool: ToolConnection) => void;
  seedTools: () => void;
};

const defaultTools: ToolConnection[] = [
  { id: "gmail", label: "Gmail", connected: false, status: "disconnected" },
  { id: "gcal", label: "Google Calendar", connected: false, status: "disconnected" },
  { id: "github", label: "GitHub", connected: false, status: "disconnected" },
  { id: "notion", label: "Notion", connected: false, status: "disconnected" },
  { id: "slack", label: "Slack", connected: false, status: "disconnected" },
  { id: "drive", label: "Google Drive", connected: false, status: "disconnected" }
];

export const useAppStore = create<AppStore>((set, get) => ({
  activeChatId: null,
  messagesByChat: {},
  agentSteps: [],
  auditLog: [],
  connectedTools: {},

  setActiveChat: (chatId) => {
    set({ activeChatId: chatId });
    get().ensureChat(chatId);
  },

  ensureChat: (chatId) => {
    set((state) => {
      if (state.messagesByChat[chatId]) {
        return state;
      }
      return {
        messagesByChat: {
          ...state.messagesByChat,
          [chatId]: []
        }
      };
    });
  },

  addMessage: (chatId, message) => {
    get().ensureChat(chatId);
    set((state) => ({
      messagesByChat: {
        ...state.messagesByChat,
        [chatId]: [...(state.messagesByChat[chatId] ?? []), message]
      }
    }));
  },

  addMessageText: (chatId, role, content) => {
    const id = createId("msg");
    get().addMessage(chatId, {
      id,
      role,
      content,
      createdAt: nowIso()
    });
    return id;
  },

  updateMessageContent: (chatId, messageId, content) => {
    set((state) => ({
      messagesByChat: {
        ...state.messagesByChat,
        [chatId]: (state.messagesByChat[chatId] ?? []).map((msg) =>
          msg.id === messageId ? { ...msg, content } : msg
        )
      }
    }));
  },

  pushAgentStep: (step) => {
    set((state) => ({
      agentSteps: [
        ...state.agentSteps,
        { id: createId("step"), createdAt: nowIso(), ...step }
      ]
    }));
  },

  clearAgentSteps: () => {
    set({ agentSteps: [] });
  },

  pushAuditAction: (action) => {
    set((state) => ({
      auditLog: [
        {
          id: createId("audit"),
          createdAt: nowIso(),
          ...action
        },
        ...state.auditLog
      ].slice(0, 80)
    }));
  },

  markAuditUndone: (auditId) => {
    set((state) => ({
      auditLog: state.auditLog.map((entry) =>
        entry.id === auditId ? { ...entry, undone: true } : entry
      )
    }));
  },

  upsertTool: (tool) => {
    set((state) => ({
      connectedTools: {
        ...state.connectedTools,
        [tool.id]: tool
      }
    }));
  },

  seedTools: () => {
    if (Object.keys(get().connectedTools).length > 0) {
      return;
    }
    const seeded = defaultTools.reduce<Record<string, ToolConnection>>((acc, tool) => {
      acc[tool.id] = tool;
      return acc;
    }, {});
    set({ connectedTools: seeded });
  }
}));
