'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { ChevronRight, User, Calendar } from 'lucide-react'

export default function ProfileOnboardingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    academicLevel: '',
    birthDate: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = async () => {
    setError('')
    
    if (!formData.firstName || !formData.lastName || !formData.gender || !formData.academicLevel || !formData.birthDate) {
      setError('Por favor, rellene todos los campos.')
      return
    }

    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 600))
      router.push('/avatar')
    } catch (err) {
      setError('No se pudo guardar el perfil. Inténtelo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl">
        <Card className="border-border bg-card p-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
              <div className="h-1.5 flex-1 rounded-full bg-border"></div>
              <div className="h-1.5 flex-1 rounded-full bg-border"></div>
            </div>
            <p className="text-sm text-muted-foreground">Paso 1 de 3</p>
          </div>

          <h1 className="text-3xl font-bold mb-2">Vamos a conocerte</h1>
          <p className="text-muted-foreground mb-8">Cuéntanos un poco sobre ti para que podamos personalizar tu experiencia de aprendizaje.</p>

          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive rounded-lg text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium mb-2 block">Nombres</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Nombres"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-medium mb-2 block">Apellidos</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Apellidos"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gender" className="text-sm font-medium mb-2 block">Género</Label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-input border border-input rounded-lg text-foreground"
                >
                  <option value="">Sexo</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not">Prefer not to say</option>
                </select>
              </div>
              <div>
                <Label htmlFor="academicLevel" className="text-sm font-medium mb-2 block">Nivel academico</Label>
                <select
                  id="academicLevel"
                  name="academicLevel"
                  value={formData.academicLevel}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-input border border-input rounded-lg text-foreground"
                >
                  <option value="">Nivel Académico</option>
                  <option value="primary">Primary School</option>
                  <option value="secondary">Secondary School</option>
                  <option value="high-school">High School</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="birthDate" className="text-sm font-medium mb-2 block">Cumpleaños</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            {/* <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
            >
              Retroceder
            </Button> */}
            <Button
              onClick={handleNext}
              disabled={loading}
              className="flex-1 bg-primary text-accent-foreground hover:opacity-90"
            >
              {loading ? 'Guardando...' : 'Continuar'}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
