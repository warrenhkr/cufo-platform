// components/ui/LiveStatusBadge.tsx
"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { MatchDetail } from "@/lib/match-types";

type LiveStatus = MatchDetail["status"];

interface LiveStatusBadgeProps {
  status: LiveStatus;
  className?: string;
  compact?: boolean;
}

const config: Record<LiveStatus, { label: string; compactLabel: string; tone: string }> = {
  live: { label: "EN DIRECT", compactLabel: "LIVE", tone: "live" },
  halftime: { label: "MI-TEMPS", compactLabel: "MT", tone: "warning" },
  finished: { label: "TERMINÉ", compactLabel: "FIN", tone: "neutral" },
  upcoming: { label: "À VENIR", compactLabel: "À VENIR", tone: "muted" },
};

const toneStyles: Record<string, string> = {
  live: "bg-secondary text-secondary-foreground shadow-[0_0_14px_color-mix(in_oklch,var(--secondary)_55%,transparent)]",
  warning: "bg-accent text-accent-foreground",
  neutral: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  muted: "bg-muted text-muted-foreground",
};

export function LiveStatusBadge({ status, className = "", compact = false }: LiveStatusBadgeProps) {
  const reduceMotion = useReducedMotion();
  const { label, compactLabel, tone } = config[status];
  const isLive = status === "live";

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={status}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`relative inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${toneStyles[tone]} ${className}`}
      >
        {isLive && (
          <span className="relative flex h-2 w-2 shrink-0">
            {!reduceMotion && (
              <motion.span
                animate={{ scale: [1, 1.9], opacity: [0.7, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                className="absolute inline-flex h-full w-full rounded-full bg-white"
              />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
        )}
        {compact ? compactLabel : label}
      </motion.span>
    </AnimatePresence>
  );
}