'use client'

import Link from 'next/link'
import { BookOpen, Github, Twitter, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/50 backdrop-blur-sm overflow-hidden">
      {/* Efectos de fondo sutiles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <img 
                  src="/yachay-logo-frente.png" 
                  alt="YachayFlow" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-lg">YachayFlow</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Aprende más inteligente, no más difícil.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all hover:scale-110">
                <Twitter className="w-4 h-4 text-primary" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all hover:scale-110">
                <Github className="w-4 h-4 text-primary" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all hover:scale-110">
                <Linkedin className="w-4 h-4 text-primary" />
              </a>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h4 className="font-semibold mb-4 text-foreground">Producto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors inline-flex items-center group">
                <span className="group-hover:translate-x-1 transition-transform">Funcionalidades</span>
              </Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors inline-flex items-center group">
                <span className="group-hover:translate-x-1 transition-transform">Precios</span>
              </Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors inline-flex items-center group">
                <span className="group-hover:translate-x-1 transition-transform">Preguntas Frecuentes</span>
              </Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors inline-flex items-center group">
                <span className="group-hover:translate-x-1 transition-transform">API</span>
              </Link></li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-semibold mb-4 text-foreground">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors inline-flex items-center group">
                <span className="group-hover:translate-x-1 transition-transform">Nosotros</span>
              </Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors inline-flex items-center group">
                <span className="group-hover:translate-x-1 transition-transform">Blog</span>
              </Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors inline-flex items-center group">
                <span className="group-hover:translate-x-1 transition-transform">Carreras</span>
              </Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors inline-flex items-center group">
                <span className="group-hover:translate-x-1 transition-transform">Comunidad</span>
              </Link></li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors inline-flex items-center group">
                <span className="group-hover:translate-x-1 transition-transform">Privacidad</span>
              </Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors inline-flex items-center group">
                <span className="group-hover:translate-x-1 transition-transform">Términos</span>
              </Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors inline-flex items-center group">
                <span className="group-hover:translate-x-1 transition-transform">Cookies</span>
              </Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors inline-flex items-center group">
                <Mail className="w-3.5 h-3.5 mr-1.5" />
                <span className="group-hover:translate-x-1 transition-transform">Contacto</span>
              </Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p>© 2025 YachayFlow. Todos los derechos reservados.</p>
          <p className="text-xs">
            Hecho con <span className="text-red-500 animate-pulse">❤</span> para estudiantes de todo el mundo
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out backwards;
        }
      `}</style>
    </footer>
  )
}