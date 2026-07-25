'use client'

import { motion, type Variants } from 'motion/react'
import Card from '@/components/Card'
import PageHeader from '@/components/PageHeader'
import SectionHeader from '@/components/SectionHeader'
import { mockEquipes } from '@/lib/mockData'

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

export default function ClassementPage() {
  const classement = [...mockEquipes].sort((a, b) => b.points - a.points)

  return (
    <div>
      <PageHeader title="Classement" subtitle="Championnat CUFO UCAO-UUC" />

      <motion.div initial="hidden" animate="show" variants={sectionVariants}>
        <SectionHeader eyebrow="Position actuelle des équipes" title="Classement" accent="Général" />

        <Card padding="none" className="max-w-2xl overflow-x-auto">
          <table className="w-full text-navy-950 min-w-140">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-gray-200">
                <th className="text-left font-medium p-4">#</th>
                <th className="text-left font-medium p-4">Équipe</th>
                <th className="text-center font-medium p-4">J</th>
                <th className="text-center font-medium p-4">V</th>
                <th className="text-center font-medium p-4">N</th>
                <th className="text-center font-medium p-4">D</th>
                <th className="text-center font-medium p-4">BP</th>
                <th className="text-center font-medium p-4">BC</th>
                <th className="text-center font-medium p-4">Diff</th>
                <th className="text-right font-medium p-4">Pts</th>
              </tr>
            </thead>
            <motion.tbody initial="hidden" animate="show" variants={containerVariants}>
              {classement.map((e, i) => {
                const diff = e.butsPour - e.butsContre
                return (
                  <motion.tr
                    key={e.id}
                    variants={rowVariants}
                    className={`table-row-hover border-b border-gray-100 last:border-0 ${i < 3 ? 'table-row-highlight' : ''}`}
                  >
                    <td className="p-4 text-gray-500">{i + 1}</td>
                    <td className="p-4 font-semibold">{e.nom}</td>
                    <td className="p-4 text-center text-gray-500">{e.matchsJoues}</td>
                    <td className="p-4 text-center text-gray-500">{e.victoires}</td>
                    <td className="p-4 text-center text-gray-500">{e.nuls}</td>
                    <td className="p-4 text-center text-gray-500">{e.defaites}</td>
                    <td className="p-4 text-center text-gray-500">{e.butsPour}</td>
                    <td className="p-4 text-center text-gray-500">{e.butsContre}</td>
                    <td className={`p-4 text-center font-medium ${diff > 0 ? 'text-green-600' : diff < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                      {diff > 0 ? `+${diff}` : diff}
                    </td>
                    <td className="p-4 text-right text-red-600 font-bold">{e.points}</td>
                  </motion.tr>
                )
              })}
            </motion.tbody>
          </table>
        </Card>
      </motion.div>
    </div>
  )
}