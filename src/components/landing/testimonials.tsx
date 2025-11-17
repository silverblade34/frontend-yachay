'use client'

import { Card } from '@/src/components/ui/card'
import { Laptop, GraduationCap, BookOpen } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Desarrolladora de Software',
    content: 'YachayFlow hizo que aprender volviera a ser divertido. La gamificación me mantuvo motivada para terminar un curso completo.',
    icon: <Laptop className="w-10 h-10 text-primary" />,
  },
  {
    name: 'Marcus Johnson',
    role: 'Estudiante',
    content: 'La competencia en el tablero de posiciones me motivó a estudiar de forma constante. ¡Mis puntajes mejoraron un 40%!',
    icon: <GraduationCap className="w-10 h-10 text-blue-500" />,
  },
  {
    name: 'Elena Rodriguez',
    role: 'Docente',
    content: 'Uso YachayFlow con mis estudiantes. El nivel de participación y finalización de actividades ha aumentado muchísimo.',
    icon: <BookOpen className="w-10 h-10 text-green-500" />,
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Confiado por{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Miles de Personas
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Mira lo que dicen nuestros usuarios sobre su experiencia
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} className="bg-card/50 border border-border/50 backdrop-blur-sm p-6">
              <p className="text-muted-foreground mb-4 italic">
                "{t.content}"
              </p>

              <div className="flex items-center gap-3">
                <div>{t.icon}</div>
                <div>
                  <div className="font-semibold text-foreground">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
