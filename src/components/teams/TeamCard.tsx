// components/teams/TeamCard.tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Card } from "@/components/ui/Card";
import type { StandingEntry } from "@/lib/types";
import { pointsOf } from "@/lib/mock-data";

interface TeamCardProps {
  entry: StandingEntry;
  index?: number;
}

function ordinal(n: number) {
  return n === 1 ? "1re" : `${n}e`;
}

export function TeamCard({ entry, index = 0 }: TeamCardProps) {
  const reduceMotion = useReducedMotion();
  const { team } = entry;
  const initials = team.shortName || team.name.slice(0, 3).toUpperCase();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      whileHover={reduceMotion ? {} : { y: -4, scale: 1.02 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: "easeOut" }}
    >
      <Link href={`/equipes/${team.id}`}>
        <Card className="flex h-full flex-col items-center gap-3 px-4 py-6 text-center shadow-sm transition-shadow duration-200 hover:shadow-xl">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: team.primaryColor }}
          >
            {initials}
          </div>
          <div>
            <p className="font-heading text-base font-semibold uppercase text-foreground">{team.name}</p>
            <p className="text-sm text-muted-foreground">
              {ordinal(entry.position)} place · {pointsOf(entry)} pts
            </p>
          </div>
          {entry.position === 1 && (
            <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent-foreground">
              Champion en titre
            </span>
          )}
        </Card>
      </Link>
    </motion.div>
  );
}