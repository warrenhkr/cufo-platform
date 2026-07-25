import Card from '@/components/Card'
import PageHeader from '@/components/PageHeader'
import SectionHeader from '@/components/SectionHeader'
import { mockMatchsAVenir } from '@/lib/mockData'

export default function CalendrierPage() {
  return (
    <div>
      <PageHeader title="Calendrier" subtitle="Toutes les rencontres à venir, journée par journée" />

      <SectionHeader eyebrow="Les affrontements qui arrivent" title="Prochains" accent="Matchs" />
      <div className="flex flex-col gap-4 max-w-md">
        {mockMatchsAVenir.map((match) => (
          <Card key={match.id} className="p-4">
            <p className="text-gray-500 text-xs mb-2">{match.date}</p>
            <div className="flex items-center justify-between text-navy-950">
              <span className="font-semibold">{match.equipeA}</span>
              <span className="text-gray-400 text-sm">vs</span>
              <span className="font-semibold">{match.equipeB}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}