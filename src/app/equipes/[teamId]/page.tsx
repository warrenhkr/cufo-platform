import { notFound } from "next/navigation";
import { UserRound } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { TeamDetailTabs } from "@/components/teams/TeamDetailTabs";
import { standings } from "@/lib/mock-data";
import { playersByTeam } from "@/lib/team-mock-data";

function pluralize(count: number, singular: string, plural: string) {
  return count > 1 ? plural : singular;
}

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = await params;
  const entry = standings.find((e) => e.team.id === teamId);

  if (!entry) notFound();

  const roster = playersByTeam(teamId);

  return (
    <div className="relative overflow-hidden">
      <div
        className="team-halo pointer-events-none absolute inset-x-0 -top-16 h-80"
        style={{
          background: `radial-gradient(ellipse 60% 100% at 50% 0%, ${entry.team.primaryColor}1f, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10 py-10">
        <div className="mb-8 flex items-center gap-4">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: entry.team.primaryColor }}
          >
            <UserRound size={28} />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold uppercase text-foreground sm:text-3xl">
              {entry.team.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {entry.played} {pluralize(entry.played, "match", "matchs")} · {entry.won} {pluralize(entry.won, "victoire", "victoires")} · {entry.drawn} {pluralize(entry.drawn, "nul", "nuls")} · {entry.lost} {pluralize(entry.lost, "défaite", "défaites")} · {entry.goalsFor} buts marqués
            </p>
          </div>
        </div>

        <TeamDetailTabs team={entry.team} entry={entry} roster={roster} />
      </Container>
    </div>
  );
}