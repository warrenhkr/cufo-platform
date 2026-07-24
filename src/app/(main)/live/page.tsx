import GlassCard from '@/components/GlassCard'

export default function LivePage() {
  return (
    <div>
      <h1 className="text-white text-2xl font-bold mb-6">En Direct</h1>

      <GlassCard className="p-6 max-w-md">
        <p className="text-white/70 text-sm mb-2">Match test</p>
        <div className="flex items-center justify-between text-white">
          <span className="font-semibold">Équipe A</span>
          <span className="text-amber-400 font-bold text-lg">2 - 1</span>
          <span className="font-semibold">Équipe B</span>
        </div>
      </GlassCard>
    </div>
  )
}