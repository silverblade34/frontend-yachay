'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { ChevronRight } from 'lucide-react'
import { CustomSelect } from '@/src/components/ui/custom-select'
import { DatePicker } from '@/src/components/ui/date-picker'
import { useProfile, useAcademicData } from '@/src/hooks/use-api'
import { useToast } from '@/src/hooks/use-toast'
import type { AcademicLevel, Career } from '@/src/lib/api/types'

export default function ProfileOnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { updateProfile, loading: profileLoading } = useProfile()
  const { getAcademicLevels, getCareersByAcademic, loading: dataLoading } = useAcademicData()
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    academicLevel: '',
    career: '',
    birthDate: '',
  })
  
  const [academicLevels, setAcademicLevels] = useState<AcademicLevel[]>([])
  const [careers, setCareers] = useState<Career[]>([])
  const [error, setError] = useState('')

  // Cargar niveles académicos al montar el componente
  useEffect(() => {
    loadAcademicLevels()
  }, [])

  // Cargar carreras cuando se selecciona un nivel académico
  useEffect(() => {
    if (formData.academicLevel) {
      loadCareers(formData.academicLevel)
    } else {
      setCareers([])
      setFormData(prev => ({ ...prev, career: '' }))
    }
  }, [formData.academicLevel])

  const loadAcademicLevels = async () => {
    try {
      const data = await getAcademicLevels()
      setAcademicLevels(data)
    } catch (err) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los niveles académicos',
        variant: 'destructive',
      })
    }
  }

  const loadCareers = async (academicId: string) => {
    try {
      const data = await getCareersByAcademic(academicId)
      setCareers(data)
    } catch (err) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las carreras',
        variant: 'destructive',
      })
    }
  }

  const genderOptions = [
    { value: 'male', label: 'Masculino' },
    { value: 'female', label: 'Femenino' },
    { value: 'other', label: 'Otro' }
  ]

  const academicOptions = academicLevels.map(level => ({
    value: level.id,
    label: level.name
  }))

  const careerOptions = careers.map(career => ({
    value: career.id,
    label: career.name
  }))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = async () => {
    setError('')

    // Validación
    if (!formData.firstName || !formData.lastName || !formData.gender || 
        !formData.academicLevel || !formData.birthDate) {
      setError('Por favor, rellena todos los campos obligatorios.')
      return
    }

    try {
      // Preparar datos para la API
      const profileData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender as 'male' | 'female' | 'other',
        birthDate: formData.birthDate,
        academicLevelId: formData.academicLevel,
        careerId: formData.career || undefined,
        preferenceIds: [] // Se llenará en el siguiente paso
      }

      await updateProfile(profileData)
      
      toast({
        title: '¡Perfil actualizado!',
        description: 'Tu información se guardó correctamente.',
      })
      
      router.push('/avatar')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'No se pudo guardar el perfil.'
      setError(errorMessage)
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
    }
  }

  // Mostrar si los niveles académicos están siendo necesarios para mostrar el select
  const showCareerSelect = formData.academicLevel && 
    ['7cde23b2-0125-4ece-b884-1f3ce041ac06', '3e59c0e8-2871-4028-9462-3a830ee8b7cb', '5a252cbc-b590-4206-8d74-54e94cf0e15b'].includes(formData.academicLevel)

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
          <p className="text-muted-foreground mb-4">Cuéntanos un poco sobre ti para que podamos personalizar tu experiencia de aprendizaje.</p>

          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive rounded-lg text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium mb-2 block">
                  Nombres <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Juan"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-medium mb-2 block">
                  Apellidos <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Pérez"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gender" className="text-sm font-medium mb-2 block">
                  Género <span className="text-destructive">*</span>
                </Label>
                <CustomSelect
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                  options={genderOptions}
                  placeholder="Seleccionar género"
                />
              </div>

              <div>
                <Label htmlFor="academicLevel" className="text-sm font-medium mb-2 block">
                  Nivel académico <span className="text-destructive">*</span>
                </Label>
                <CustomSelect
                  id="academicLevel"
                  name="academicLevel"
                  value={formData.academicLevel}
                  onChange={(value) => setFormData(prev => ({ ...prev, academicLevel: value }))}
                  options={academicOptions}
                  placeholder={dataLoading ? "Cargando..." : "Seleccionar nivel"}
                />
              </div>
            </div>

            {showCareerSelect && (
              <div>
                <Label htmlFor="career" className="text-sm font-medium mb-2 block">
                  Carrera (opcional)
                </Label>
                <CustomSelect
                  id="career"
                  name="career"
                  value={formData.career}
                  onChange={(value) => setFormData(prev => ({ ...prev, career: value }))}
                  options={careerOptions}
                  placeholder={dataLoading ? "Cargando..." : "Seleccionar carrera"}
                />
              </div>
            )}

            <div>
              <Label htmlFor="birthDate" className="text-sm font-medium mb-2 block">
                Fecha de nacimiento <span className="text-destructive">*</span>
              </Label>
              <DatePicker
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={(value) => setFormData(prev => ({ ...prev, birthDate: value }))}
                placeholder="DD / MM / AAAA"
                minYear={1950}
                maxYear={2018}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <Button
              onClick={handleNext}
              disabled={profileLoading || dataLoading}
              className="flex-1 bg-primary text-accent-foreground hover:opacity-90"
            >
              {profileLoading ? 'Guardando...' : 'Continuar'}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}