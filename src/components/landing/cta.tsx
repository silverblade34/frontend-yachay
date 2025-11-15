'use client'

import { Button } from '@/src/components/ui/button'
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-background to-accent/10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
          Ready to Start Your Learning Journey?
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
          Join our community today and discover a smarter way to learn. No credit card required.
        </p>
        <Link href="/signup">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
            Sign Up Free
          </Button>
        </Link>
      </div>
    </section>
  )
}
