import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 pt-20 md:pt-8 flex flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </main>
    </div>
  )
}