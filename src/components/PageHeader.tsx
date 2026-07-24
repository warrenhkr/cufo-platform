interface PageHeaderProps {
  title: string
  subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="bg-navy-950 -m-6 md:-m-8 mb-8 px-6 md:px-8 py-10 pt-16 md:pt-10">
      <h1 className="font-heading font-extrabold text-3xl text-white uppercase">{title}</h1>
      {subtitle && <p className="text-gray-300 mt-2">{subtitle}</p>}
    </div>
  )
}