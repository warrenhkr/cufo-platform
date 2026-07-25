import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-navy-950 text-white px-6 pb-8 pt-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-heading font-black text-lg uppercase tracking-[0.25em] text-white">
            CUFO <span className="text-red-500">UCAO-UUC</span>
          </p>
          <p className="text-gray-300 text-sm italic mt-2">
            Le championnat universitaire qui rassemble le campus
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          {[FaFacebook, FaYoutube, FaInstagram].map((Icon, i) => (
            <span
              key={i}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition hover:bg-red-600"
            >
              <Icon size={16} />
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}