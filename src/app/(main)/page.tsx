'use client'

import Link from 'next/link'
import { motion, type Variants } from 'motion/react'
import { Radio, Trophy, Newspaper, ChevronRight, Flame, Users } from 'lucide-react'
import Card from '@/components/Card'
import SectionHeader from '@/components/SectionHeader'
import Container from '@/components/Container'
import { mockMatchEnCours, mockMatchsAVenir, mockEquipes, mockMeilleurButeur, mockActualites } from '@/lib/mockData'

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function Home() {
  const matchEnDirect = mockMatchEnCours.statut === 'en_cours' ? mockMatchEnCours : null
  const prochainMatch = !matchEnDirect ? mockMatchsAVenir[0] : null

  return (
    <div>
      {/* Hero */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="bg-navy-950 -m-6 md:-m-8 mb-8 px-6 md:px-8 py-12 pt-16 md:pt-14"
      >
        <Container>
          <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-white uppercase max-w-2xl">
            Le championnat universitaire vit ici
          </h1>
          <p className="text-gray-300 mt-3 max-w-lg">
            Scores en direct, classement, effectifs — tout le CUFO UCAO-UUC dans ta poche.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href={matchEnDirect ? '/matchs/direct' : '/matchs/calendrier'}
              className="flex items-center gap-2 bg-red-600 text-white font-semibold px-5 py-3 rounded-xl hover:bg-red-700 transition-colors"
            >
              <Radio size={18} />
              {matchEnDirect ? 'Suivre le direct' : 'Voir le prochain match'}
            </Link>
            <Link
              href="/equipes"
              className="flex items-center gap-2 bg-white/10 text-white font-semibold px-5 py-3 rounded-xl hover:bg-white/20 transition-colors"
            >
              <Users size={18} />
              Découvrir les équipes
            </Link>
          </div>
        </Container>
      </motion.div>

      {/* Carte match en direct / prochain match */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="mb-10"
      >
        <Container>
          {matchEnDirect ? (
            <Card padding="md" accent="red" interactive className="max-w-md">
              <div className="flex items-center gap-2 mb-3">
                <span className="badge-live inline-flex items-center gap-1">
                  <Radio size={12} />
                  En direct
                </span>
              </div>
              <p className="font-heading font-bold text-lg text-navy-950 mb-1">
                {matchEnDirect.equipeA} vs {matchEnDirect.equipeB}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                {matchEnDirect.date} · {matchEnDirect.scoreA} - {matchEnDirect.scoreB}
              </p>
              <Link href="/matchs/direct" className="text-red-600 font-semibold text-sm flex items-center gap-1">
                Suivre en direct <ChevronRight size={16} />
              </Link>
            </Card>
          ) : prochainMatch ? (
            <Card padding="md" interactive className="max-w-md">
              <p className="text-gray-400 text-xs uppercase tracking-wide font-semibold mb-2">Prochain coup d&apos;envoi</p>
              <p className="font-heading font-bold text-lg text-navy-950 mb-1">
                {prochainMatch.equipeA} vs {prochainMatch.equipeB}
              </p>
              <p className="text-gray-500 text-sm mb-4">{prochainMatch.date}</p>
              <Link href="/matchs/calendrier" className="text-red-600 font-semibold text-sm flex items-center gap-1">
                Voir le calendrier <ChevronRight size={16} />
              </Link>
            </Card>
          ) : null}
        </Container>
      </motion.section>

      {/* Résumé de la compétition */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="mb-10"
      >
        <Container>
          <SectionHeader eyebrow="Chiffres clés" title="Où en est le" accent="championnat" />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
          <motion.div variants={itemVariants}>
            <Card padding="sm" className="text-center">
              <p className="font-heading font-extrabold text-2xl text-navy-950">{mockEquipes.length}</p>
              <p className="text-gray-500 text-xs mt-1">Équipes engagées</p>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card padding="sm" className="text-center">
              <p className="font-heading font-extrabold text-2xl text-navy-950">{mockMatchsAVenir.length}</p>
              <p className="text-gray-500 text-xs mt-1">Matchs à venir</p>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card padding="sm" className="text-center">
              <p className="font-heading font-extrabold text-2xl text-red-600">
                {mockEquipes.reduce((max, e) => Math.max(max, e.matchsJoues), 0)}
              </p>
              <p className="text-gray-500 text-xs mt-1">Journées jouées</p>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card padding="sm" className="text-center">
              <p className="font-heading font-extrabold text-2xl text-navy-950">{mockMeilleurButeur.buts}</p>
              <p className="text-gray-500 text-xs mt-1">Buts du meilleur buteur</p>
            </Card>
          </motion.div>
          </motion.div>
          <Link href="/competition/classement" className="text-red-600 font-semibold text-sm flex items-center gap-1 mt-4">
            Voir le classement complet <ChevronRight size={16} />
          </Link>
        </Container>
      </motion.section>

      {/* Équipes & joueurs à la une */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="mb-10"
      >
        <Container>
          <SectionHeader eyebrow="Le talent du campus" title="Ils font le" accent="spectacle" />
          <Card padding="sm" accent="gold" interactive className="max-w-xs">
            <span className="badge-gold inline-flex items-center gap-1 w-fit mb-3">
              <Trophy size={12} /> Top buteur
            </span>
            <p className="font-heading font-bold text-navy-950">{mockMeilleurButeur.nom}</p>
            <p className="text-gray-500 text-sm">Meilleur buteur — {mockMeilleurButeur.buts} buts</p>
          </Card>
          <Link href="/equipes" className="text-red-600 font-semibold text-sm flex items-center gap-1 mt-4">
            Voir toutes les cartes joueurs <ChevronRight size={16} />
          </Link>
        </Container>
      </motion.section>

      {/* Dernières actualités */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="mb-10"
      >
        <Container>
          <SectionHeader eyebrow="Ça se passe au CUFO" title="Les dernières" accent="nouvelles" />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="flex flex-col md:grid md:grid-cols-3 gap-4"
          >
          {mockActualites.map((actu) => (
            <motion.div key={actu.id} variants={itemVariants}>
              <Card padding="sm" interactive>
                <span className="flex items-center gap-1 text-gray-400 text-xs font-semibold uppercase mb-2">
                  <Newspaper size={12} /> {actu.etiquette}
                </span>
                <p className="font-heading font-bold text-navy-950 mb-1">{actu.titre}</p>
                <p className="text-gray-500 text-sm">{actu.description}</p>
              </Card>
            </motion.div>
          ))}
          </motion.div>
          <Link href="/actualites" className="text-red-600 font-semibold text-sm flex items-center gap-1 mt-4">
            Toutes les actualités <ChevronRight size={16} />
          </Link>
        </Container>
      </motion.section>

      {/* Boîte à suggestions */}
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
        <Container>
          <Card padding="md" className="flex items-center justify-between flex-wrap gap-4 bg-navy-950 border-none">
            <p className="text-white text-sm">
              <Flame size={16} className="inline mr-2 text-red-500" />
              Une remarque sur l&apos;organisation ? Dis-le nous, anonymement.
            </p>
            <Link
              href="/suggestions"
              className="bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
            >
              Envoyer un avis
            </Link>
          </Card>
        </Container>
      </motion.div>
    </div>
  )
}