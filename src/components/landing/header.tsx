'use client'

import Link from 'next/link'
import { Button } from '@/src/components/ui/button'

export default function Header() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <img 
              src="/yachay-logo-frente.png" 
              alt="YachayFlow" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-bold text-lg text-foreground hidden sm:inline">YachayFlow</span>
        </Link>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-foreground hover:text-accent">
              Iniciar sesión
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-primary hover:bg-primary/90 text-accent-foreground">
              Empezar
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}