'use client'

import { Button } from '@/src/components/ui/button'
import Link from 'next/link'
import { Sparkles, BookOpen, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background pointer-events-none" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Efecto de partículas flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6 inline-block animate-fade-in">
          <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Bienvenido al futuro del aprendizaje
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight mb-6 animate-fade-in-up">
          Genera Exámenes y{' '}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient">
            Domina Cualquier Tema
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Con YachayFlow, elige tu tema y genera quizzes personalizados al instante. Repasa, practica y domina cualquier materia con el poder de la inteligencia artificial.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link href="/login">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-accent-foreground w-full sm:w-auto group relative overflow-hidden">
              <span className="relative z-10">Comenzar Gratis</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10 w-full sm:w-auto group">
              Explorar Funciones
              <Sparkles className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 hover:scale-105 hover:border-primary/50 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">50K+</div>
            <div className="text-xs text-muted-foreground mt-1">Estudiantes</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 hover:scale-105 hover:border-accent/50 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <Sparkles className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-accent">10K+</div>
            <div className="text-xs text-muted-foreground mt-1">Quizzes</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 hover:scale-105 hover:border-secondary/50 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Zap className="w-6 h-6 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-secondary">24/7</div>
            <div className="text-xs text-muted-foreground mt-1">Disponible</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10%, 90% {
            opacity: 1;
          }
          50% {
            transform: translateY(-100vh) translateX(20px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out backwards;
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  )
}