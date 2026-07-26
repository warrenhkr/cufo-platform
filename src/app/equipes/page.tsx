// app/equipes/page.tsx
import { Container } from "@/components/ui/Container";
import { TeamCard } from "@/components/teams/TeamCard";
import { standings } from "@/lib/mock-data";

export default function TeamsPage() {
  return (
    <Container className="py-10">
      <h1 className="font-heading text-3xl font-bold uppercase text-foreground sm:text-4xl">
        Les équipes engagées
      </h1>
      <p className="mt-1.5 mb-8 text-base text-muted-foreground">8 équipes, un seul trophée</p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {standings.map((entry, index) => (
          <TeamCard key={entry.team.id} entry={entry} index={index} />
        ))}
      </div>
    </Container>
  );
}