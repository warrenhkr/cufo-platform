// components/match/EventTimeline.tsx
"use client";

import { motion } from "motion/react";
import {
  CircleDot,
  Square,
  Repeat,
  CornerDownRight,
  Flag,
  Timer,
} from "lucide-react";
import type { MatchEvent, MatchEventType } from "@/lib/match-types";

interface EventTimelineProps {
  events: MatchEvent[];
}

const eventIcon: Record<MatchEventType, React.ElementType> = {
  kickoff: Timer,
  goal: CircleDot,
  yellow_card: Square,
  red_card: Square,
  substitution: Repeat,
  corner: CornerDownRight,
  halftime: Timer,
  fulltime: Flag,
};

const eventTone: Record<MatchEventType, string> = {
  kickoff: "text-muted-foreground",
  goal: "text-primary",
  yellow_card: "text-accent",
  red_card: "text-destructive",
  substitution: "text-muted-foreground",
  corner: "text-muted-foreground",
  halftime: "text-muted-foreground",
  fulltime: "text-muted-foreground",
};

/** Doc 4.2 — Fil d'événements, du plus récent au plus ancien */
export function EventTimeline({ events }: EventTimelineProps) {
  const ordered = [...events].reverse();

  return (
    <div>
      <h2 className="mb-4 font-heading text-2xl font-semibold uppercase tracking-wide text-foreground">
        Ce qu&rsquo;il s&rsquo;est passé
      </h2>
      <ul className="flex flex-col gap-1">
        {ordered.map((event, index) => {
          const Icon = eventIcon[event.type];
          const isMajor = event.type === "goal" || event.type === "red_card";

          return (
            <motion.li
              key={event.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: Math.min(index, 6) * 0.03 }}
              className={`flex items-center gap-3 rounded-xl border border-border px-3 py-2.5 ${
                isMajor ? "bg-primary/5" : "bg-card/40"
              }`}
            >
              <span className="w-9 shrink-0 font-heading text-sm font-semibold tabular-nums text-muted-foreground">
                {event.type === "kickoff" || event.type === "halftime" ? "" : `${event.minute}'`}
              </span>
              <Icon size={16} className={`shrink-0 ${eventTone[event.type]}`} />
              <span className="text-sm text-foreground">{event.label}</span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}