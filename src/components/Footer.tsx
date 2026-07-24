import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="mt-16 pt-8 border-t border-gray-200 text-center pb-8">
      <p className="font-heading font-bold text-navy-950 text-lg uppercase">CUSA UCAO</p>
      <p className="text-gray-400 text-sm italic mt-1">Ton équipe, ta vision, ta victoire</p>
      <div className="flex justify-center gap-3 mt-4">
        {[FaFacebook, FaYoutube, FaInstagram].map((Icon, i) => (
          <span
            key={i}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-navy-950"
          >
            <Icon size={16} />
          </span>
        ))}
      </div>
    </footer>
  )
}