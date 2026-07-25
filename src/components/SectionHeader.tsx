interface SectionHeaderProps {
  eyebrow: string
  title: string
  accent?: string
}

export default function SectionHeader({ eyebrow, title, accent }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center justify-center rounded-full bg-red-600 px-3 py-1 text-[11px] uppercase tracking-[0.35em] font-semibold text-white">
          {eyebrow}
        </span>
        <div className="h-px flex-1 bg-slate-200/80" />
      </div>
      <h2 className="mt-4 text-3xl font-heading font-bold tracking-tight text-navy-950">
        {title} {accent && <span className="text-red-600">{accent}</span>}
      </h2>
    </div>
  )
}