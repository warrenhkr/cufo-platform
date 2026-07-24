import GlassCard from '@/components/GlassCard'

const equipes = ['Équipe A', 'Équipe B', 'Équipe C', 'Équipe D']

export default function EquipesPage() {
  return (
    <div>
      <h1 className="text-white text-2xl font-bold mb-6">Actualités & Équipes</h1>

      <div className="grid grid-cols-2 gap-4 max-w-md">
        {equipes.map((nom) => (
          <GlassCard key={nom} className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-400/20 mx-auto mb-3 flex items-center justify-center text-amber-400 font-bold">
              {nom.charAt(nom.length - 1)}
            </div>
            <span className="text-white font-semibold text-sm">{nom}</span>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}