'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { ChevronRight, Search } from 'lucide-react'

const INTERESTS = [
  { id: 1, label: 'Matemáticas & Lógica', icon: '🔢' },
  { id: 2, label: 'Ciencias Naturales', icon: '🔬' },
  { id: 3, label: 'Ciencias Sociales', icon: '🌍' },
  { id: 4, label: 'Idiomas & Lingüística', icon: '🗣️' },
  { id: 5, label: 'Literatura & Escritura', icon: '📚' },
  { id: 6, label: 'Historia & Civilizaciones', icon: '🏛️' },
  { id: 7, label: 'Filosofía & Ética', icon: '💭' },
  { id: 8, label: 'Geografía & Geopolítica', icon: '🗺️' },
  { id: 9, label: 'Programación & Desarrollo', icon: '💻' },
  { id: 10, label: 'Arte & Diseño', icon: '🎨' },
  { id: 11, label: 'Música & Artes Escénicas', icon: '🎵' },
  { id: 12, label: 'Negocios & Emprendimiento', icon: '💼' },
]

export default function InterestsOnboardingPage() {
  const router = useRouter()
  const [selectedInterests, setSelectedInterests] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  const filteredInterests = INTERESTS.filter(interest =>
    interest.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleInterest = (id: number) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleStart = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 600))
      router.push('/dashboard')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-3xl">
        <Card className="border-border bg-card p-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
              <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
              <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
            </div>
            <p className="text-sm text-muted-foreground">Paso 3 de 3</p>
          </div>

          <h1 className="text-3xl font-bold mb-2">¿Qué quieres aprender?</h1>
          <p className="text-muted-foreground mb-6">Selecciona temas que te interesen (al menos uno).</p>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Intereses de búsqueda..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Interest chips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {filteredInterests.map(interest => (
              <button
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedInterests.includes(interest.id)
                    ? 'bg-accent/20 border-accent'
                    : 'bg-secondary border-border hover:border-accent/50'
                }`}
              >
                <div className="text-2xl mb-2">{interest.icon}</div>
                <p className="font-medium text-sm">{interest.label}</p>
              </button>
            ))}
          </div>

          {/* Counter */}
          <p className="text-center text-sm text-muted-foreground mb-6">
            {selectedInterests.length} {selectedInterests.length === 1 ? 'interest' : 'interests'} selected
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-border"
              onClick={() => router.back()}
            >
              Retroceder
            </Button>
            <Button
              onClick={handleStart}
              disabled={loading || selectedInterests.length === 0}
              className="flex-1 bg-accent text-accent-foreground hover:opacity-90 disabled:opacity-50"
            >
              {loading ? '¡Comenzando..!' : '¡Comenzar mi aventura!'}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
