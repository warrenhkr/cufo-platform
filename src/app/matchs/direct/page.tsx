// app/matchs/direct/page.tsx
"use client";

import { useState } from "react";
import { MatchHeader } from "@/components/match/MatchHeader";
import { MatchTabs } from "@/components/match/MatchTabs";
import { MvpVoteBanner } from "@/components/match/MvpVoteBanner";
import { MvpVoteModal } from "@/components/match/MvpVoteModal";
import { Container } from "@/components/ui/Container";
import { matchDetail } from "@/lib/match-mock-data";

export default function LiveMatchPage() {
  const [voteModalOpen, setVoteModalOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  return (
    <main>
      <MatchHeader match={matchDetail} />

      <Container className="flex flex-col gap-8 py-8">
        {matchDetail.mvpVote.isOpen && (
          <MvpVoteBanner
            remainingSeconds={matchDetail.mvpVote.remainingSeconds}
            onOpen={() => setVoteModalOpen(true)}
          />
        )}

        <MatchTabs match={matchDetail} />
      </Container>

      <MvpVoteModal
        isOpen={voteModalOpen}
        onClose={() => setVoteModalOpen(false)}
        candidates={matchDetail.mvpVote.candidates}
        remainingSeconds={matchDetail.mvpVote.remainingSeconds}
        hasVotedBefore={hasVoted}
        onVoteSubmitted={() => setHasVoted(true)}
      />
    </main>
  );
}