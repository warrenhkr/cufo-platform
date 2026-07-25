'use client'

import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

const emptySubscribe = () => () => {}

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  // false côté serveur (et lors du premier rendu client, avant hydratation),
  // true juste après — sans passer par un useEffect qui appelle setState.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/10" />
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Changer de thème"
      className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 text-navy-950 dark:text-white transition-colors"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}