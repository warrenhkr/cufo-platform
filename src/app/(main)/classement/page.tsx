import PageHeader from '@/components/PageHeader'
import SectionHeader from '@/components/SectionHeader'
import ClassementSimulator from '@/components/ClassementSimulator'
import { mockEquipes, mockMatchsAVenir } from '@/lib/mockData'

export default function ClassementPage() {
  return (
    <div>
      <PageHeader title="Classement & Stats" subtitle="Scores, classement et évolution de la compétition" />
      <SectionHeader eyebrow="Position actuelle des équipes" title="Classement" accent="Général" />
      <ClassementSimulator equipes={mockEquipes} matchsAVenir={mockMatchsAVenir} />
    </div>
  )
}