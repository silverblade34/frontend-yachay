'use client'

import Header from '@/src/components/landing/header'
import Hero from '@/src/components/landing/hero'
import Features from '@/src/components/landing/features'
import Stats from '@/src/components/landing/stats'
import Testimonials from '@/src/components/landing/testimonials'
import CTA from '@/src/components/landing/cta'
import Footer from '@/src/components/landing/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
