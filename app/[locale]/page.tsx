import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ServiceCards from '@/components/ServiceCards'
import StatsCounter from '@/components/StatsCounter'
import Gallery from '@/components/Gallery'
import Testimonials from '@/components/Testimonials'
import CoverageMap from '@/components/CoverageMap'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServiceCards />
        <StatsCounter />
        <Gallery />
        <Testimonials />
        <CoverageMap />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
