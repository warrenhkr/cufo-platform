import Card from '@/components/Card'
import PageHeader from '@/components/PageHeader'
import SectionHeader from '@/components/SectionHeader'

export default function ResultatsPage() {
  return (
    <div>
      <PageHeader title="Résultats" subtitle="Tous les matchs joués, journée par journée" />

      <SectionHeader eyebrow="Résultats des affrontements terminés" title="Historique" accent="des Matchs" />
      <Card className="p-6 max-w-md">
        <p className="text-gray-400 text-sm text-center">Aucun match dans l&apos;historique pour le moment.</p>
      </Card>
    </div>
  )
}