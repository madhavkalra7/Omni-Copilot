"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed, XCircle } from "lucide-react";

import type { AgentStep } from "@/lib/api/client";

interface AgentTimelineProps {
  steps: AgentStep[];
}

const statusStyles: Record<AgentStep["status"], { icon: React.ReactNode; color: string }> = {
  running: {
    icon: <CircleDashed className="h-4 w-4 animate-spin" />,
    color: "text-cyan-600 dark:text-cyan-300"
  },
  completed: {
    icon: <CheckCircle2 className="h-4 w-4" />,
    color: "text-emerald-600 dark:text-emerald-300"
  },
  failed: {
    icon: <XCircle className="h-4 w-4" />,
    color: "text-rose-600 dark:text-rose-300"
  }
};

export function AgentTimeline({ steps }: AgentTimelineProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/70 p-4 backdrop-blur-xl dark:border-white/15 dark:bg-black/35">
      <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground dark:text-white/60">Agent Activity</p>

      <div className="space-y-3">
        {steps.length === 0 && <p className="text-sm text-muted-foreground dark:text-white/55">Waiting for the first orchestration step.</p>}

        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06 }}
            className="rounded-xl border border-border/70 bg-background/65 p-3 dark:border-white/10 dark:bg-white/5"
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-cyan-700 dark:text-cyan-200/90">{step.agent}</p>
                <p className="text-sm text-foreground dark:text-white/90">{step.message}</p>
              </div>

              <span className={`${statusStyles[step.status].color}`}>{statusStyles[step.status].icon}</span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-muted/70 dark:bg-white/10">
              <motion.div
                className={`h-full rounded-full ${
                  step.status === "failed"
                    ? "bg-rose-400"
                    : step.status === "completed"
                    ? "bg-emerald-400"
                    : "bg-cyan-400"
                }`}
                initial={{ width: "12%" }}
                animate={{ width: step.status === "running" ? "65%" : "100%" }}
                transition={{ duration: 0.45 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
