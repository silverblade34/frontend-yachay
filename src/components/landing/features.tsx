'use client'

import { Card } from '@/src/components/ui/card'
import { Zap, Flame, Trophy, Medal, BarChart3, Pencil } from 'lucide-react'

const features = [
  {
    title: 'Sistema de XP y Niveles',
    description: 'Gana puntos de experiencia con cada cuestionario completado y sube de nivel mientras avanzas.',
    icon: <Zap className="w-10 h-10 text-primary" />,
  },
  {
    title: 'Rachas de Estudio',
    description: 'Construye hábitos de aprendizaje constantes con contadores de racha que te motivan diariamente.',
    icon: <Flame className="w-10 h-10 text-orange-500" />,
  },
  {
    title: 'Tablas de Clasificación',
    description: 'Compite con otros estudiantes y mira en qué posición te encuentras a nivel global.',
    icon: <Trophy className="w-10 h-10 text-yellow-500" />,
  },
  {
    title: 'Logros y Medallas',
    description: 'Desbloquea insignias y logros para celebrar tus avances y destacar tus habilidades.',
    icon: <Medal className="w-10 h-10 text-blue-500" />,
  },
  {
    title: 'Seguimiento de Progreso',
    description: 'Analíticas detalladas muestran tu mejora a lo largo del tiempo mediante gráficos visuales.',
    icon: <BarChart3 className="w-10 h-10 text-green-500" />,
  },
  {
    title: 'Cuestionarios Personalizados',
    description: 'Crea y comparte tus propios cuestionarios con la comunidad o mantenlos privados.',
    icon: <Pencil className="w-10 h-10 text-purple-500" />,
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Funciones Potentes para{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Un Mejor Aprendizaje
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Todo lo que necesitas para aprender más rápido, de forma más inteligente y con más motivación.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card
              key={i}
              className="bg-card/50 border border-border/50 backdrop-blur-sm p-6 hover:border-primary/50 transition-colors"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
