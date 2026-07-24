import GlassCard from '@/components/GlassCard'

const equipes = [
  { rang: 1, nom: 'Équipe A', points: 12, joues: 4 },
  { rang: 2, nom: 'Équipe C', points: 9, joues: 4 },
  { rang: 3, nom: 'Équipe D', points: 6, joues: 4 },
  { rang: 4, nom: 'Équipe B', points: 3, joues: 4 },
]

export default function ClassementPage() {
  return (
    <div>
      <h1 className="text-white text-2xl font-bold mb-6">Classement & Stats</h1>

      <GlassCard className="max-w-md overflow-hidden">
        <table className="w-full text-white">
          <thead>
            <tr className="text-white/50 text-xs border-b border-white/10">
              <th className="text-left font-medium p-4">#</th>
              <th className="text-left font-medium p-4">Équipe</th>
              <th className="text-center font-medium p-4">J</th>
              <th className="text-right font-medium p-4">Pts</th>
            </tr>
          </thead>
          <tbody>
            {equipes.map((e) => (
              <tr key={e.rang} className="border-b border-white/5 last:border-0">
                <td className="p-4 text-white/70">{e.rang}</td>
                <td className="p-4 font-semibold">{e.nom}</td>
                <td className="p-4 text-center text-white/70">{e.joues}</td>
                <td className="p-4 text-right text-amber-400 font-bold">{e.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  )
}