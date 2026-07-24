import Card from '@/components/Card'
import PageHeader from '@/components/PageHeader'
import SectionHeader from '@/components/SectionHeader'
import { mockMatchEnCours } from '@/lib/mockData'

export default function LivePage() {
  const match = mockMatchEnCours

  return (
    <div>
      <PageHeader title="En Direct" subtitle="Suivez les matchs en cours en temps réel" />

      <SectionHeader eyebrow="Ce qui se joue maintenant" title="Match" accent="En Cours" />
      <Card className="p-6 max-w-md">
        <p className="text-gray-500 text-sm mb-2">{match.date}</p>
        <div className="flex items-center justify-between text-navy-950">
          <span className="font-semibold">{match.equipeA}</span>
          <span className="text-red-600 font-bold text-lg">{match.scoreA} - {match.scoreB}</span>
          <span className="font-semibold">{match.equipeB}</span>
        </div>
      </Card>
    </div>
  )
}