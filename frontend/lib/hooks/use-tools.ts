"use client";

import { useEffect, useMemo } from "react";
import { useAppStore } from "@/lib/store/app-store";

export function useTools() {
  const toolsMap = useAppStore((s) => s.connectedTools);
  const seedTools = useAppStore((s) => s.seedTools);
  const upsertTool = useAppStore((s) => s.upsertTool);
  const pushAuditAction = useAppStore((s) => s.pushAuditAction);

  useEffect(() => {
    seedTools();
  }, [seedTools]);

  const tools = useMemo(() => Object.values(toolsMap), [toolsMap]);

  const toggleTool = (toolId: string) => {
    const current = toolsMap[toolId];
    if (!current) {
      return;
    }
    upsertTool({
      ...current,
      connected: !current.connected,
      status: !current.connected ? "connected" : "disconnected",
      lastUsed: new Date().toISOString()
    });

    pushAuditAction({
      label: `${!current.connected ? "Connected" : "Disconnected"} ${current.label}`,
      undoable: true
    });
  };

  return {
    tools,
    toggleTool
  };
}
