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
 * revient tout en bas ou clique le bouton flottant. Chaque type d'événement
 * a son propre traitement (doc animations, section 1) : but = glow + pop
 * plus marqué, carton rouge = flash rouge + shake, carton jaune = flash
 * jaune, changement = apparition simple sans effet superflu. */
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

      <div className="relative pl-6">
        {/* Ligne de temps qui se dessine */}
        {!reduceMotion && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-2.5 top-0 w-0.5 rounded-full bg-gradient-to-b from-border via-primary/50 to-transparent"
          />
        )}

        <ul
          ref={containerRef}
          onScroll={handleScroll}
          className="flex max-h-120 flex-col gap-3 overflow-y-auto scroll-smooth pb-4 pr-2"
        >
          <AnimatePresence initial={false}>
            {ordered.map((event, index) => {
              const Icon = eventIcon[event.type];
              const isGoal = event.type === "goal";
              const isRedCard = event.type === "red_card";
              const isYellowCard = event.type === "yellow_card";
              const isCard = isRedCard || isYellowCard;

              const flashClass = reduceMotion
                ? ""
                : isGoal
                  ? "animate-flash-goal"
                  : isRedCard
                    ? "animate-flash-red"
                    : isYellowCard
                      ? "animate-flash-yellow"
                      : "";

              // Animation de chute pour les cartons
              const initialAnimation = reduceMotion
                ? false
                : isCard
                  ? { opacity: 0, y: -40, scale: 1.1, rotate: 10 }
                  : { opacity: 0, y: 12, scale: isGoal ? 0.88 : 1 };

              const animateAnimation = reduceMotion
                ? { opacity: 1 }
                : isCard
                  ? { opacity: 1, y: 0, scale: 1, rotate: 0 }
                  : { opacity: 1, y: 0, scale: 1 };

              const transitionAnimation = isCard
                ? { type: "spring" as const, bounce: 0.5, duration: 0.7 }
                : { duration: isGoal ? 0.4 : 0.3, ease: "easeOut" as const };

              return (
                <motion.li
                  key={event.id}
                  layout={!reduceMotion}
                  initial={initialAnimation}
                  animate={animateAnimation}
                  transition={transitionAnimation}
                  className={`relative flex items-center gap-3 rounded-xl border px-3 py-3 shadow-sm ${flashClass} ${
                    isGoal
                      ? "border-primary/30 bg-primary/10 premium-glow"
                      : isRedCard
                        ? "border-destructive/40 bg-destructive/10"
                        : isYellowCard
                          ? "border-accent/30 bg-accent/10"
                          : "border-border/60 bg-card/60 backdrop-blur-md"
                  }`}
                >
                  {/* Petit point de connexion à la ligne */}
                  {!reduceMotion && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className={`absolute -left-[19px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border-2 border-background ${isGoal ? 'bg-primary' : 'bg-border'}`}
                    />
                  )}
                  
                  <span className="w-9 shrink-0 font-heading text-sm font-semibold tabular-nums text-muted-foreground/80">
                    {event.type === "kickoff" || event.type === "halftime" ? "" : `${event.minute}'`}
                  </span>
                  <motion.div whileHover={{ scale: 1.2, rotate: isCard ? 10 : 0 }}>
                    <Icon size={18} className={`shrink-0 ${eventTone[event.type]}`} />
                  </motion.div>
                  <span className="text-sm font-medium text-foreground">{event.label}</span>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>

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