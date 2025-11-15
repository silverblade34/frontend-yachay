'use client'

import Link from 'next/link'
import { Button } from '@/src/components/ui/button'

export default function Header() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">LF</span>
          </div>
          <span className="font-bold text-lg text-foreground hidden sm:inline">LearnFlow</span>
        </Link>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/register">
            <Button variant="ghost" className="text-foreground hover:text-accent">
              Sign In
            </Button>
          </Link>
          <Link href="/login">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
