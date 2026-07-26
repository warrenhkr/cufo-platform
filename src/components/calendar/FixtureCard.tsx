// components/calendar/FixtureCard.tsx
"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Bell, MapPin, Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { UpcomingFixture } from "@/lib/calendar-types";

interface FixtureCardProps {
  fixture: UpcomingFixture;
  index: number;
}

const badgeLabel: Record<NonNullable<UpcomingFixture["badge"]>, string> = {
  soon: "Bientôt",
  today: "Aujourd'hui",
};

function TeamCrest({ name, color }: { name: string; color: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

/** Doc 5.2 — Carte match à venir, avec CTA "Activer un rappel" (5.4) */
export function FixtureCard({ fixture, index }: FixtureCardProps) {
  const reduceMotion = useReducedMotion();
  const [reminderSet, setReminderSet] = useState(false);

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.3, delay: Math.min(index, 6) * 0.04 }}
    >
      <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
              Journée {fixture.matchday}
            </span>
            {fixture.badge && (
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  fixture.badge === "today"
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-accent/20 text-accent-foreground"
                }`}
              >
                {badgeLabel[fixture.badge]}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <TeamCrest name={fixture.homeTeam.name} color={fixture.homeTeam.primaryColor} />
            <span className="font-heading text-sm font-semibold uppercase text-foreground sm:text-base">
              {fixture.homeTeam.name}
            </span>
            <span className="text-xs font-medium text-muted-foreground">vs</span>
            <span className="font-heading text-sm font-semibold uppercase text-foreground sm:text-base">
              {fixture.awayTeam.name}
            </span>
            <TeamCrest name={fixture.awayTeam.name} color={fixture.awayTeam.primaryColor} />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-1.5">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">
              {fixture.dayLabel} · {fixture.timeLabel}
            </p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground sm:justify-end">
              <MapPin size={12} />
              {fixture.venue}
            </p>
          </div>

          <button
            onClick={() => setReminderSet(true)}
            disabled={reminderSet}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              reminderSet
                ? "bg-primary/10 text-primary"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {reminderSet ? <Check size={14} /> : <Bell size={14} />}
            {reminderSet ? "Rappel activé" : "Activer un rappel"}
          </button>
        </div>
      </Card>
    </motion.div>
  );
}