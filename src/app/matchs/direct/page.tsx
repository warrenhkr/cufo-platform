// app/matchs/direct/page.tsx
import { MatchHeader } from "@/components/match/MatchHeader";
import { MatchTabs } from "@/components/match/MatchTabs";
import { MvpVoteBanner } from "@/components/match/MvpVoteBanner";
import { Container } from "@/components/ui/Container";
import { matchDetail } from "@/lib/match-mock-data";

/**
 * Doc section 4 — Match en direct.
 * mvpVote.isOpen contrôle l'affichage du bandeau (4.4) : posé à `true`
 * dans match-mock-data.ts pour tester, sans jamais bloquer la lecture
 * du direct (4.12 — pas de modale forcée).
 */
export default function LiveMatchPage() {
  return (
    <main>
      <MatchHeader match={matchDetail} />

      <Container className="flex flex-col gap-8 py-8">
        {matchDetail.mvpVote.isOpen && (
          <MvpVoteBanner remainingSeconds={matchDetail.mvpVote.remainingSeconds} />
        )}

        <MatchTabs match={matchDetail} />
      </Container>
    </main>
  );
}