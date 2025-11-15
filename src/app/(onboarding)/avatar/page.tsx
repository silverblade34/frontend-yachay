'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { ChevronRight, Upload } from 'lucide-react'

const AVATARS = [
  { id: 1, emoji: '😀', color: '#FFD93D' },
  { id: 2, emoji: '😎', color: '#6BCB77' },
  { id: 3, emoji: '🥳', color: '#4D96FF' },
  { id: 4, emoji: '😍', color: '#FF6B9D' },
  { id: 5, emoji: '🤔', color: '#FFA500' },
  { id: 6, emoji: '😴', color: '#9B59B6' },
  { id: 7, emoji: '🚀', color: '#1ABC9C' },
  { id: 8, emoji: '🎨', color: '#E74C3C' },
  { id: 9, emoji: '⚡', color: '#F39C12' },
  { id: 10, emoji: '🏆', color: '#2ECC71' },
  { id: 11, emoji: '🎭', color: '#3498DB' },
  { id: 12, emoji: '🌟', color: '#E91E63' },
]

export default function AvatarOnboardingPage() {
  const router = useRouter()
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const handleNext = async () => {
    if (!selectedAvatar) return

    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 600))
      router.push('/interests')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
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
              <div className="h-1.5 flex-1 rounded-full bg-accent"></div>
              <div className="h-1.5 flex-1 rounded-full bg-accent"></div>
              <div className="h-1.5 flex-1 rounded-full bg-border"></div>
            </div>
            <p className="text-sm text-muted-foreground">Step 2 of 3</p>
          </div>

          <h1 className="text-3xl font-bold mb-2">Choose your avatar</h1>
          <p className="text-muted-foreground mb-8">Pick a character that represents you, or upload your own photo</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {AVATARS.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar.id)}
                className={`relative p-4 rounded-2xl transition-all ${
                  selectedAvatar === avatar.id
                    ? 'bg-accent/20 border-2 border-accent scale-105'
                    : 'bg-secondary border-2 border-border hover:border-accent/50'
                }`}
              >
                <div className="text-4xl mb-2">{avatar.emoji}</div>
                {selectedAvatar === avatar.id && (
                  <div className="absolute top-1 right-1 w-3 h-3 bg-accent rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full mb-4 border-border"
          >
            <Upload className="mr-2 h-5 w-5" />
            Upload my photo
          </Button>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-border"
              onClick={handleSkip}
            >
              Skip
            </Button>
            <Button
              onClick={handleNext}
              disabled={loading || !selectedAvatar}
              className="flex-1 bg-accent text-accent-foreground hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Continue'}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
