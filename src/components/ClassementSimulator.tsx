'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/Card'
import { Equipe, Match } from '@/lib/types'

interface ClassementSimulatorProps {
  equipes: Equipe[]
  matchsAVenir: Match[]
}

type Resultat = 'A' | 'nul' | 'B' | null

export default function ClassementSimulator({ equipes, matchsAVenir }: ClassementSimulatorProps) {
  const [modeSimulateur, setModeSimulateur] = useState(false)
  const [resultats, setResultats] = useState<Record<string, Resultat>>({})

  const setResultat = (matchId: string, resultat: Resultat) => {
    setResultats((prev) => ({ ...prev, [matchId]: prev[matchId] === resultat ? null : resultat }))
  }

  const classementSimule = equipes
    .map((e) => {
      let pointsSupp = 0
      matchsAVenir.forEach((m) => {
        const resultat = resultats[m.id]
        if (!resultat) return
        if (m.equipeA === e.nom) {
          if (resultat === 'A') pointsSupp += 3
          if (resultat === 'nul') pointsSupp += 1
        }
        if (m.equipeB === e.nom) {
          if (resultat === 'B') pointsSupp += 3
          if (resultat === 'nul') pointsSupp += 1
        }
      })
      return { ...e, pointsSimules: e.points + pointsSupp }
    })
    .sort((a, b) => b.pointsSimules - a.pointsSimules)

  return (
    <div>
      <div className="flex items-center justify-between mb-4 max-w-md">
        <span className="text-sm text-gray-500">
          {modeSimulateur ? 'Simule les résultats des prochains matchs' : 'Classement actuel'}
        </span>
        <button
          onClick={() => setModeSimulateur(!modeSimulateur)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            modeSimulateur ? 'bg-navy-950 text-white' : 'bg-gray-100 text-navy-950'
          }`}
        >
          Mode Simulateur
        </button>
      </div>

      <Card className="max-w-md overflow-hidden mb-6">
        <table className="w-full text-navy-950">
          <thead>
            <tr className="text-gray-500 text-xs border-b border-gray-200">
              <th className="text-left font-medium p-4">#</th>
              <th className="text-left font-medium p-4">Équipe</th>
              <th className="text-center font-medium p-4">J</th>
              <th className="text-right font-medium p-4">Pts</th>
            </tr>
          </thead>
          <tbody>
            {classementSimule.map((e, i) => (
              <motion.tr
                key={e.id}
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="p-4 text-gray-500">{i + 1}</td>
                <td className="p-4 font-semibold">{e.nom}</td>
                <td className="p-4 text-center text-gray-500">{e.matchsJoues}</td>
                <td className="p-4 text-right text-red-600 font-bold">{e.pointsSimules}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </Card>

      {modeSimulateur && (
        <div className="flex flex-col gap-3 max-w-md">
          {matchsAVenir.map((m) => (
            <Card key={m.id} className="p-4">
              <p className="text-gray-500 text-xs mb-3">{m.date}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setResultat(m.id, 'A')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    resultats[m.id] === 'A' ? 'bg-red-600 text-white' : 'bg-gray-100 text-navy-950'
                  }`}
                >
                  {m.equipeA}
                </button>
                <button
                  onClick={() => setResultat(m.id, 'nul')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    resultats[m.id] === 'nul' ? 'bg-gold-400 text-navy-950' : 'bg-gray-100 text-navy-950'
                  }`}
                >
                  Nul
                </button>
                <button
                  onClick={() => setResultat(m.id, 'B')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    resultats[m.id] === 'B' ? 'bg-red-600 text-white' : 'bg-gray-100 text-navy-950'
                  }`}
                >
                  {m.equipeB}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}