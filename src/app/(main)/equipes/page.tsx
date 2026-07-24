import Card from '@/components/Card'
import PageHeader from '@/components/PageHeader'
import SectionHeader from '@/components/SectionHeader'
import { mockEquipes } from '@/lib/mockData'

export default function EquipesPage() {
  return (
    <div>
      <PageHeader title="Actualités & Équipes" subtitle="Suivez la vie des équipes et les dernières communications" />

      <SectionHeader eyebrow="Toutes les équipes inscrites" title="Nos" accent="Équipes" />
      <div className="grid grid-cols-2 gap-4 max-w-md">
        {mockEquipes.map((e) => (
          <Card key={e.id} className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 mx-auto mb-3 flex items-center justify-center text-red-600 font-bold">
              {e.nom.charAt(e.nom.length - 1)}
            </div>
            <span className="text-navy-950 font-semibold text-sm">{e.nom}</span>
          </Card>
        ))}
      </div>
    </div>
  )
}