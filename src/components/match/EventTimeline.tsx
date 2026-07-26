// components/match/EventTimeline.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  CircleDot, Square, Repeat, CornerDownRight, Timer, ArrowDown,
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
  fulltime: Timer,
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

/** Distance (px) en dessous de laquelle on considère l'utilisateur "en bas" */
const BOTTOM_THRESHOLD = 48;

/** Doc 4.2 — Fil d'événements en direct, façon chat : les nouveaux événements
 * poussent les anciens vers le haut. Auto-scroll actif par défaut, se
 * désactive si l'utilisateur remonte manuellement, se réactive quand il
 * revient tout en bas ou clique le bouton flottant. */
export function EventTimeline({ events }: EventTimelineProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLUListElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const ordered = [...events].sort((a, b) => a.minute - b.minute);
  const eventCount = ordered.length;

  const scrollToBottom = (smooth = true) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
  };

  // Nouvel événement + auto-scroll actif → on suit le direct
  useEffect(() => {
    if (autoScroll) scrollToBottom(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventCount]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setAutoScroll(distanceFromBottom <= BOTTOM_THRESHOLD);
  };

  return (
    <div className="relative">
      <h2 className="mb-4 font-heading text-2xl font-semibold uppercase tracking-wide text-foreground">
        Ce qu&rsquo;il s&rsquo;est passé
      </h2>

      <ul
        ref={containerRef}
        onScroll={handleScroll}
        className="flex max-h-[480px] flex-col gap-1 overflow-y-auto scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {ordered.map((event) => {
            const Icon = eventIcon[event.type];
            const isGoal = event.type === "goal";
            const isRedCard = event.type === "red_card";
            const isYellowCard = event.type === "yellow_card";

            return (
              <motion.li
                key={event.id}
                layout={!reduceMotion}
                initial={reduceMotion ? false : { opacity: 0, y: 12, scale: isGoal ? 0.92 : 1 }}
                animate={
                  reduceMotion
                    ? { opacity: 1 }
                    : isRedCard
                      ? { opacity: 1, y: 0, scale: 1, x: [0, -4, 4, -3, 3, 0] }
                      : { opacity: 1, y: 0, scale: 1 }
                }
                transition={{ duration: isRedCard ? 0.45 : 0.3, ease: "easeOut" }}
                className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
                  isGoal
                    ? "border-primary/30 bg-primary/5"
                    : isRedCard
                      ? "border-destructive/40 bg-destructive/5"
                      : isYellowCard
                        ? "border-accent/30 bg-accent/5"
                        : "border-border bg-card/40"
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
        </AnimatePresence>
      </ul>

      <AnimatePresence>
        {!autoScroll && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              setAutoScroll(true);
              scrollToBottom(true);
            }}
            className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
          >
            <ArrowDown size={14} />
            Derniers événements
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}