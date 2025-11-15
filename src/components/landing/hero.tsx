'use client'

import { Button } from '@/src/components/ui/button'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background pointer-events-none" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6 inline-block">
          <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
            Welcome to the future of learning
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight mb-6">
          Learn, Compete & Master{' '}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Any Skill
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
          Join thousands of learners in our gamified platform. Earn XP, climb leaderboards, and unlock achievements while mastering topics you love.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/signup">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-accent-foreground w-full sm:w-auto">
              Start Learning Free
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10 w-full sm:w-auto">
              Explore Features
            </Button>
          </Link>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
            <div className="text-2xl font-bold text-primary">50K+</div>
            <div className="text-xs text-muted-foreground mt-1">Active Learners</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
            <div className="text-2xl font-bold text-accent">10K+</div>
            <div className="text-xs text-muted-foreground mt-1">Quizzes</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
            <div className="text-2xl font-bold text-secondary">24/7</div>
            <div className="text-xs text-muted-foreground mt-1">Available</div>
          </div>
        </div>
      </div>
    </section>
  )
}
