interface SectionHeaderProps {
  eyebrow: string
  title: string
  accent?: string
}

export default function SectionHeader({ eyebrow, title, accent }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="font-heading font-bold text-2xl text-navy-950 uppercase">
        {title} {accent && <span className="text-red-600">{accent}</span>}
      </h2>
      <p className="text-gray-400 text-xs uppercase tracking-wide mt-1">{eyebrow}</p>
      <div className="flex items-center gap-1 mt-2">
        <span className="w-10 h-0.5 bg-red-600 inline-block" />
        <span className="w-1.5 h-1.5 bg-gold-400 inline-block" />
      </div>
    </div>
  )
}