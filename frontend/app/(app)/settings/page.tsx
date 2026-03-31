"use client";

import { useState } from "react";
import { CheckCircle2, History, Moon, RotateCcw, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store/app-store";

export default function SettingsPage() {
  const [selectedModel, setSelectedModel] = useState("claude-sonnet-4-20250514");
  const { theme, setTheme } = useTheme();

  const auditLog = useAppStore((s) => s.auditLog);
  const markAuditUndone = useAppStore((s) => s.markAuditUndone);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/70">Settings</p>
        <h1 className="text-2xl font-semibold text-white">Workspace controls</h1>
        <p className="text-sm text-white/65">Manage model preferences, appearance, and action history.</p>
      </div>

      <section className="rounded-3xl border border-white/15 bg-black/35 p-5 backdrop-blur-xl">
        <h2 className="mb-3 text-sm font-semibold text-white">Model and interface</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <span className="text-xs uppercase tracking-[0.12em] text-white/60">Primary model</span>
            <select
              value={selectedModel}
              onChange={(event) => setSelectedModel(event.target.value)}
              className="h-11 w-full rounded-xl border border-white/20 bg-white/5 px-3 text-sm text-white outline-none"
            >
              <option value="claude-sonnet-4-20250514">Claude Sonnet 4</option>
              <option value="gpt-4o">GPT-4o</option>
            </select>
          </label>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-[0.12em] text-white/60">Theme</span>
            <div className="flex gap-2">
              <Button
                onClick={() => setTheme("dark")}
                variant={theme === "dark" ? "default" : "secondary"}
                className={theme === "dark" ? "bg-cyan-300 text-black hover:bg-cyan-200" : "bg-white/10 text-white"}
              >
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </Button>
              <Button
                onClick={() => setTheme("light")}
                variant={theme === "light" ? "default" : "secondary"}
                className={theme === "light" ? "bg-cyan-300 text-black hover:bg-cyan-200" : "bg-white/10 text-white"}
              >
                <Sun className="mr-2 h-4 w-4" />
                Light
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="audit" className="rounded-3xl border border-white/15 bg-black/35 p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2">
          <History className="h-4 w-4 text-cyan-200" />
          <h2 className="text-sm font-semibold text-white">Action history</h2>
        </div>

        <div className="space-y-2">
          {auditLog.length === 0 && <p className="text-sm text-white/55">No actions recorded yet.</p>}

          {auditLog.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
            >
              <div>
                <p className="text-sm text-white/90">{entry.label}</p>
                <p className="text-xs text-white/55">{new Date(entry.createdAt).toLocaleString()}</p>
              </div>

              {entry.undoable && !entry.undone ? (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => markAuditUndone(entry.id)}
                  className="bg-white/10 text-white hover:bg-white/20"
                >
                  <RotateCcw className="mr-2 h-3.5 w-3.5" />
                  Undo
                </Button>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {entry.undone ? "Undone" : "Recorded"}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
