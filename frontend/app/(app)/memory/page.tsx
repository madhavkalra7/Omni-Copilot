"use client";

import { useMemo, useState } from "react";
import { Brain, CalendarClock, Mail, NotebookPen, Save } from "lucide-react";

import { GlowCard } from "@/components/ui/spotlight-card";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { Button } from "@/components/ui/button";

interface MemoryItem {
  id: string;
  label: string;
  value: string;
}

const initialMemory: MemoryItem[] = [
  { id: "tone", label: "Preferred writing tone", value: "Concise and professional" },
  { id: "timezone", label: "Timezone", value: "Asia/Kolkata" },
  { id: "focus", label: "Current focus", value: "Omni Copilot launch sprint" },
  { id: "channels", label: "Daily channels", value: "Gmail, Slack, GitHub" }
];

export default function MemoryPage() {
  const [memory, setMemory] = useState<MemoryItem[]>(initialMemory);
  const [showOrbit, setShowOrbit] = useState(false);

  const orbitData = useMemo(
    () => [
      {
        id: 1,
        title: "Inbox",
        date: "Today",
        content: "3 priority emails summarized and tagged for follow-up.",
        category: "mail",
        icon: Mail,
        relatedIds: [2, 3],
        status: "completed" as const,
        energy: 86
      },
      {
        id: 2,
        title: "Calendar",
        date: "Today",
        content: "Prepared meeting context from recent project activity.",
        category: "calendar",
        icon: CalendarClock,
        relatedIds: [1, 4],
        status: "in-progress" as const,
        energy: 62
      },
      {
        id: 3,
        title: "Notes",
        date: "Yesterday",
        content: "Extracted action items from shared docs and notes.",
        category: "docs",
        icon: NotebookPen,
        relatedIds: [1],
        status: "completed" as const,
        energy: 71
      },
      {
        id: 4,
        title: "Memory",
        date: "Now",
        content: "Updated persistent profile with tool preferences and intent patterns.",
        category: "memory",
        icon: Brain,
        relatedIds: [2],
        status: "pending" as const,
        energy: 45
      }
    ],
    []
  );

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/70">Memory</p>
        <h1 className="text-2xl font-semibold text-white">Personal memory graph</h1>
        <p className="text-sm text-white/65">Review and edit the context Omni stores for better long-term assistance.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {memory.map((item) => (
          <GlowCard
            key={item.id}
            glowColor="purple"
            customSize
            className="rounded-2xl border border-white/15 bg-black/35 p-5 backdrop-blur-xl"
          >
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.12em] text-white/55">{item.label}</p>
              <textarea
                value={item.value}
                onChange={(event) => {
                  const value = event.target.value;
                  setMemory((prev) => prev.map((entry) => (entry.id === item.id ? { ...entry, value } : entry)));
                }}
                className="min-h-[88px] w-full resize-none rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white/90 outline-none focus:border-cyan-300/60"
              />
            </div>
          </GlowCard>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Button className="bg-cyan-300 text-black hover:bg-cyan-200">
          <Save className="mr-2 h-4 w-4" />
          Save memory edits
        </Button>

        <Button
          variant="secondary"
          className="bg-white/10 text-white hover:bg-white/20"
          onClick={() => setShowOrbit((prev) => !prev)}
        >
          {showOrbit ? "Hide" : "Show"} orbital memory map
        </Button>
      </div>

      {showOrbit && (
        <div className="overflow-hidden rounded-3xl border border-white/15">
          <RadialOrbitalTimeline timelineData={orbitData} />
        </div>
      )}
    </div>
  );
}
