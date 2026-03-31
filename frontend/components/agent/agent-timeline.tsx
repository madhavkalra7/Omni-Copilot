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
    color: "text-cyan-300"
  },
  completed: {
    icon: <CheckCircle2 className="h-4 w-4" />,
    color: "text-emerald-300"
  },
  failed: {
    icon: <XCircle className="h-4 w-4" />,
    color: "text-rose-300"
  }
};

export function AgentTimeline({ steps }: AgentTimelineProps) {
  return (
    <div className="rounded-2xl border border-white/15 bg-black/35 p-4 backdrop-blur-xl">
      <p className="mb-3 text-xs uppercase tracking-[0.18em] text-white/60">Agent Activity</p>

      <div className="space-y-3">
        {steps.length === 0 && <p className="text-sm text-white/55">Waiting for the first orchestration step.</p>}

        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06 }}
            className="rounded-xl border border-white/10 bg-white/5 p-3"
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-cyan-200/90">{step.agent}</p>
                <p className="text-sm text-white/90">{step.message}</p>
              </div>

              <span className={`${statusStyles[step.status].color}`}>{statusStyles[step.status].icon}</span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
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
