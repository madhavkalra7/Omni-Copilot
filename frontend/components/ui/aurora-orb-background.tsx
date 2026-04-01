"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { ShapeLandingBackground } from "@/components/ui/shape-landing-background";

interface AuroraOrbBackgroundProps {
  className?: string;
}

const floatingParticles = [
  { left: "8%", top: "18%", delay: 0, duration: 10, size: 6 },
  { left: "16%", top: "72%", delay: 0.6, duration: 12, size: 4 },
  { left: "27%", top: "34%", delay: 1.1, duration: 9, size: 5 },
  { left: "36%", top: "62%", delay: 0.2, duration: 11, size: 5 },
  { left: "45%", top: "20%", delay: 1.7, duration: 10, size: 4 },
  { left: "53%", top: "78%", delay: 0.8, duration: 13, size: 6 },
  { left: "61%", top: "38%", delay: 1.3, duration: 9, size: 4 },
  { left: "70%", top: "56%", delay: 0.1, duration: 12, size: 5 },
  { left: "78%", top: "26%", delay: 1.9, duration: 11, size: 6 },
  { left: "86%", top: "70%", delay: 0.5, duration: 10, size: 4 }
];

// Layered from 21st-inspired pieces: shape-landing-hero and animated-ai-chat ambiance.
export function AuroraOrbBackground({ className }: AuroraOrbBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)} aria-hidden="true">
      <ShapeLandingBackground className="opacity-70" />

      <motion.div
        className="absolute -left-20 top-10 h-[32rem] w-[32rem] rounded-full bg-cyan-400/18 blur-[120px]"
        animate={{ x: [0, 85, 0], y: [0, 60, 0], scale: [1, 1.22, 1] }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-8rem] top-[18%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/18 blur-[110px]"
        animate={{ x: [0, -70, 0], y: [0, 45, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-[-9rem] left-[28%] h-[24rem] w-[24rem] rounded-full bg-indigo-500/20 blur-[100px]"
        animate={{ x: [0, 42, 0], y: [0, -68, 0], scale: [1, 1.28, 1] }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.2 }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/10"
        style={{ background: "conic-gradient(from 0deg, rgba(34,211,238,0.18), rgba(168,85,247,0.1), rgba(244,114,182,0.14), rgba(34,211,238,0.18))" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[25rem] w-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
        style={{ background: "conic-gradient(from 180deg, rgba(14,165,233,0.14), rgba(236,72,153,0.08), rgba(99,102,241,0.14), rgba(14,165,233,0.14))" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {floatingParticles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-cyan-100/60 shadow-[0_0_24px_rgba(34,211,238,0.45)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size
          }}
          animate={{
            y: [0, -18, 0],
            x: [0, index % 2 === 0 ? 12 : -12, 0],
            opacity: [0.18, 0.75, 0.18],
            scale: [1, 1.45, 1]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.16),transparent_46%),radial-gradient(circle_at_80%_75%,rgba(244,114,182,0.16),transparent_44%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/55 via-transparent to-[#020617]/85" />
    </div>
  );
}
