'use client'

import { motion, type Variants } from 'motion/react'
import { Radio } from 'lucide-react'
import Card from '@/components/Card'
import PageHeader from '@/components/PageHeader'
import SectionHeader from '@/components/SectionHeader'
import { mockMatchEnCours } from '@/lib/mockData'

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function MatchDirectPage() {
  const match = mockMatchEnCours.statut === 'en_cours' ? mockMatchEnCours : null

  return (
    <div>
      <PageHeader title="En Direct" subtitle="Suivez les matchs en cours en temps réel" />

      <motion.div initial="hidden" animate="show" variants={sectionVariants}>
        <SectionHeader eyebrow="Ce qui se joue maintenant" title="Match" accent="En Cours" />

        {match ? (
          <Card padding="md" accent="red" className="max-w-md">
            <div className="flex items-center gap-2 mb-3">
              <span className="badge-live inline-flex items-center gap-1">
                <Radio size={12} />
                En direct
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-2">{match.date}</p>
            <div className="flex items-center justify-between text-navy-950">
              <span className="font-semibold">{match.equipeA}</span>
              <span className="text-red-600 font-bold text-lg">
                {match.scoreA} - {match.scoreB}
              </span>
              <span className="font-semibold">{match.equipeB}</span>
            </div>
          </Card>
        ) : (
          <Card padding="md" className="max-w-md text-center">
            <p className="text-gray-500 text-sm">Aucun match en direct pour le moment.</p>
          </Card>
        )}
      </motion.div>
    </div>
  )
}