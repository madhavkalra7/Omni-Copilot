"use client";

import { Clock3, Link2, Link2Off } from "lucide-react";

import { GlowCard } from "@/components/ui/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ToolConnection } from "@/lib/api/client";

interface ToolCardProps {
  tool: ToolConnection;
  onToggle: (toolId: string) => void;
}

export function ToolCard({ tool, onToggle }: ToolCardProps) {
  return (
    <GlowCard
      glowColor={tool.connected ? "green" : "blue"}
      customSize
      className="h-[230px] rounded-2xl border border-white/15 bg-black/35 p-5 backdrop-blur-xl"
    >
      <div className="flex h-full flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-white">{tool.label}</p>
            <Badge
              variant={tool.connected ? "default" : "outline"}
              className={tool.connected ? "bg-emerald-400 text-black" : "text-white/80"}
            >
              {tool.status}
            </Badge>
          </div>

          <p className="text-sm text-white/65">
            {tool.connected
              ? "Connected and available for orchestration"
              : "Authorize this tool to let Omni perform actions"}
          </p>

          {tool.lastUsed && (
            <p className="inline-flex items-center gap-1 text-xs text-white/50">
              <Clock3 className="h-3.5 w-3.5" />
              Last used {new Date(tool.lastUsed).toLocaleString()}
            </p>
          )}
        </div>

        <Button
          onClick={() => onToggle(tool.id)}
          variant={tool.connected ? "secondary" : "default"}
          className={tool.connected ? "bg-white/10 text-white hover:bg-white/20" : "bg-cyan-300 text-black hover:bg-cyan-200"}
        >
          {tool.connected ? (
            <span className="inline-flex items-center gap-2">
              <Link2Off className="h-4 w-4" />
              Disconnect
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <Link2 className="h-4 w-4" />
              Connect
            </span>
          )}
        </Button>
      </div>
    </GlowCard>
  );
}
