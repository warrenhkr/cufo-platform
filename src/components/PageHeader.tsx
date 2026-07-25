interface PageHeaderProps {
  title: string
  subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="relative hero-surface -mx-6 md:-mx-8 mb-8 px-6 md:px-8 py-10 pt-16 md:pt-10 overflow-hidden">
      <div className="absolute inset-0 field-graphic opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/5 to-transparent" />

      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-white/80 mb-4">
          <span className="h-2 w-2 rounded-full bg-red-600 shadow-lg shadow-red-600/40" />
          OFFICIEL
        </div>
        <h1 className="font-heading font-black text-3xl md:text-5xl leading-tight text-white uppercase">
          {title}
        </h1>
        {subtitle && <p className="text-gray-300 mt-3 max-w-3xl text-sm md:text-base">{subtitle}</p>}
      </div>
    </div>
  )
}