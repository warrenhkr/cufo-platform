import { Container } from "@/components/ui/Container";
import { StatisticsTabs } from "@/components/stats/StatisticsTabs";
import { statisticsData } from "@/lib/stats-mock-data";

export default function StatistiquesPage() {
  return (
    <main>
      <Container className="flex flex-col gap-2 py-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Statistiques</h1>
        <p className="text-muted-foreground">Les chiffres qui font le championnat</p>
        <p className="mb-4 text-xs text-muted-foreground">
          Mis à jour après la {statisticsData.matchdayLabel}
        </p>

        <StatisticsTabs data={statisticsData} />
      </Container>
    </main>
  );
}