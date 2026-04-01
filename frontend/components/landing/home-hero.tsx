"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Calendar,
  Github,
  Mail,
  NotepadText,
  Sparkles,
  Slack
} from "lucide-react";

import { BackgroundPaths } from "@/components/ui/background-paths";
import { GlowCard } from "@/components/ui/spotlight-card";
import { AI_Prompt } from "@/components/ui/animated-ai-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const featureCards = [
  {
    title: "Email + Calendar",
    description: "Summarize Gmail threads, draft replies, and schedule follow-ups in one flow.",
    icon: Mail,
    color: "blue" as const
  },
  {
    title: "Code + GitHub",
    description: "Open PR reviews, file diffs, and release notes from one chat-first workspace.",
    icon: Github,
    color: "green" as const
  },
  {
    title: "Notion + Slack",
    description: "Pull decisions from docs and instantly generate shareable team updates.",
    icon: NotepadText,
    color: "orange" as const
  }
];

const quickActions = [
  {
    label: "Inbox sweep",
    icon: Mail,
    text: "Find critical unread emails"
  },
  {
    label: "Today plan",
    icon: Calendar,
    text: "Build focus schedule from calendar"
  },
  {
    label: "PR digest",
    icon: Github,
    text: "Summarize assigned pull requests"
  },
  {
    label: "Workspace pulse",
    icon: Slack,
    text: "Create channel update from Slack"
  }
];

export function HomeHero() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-55">
        <BackgroundPaths title="Omni" showContent={false} />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between rounded-2xl border border-border/70 bg-background/75 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-black/35">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-cyan-300/90 text-center text-sm font-bold leading-9 text-slate-950">
              O
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-200/80">Universal Agent</p>
              <p className="text-sm font-semibold text-foreground dark:text-white">Omni Copilot</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              className="hidden rounded-xl border border-border/70 bg-background/70 text-foreground hover:bg-accent sm:inline-flex dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              <Link href="/dark">Dark view</Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="hidden rounded-xl border border-border/70 bg-background/70 text-foreground hover:bg-accent sm:inline-flex dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              <Link href="/light">Light view</Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="rounded-xl border border-border/70 bg-background/70 text-foreground hover:bg-accent dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </header>

        <section className="mt-8 grid flex-1 items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="space-y-6"
          >
            <Badge className="w-fit border border-cyan-500/35 bg-cyan-500/12 px-3 py-1 text-cyan-700 dark:border-cyan-300/35 dark:bg-cyan-400/12 dark:text-cyan-100">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              21st-inspired animated experience
            </Badge>

            <h1 className="text-balance text-4xl font-semibold leading-[1.05] text-foreground dark:text-white sm:text-5xl lg:text-6xl">
              One AI copilot for your inbox, docs, meetings, code, and browser.
            </h1>

            <p className="max-w-2xl text-pretty text-base text-muted-foreground dark:text-white/72 sm:text-lg">
              Ask once and Omni executes across Gmail, Calendar, GitHub, Notion, Slack, and the web.
              Real-time agent updates, streaming responses, and action history are built in.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="h-12 rounded-xl bg-cyan-300 px-6 text-base font-semibold text-slate-950 hover:bg-cyan-200"
              >
                <Link href="/chat/new" className="inline-flex items-center gap-2">
                  Start for free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-12 rounded-xl border-border/80 bg-background/70 px-6 text-base text-foreground hover:bg-accent dark:border-white/20 dark:bg-black/25 dark:text-white dark:hover:bg-white/10"
              >
                <Link href="/integrations">Explore integrations</Link>
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {quickActions.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + index * 0.08, duration: 0.35 }}
                    className="rounded-xl border border-border/70 bg-background/70 p-3 backdrop-blur-xl dark:border-white/10 dark:bg-black/35"
                  >
                    <div className="mb-1 inline-flex items-center gap-2 text-sm font-medium text-cyan-700 dark:text-cyan-100">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </div>
                    <p className="text-xs text-muted-foreground dark:text-white/65">{item.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.55, ease: "easeOut" }}
            className="mx-auto w-full max-w-xl"
          >
            <GlowCard
              glowColor="blue"
              customSize
              className="w-full rounded-3xl border border-border/70 bg-background/70 p-5 backdrop-blur-2xl dark:border-white/15 dark:bg-black/50"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/12 px-3 py-1 text-xs text-emerald-700 dark:border-emerald-300/35 dark:bg-emerald-300/12 dark:text-emerald-100">
                    <Globe className="h-3.5 w-3.5" />
                    Live Agent Preview
                  </div>
                  <h2 className="text-xl font-semibold text-foreground dark:text-white">Ask Omni to orchestrate your day</h2>
                  <p className="text-sm text-muted-foreground dark:text-white/65">
                    Try prompts like “Summarize my unread Gmail and prepare replies for urgent threads.”
                  </p>
                </div>

                <div className="rounded-2xl border border-border/70 bg-background/70 p-2 backdrop-blur-xl dark:border-white/10 dark:bg-black/35">
                  <AI_Prompt disabled placeholder="Summarize unread emails, today meetings, and open PRs..." />
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </section>

        <section className="mt-8 grid gap-4 pb-4 md:grid-cols-3">
          {featureCards.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.08, duration: 0.4 }}
              >
                <GlowCard
                  glowColor={feature.color}
                  customSize
                  className="h-full min-h-[170px] w-full rounded-2xl border border-border/70 bg-background/70 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-black/40"
                >
                  <div className="space-y-2">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-background/60 text-cyan-700 dark:border-white/20 dark:bg-white/10 dark:text-cyan-100">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-white">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground dark:text-white/65">{feature.description}</p>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
