import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import Servicios from '@/components/sections/Servicios'
import ComoFunciona from '@/components/sections/ComoFunciona'
import Proceso from '@/components/sections/Proceso'
import Tecnologia from '@/components/sections/Tecnologia'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/ui/Footer'

export default function Home() {
  return (
    <main style={{ background: '#0A0A0F' }}>
      <Navbar />
      <Hero />
      <Servicios />
      <ComoFunciona />
      <Proceso />
      <Tecnologia />
      <CTA />
      <Footer />
    </main>
  )
}