// components/teams/TeamCard.tsx
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { StandingEntry } from "@/lib/types";
import { pointsOf } from "@/lib/mock-data";

interface TeamCardProps {
  entry: StandingEntry;
}

function ordinal(n: number) {
  return n === 1 ? "1re" : `${n}e`;
}

export function TeamCard({ entry }: TeamCardProps) {
  const { team } = entry;
  const initials = team.shortName || team.name.slice(0, 3).toUpperCase();

  return (
    <Link href={`/equipes/${team.id}`}>
      <Card className="flex h-full flex-col items-center gap-3 px-4 py-6 text-center transition-transform hover:-translate-y-0.5">
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
  );
}