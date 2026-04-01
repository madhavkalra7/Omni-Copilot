"use client";

import { useMemo, useState } from "react";

import { ToolCard } from "@/components/tools/tool-card";
import { ConnectionModal } from "@/components/tools/connection-modal";
import { useTools } from "@/lib/hooks/use-tools";

export default function IntegrationsPage() {
  const { tools, toggleTool } = useTools();
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);

  const selectedTool = useMemo(
    () => tools.find((tool) => tool.id === selectedToolId) ?? null,
    [selectedToolId, tools]
  );

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-200/70">Integrations</p>
        <h1 className="text-2xl font-semibold text-foreground dark:text-white">Connect your tools</h1>
        <p className="text-sm text-muted-foreground dark:text-white/65">
          Authorize providers and let Omni orchestrate tasks across your workspace.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onToggle={(toolId) => {
              const current = tools.find((item) => item.id === toolId);
              if (!current) {
                return;
              }

              if (current.connected) {
                toggleTool(toolId);
              } else {
                setSelectedToolId(toolId);
              }
            }}
          />
        ))}
      </div>

      {selectedTool && (
        <ConnectionModal
          open={Boolean(selectedTool)}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedToolId(null);
            }
          }}
          toolLabel={selectedTool.label}
          onConnected={() => {
            toggleTool(selectedTool.id);
          }}
        />
      )}
    </div>
  );
}
