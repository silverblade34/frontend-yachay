'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { ChevronRight, Upload } from 'lucide-react'
import { useProfile, useAcademicData } from '@/src/hooks/use-api'
import { useToast } from '@/src/hooks/use-toast'
import type { Character } from '@/src/lib/api/types'
import Image from 'next/image'

export default function AvatarOnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { uploadAvatar, loading: uploadLoading } = useProfile()
  const { getCharacters, loading: charactersLoading } = useAcademicData()
  
  const [characters, setCharacters] = useState<Character[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadCharacters()
  }, [])

  const loadCharacters = async () => {
    try {
      const data = await getCharacters()
      setCharacters(data)
    } catch (err) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los avatares',
        variant: 'destructive',
      })
    }
  }

  const handleCharacterSelect = (characterId: string) => {
    setSelectedCharacter(characterId)
    setUploadedFile(null)
    setPreviewUrl(null)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Por favor, selecciona una imagen válida',
        variant: 'destructive',
      })
      return
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'La imagen no puede superar los 5MB',
        variant: 'destructive',
      })
      return
    }

    setUploadedFile(file)
    setSelectedCharacter(null)

    // Crear preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleNext = async () => {
    if (!selectedCharacter && !uploadedFile) {
      toast({
        title: 'Atención',
        description: 'Por favor, selecciona un avatar o sube una foto',
        variant: 'destructive',
      })
      return
    }

    try {
      if (uploadedFile) {
        // Subir archivo personalizado
        await uploadAvatar(uploadedFile)
      } else if (selectedCharacter) {
        // Usar avatar predefinido
        const character = characters.find(c => c.id === selectedCharacter)
        if (character) {
          await uploadAvatar(undefined, character.imageUrl)
        }
      }

      toast({
        title: '¡Avatar guardado!',
        description: 'Tu avatar se guardó correctamente.',
      })

      router.push('/interests')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'No se pudo guardar el avatar.'
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
    }
  }

  const handleSkip = () => {
    router.push('/interests')
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
              <div className="h-1.5 flex-1 rounded-full bg-border"></div>
            </div>
            <p className="text-sm text-muted-foreground">Paso 2 de 3</p>
          </div>

          <h1 className="text-3xl font-bold mb-2">Elige tu avatar</h1>
          <p className="text-muted-foreground mb-8">
            Elige un personaje que te represente o sube tu propia foto.
          </p>

          {/* Preview de imagen subida */}
          {previewUrl && (
            <div className="mb-6 flex justify-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
                <Image
                  src={previewUrl}
                  alt="Avatar preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Grid de avatares */}
          {charactersLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Cargando avatares...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {characters.map((character) => (
                <button
                  key={character.id}
                  onClick={() => handleCharacterSelect(character.id)}
                  className={`relative p-4 rounded-2xl transition-all ${
                    selectedCharacter === character.id
                      ? 'bg-accent/20 border-2 border-accent scale-105'
                      : 'bg-secondary border-2 border-border hover:border-accent/50'
                  }`}
                  title={character.name}
                >
                  <div className="relative w-full aspect-square mb-2">
                    <Image
                      src={character.imageUrl}
                      alt={character.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-xs text-center truncate">{character.name}</p>
                  {selectedCharacter === character.id && (
                    <div className="absolute top-1 right-1 w-3 h-3 bg-accent rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Input oculto para subir archivo */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Botón para subir foto */}
          <Button
            variant="outline"
            className="w-full mb-4 border-border"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadLoading}
          >
            <Upload className="mr-2 h-5 w-5" />
            {uploadedFile ? 'Cambiar foto' : 'Subir mi foto'}
          </Button>

          {uploadedFile && (
            <p className="text-sm text-muted-foreground text-center mb-4">
              {uploadedFile.name}
            </p>
          )}

          {/* Botones de acción */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-border"
              onClick={handleSkip}
              disabled={uploadLoading}
            >
              Omitir
            </Button>
            <Button
              onClick={handleNext}
              disabled={uploadLoading || (!selectedCharacter && !uploadedFile)}
              className="flex-1 bg-primary text-accent-foreground hover:opacity-90 disabled:opacity-50"
            >
              {uploadLoading ? 'Guardando...' : 'Continuar'}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}