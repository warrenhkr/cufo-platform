import GlassCard from '@/components/GlassCard'

export default function PlanningPage() {
  return (
    <div>
      <h1 className="text-white text-2xl font-bold mb-6">Planning & Résultats</h1>

      <div className="flex flex-col gap-4 max-w-md">
        <GlassCard className="p-4">
          <p className="text-white/50 text-xs mb-2">Aujourd'hui, 16h00</p>
          <div className="flex items-center justify-between text-white">
            <span className="font-semibold">Équipe A</span>
            <span className="text-white/70 text-sm">vs</span>
            <span className="font-semibold">Équipe B</span>
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <p className="text-white/50 text-xs mb-2">Demain, 10h00</p>
          <div className="flex items-center justify-between text-white">
            <span className="font-semibold">Équipe C</span>
            <span className="text-white/70 text-sm">vs</span>
            <span className="font-semibold">Équipe D</span>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}