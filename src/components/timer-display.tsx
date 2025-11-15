'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

interface TimerDisplayProps {
  initialSeconds: number
  isActive: boolean
  onTimeUp?: () => void
}

export function TimerDisplay({ initialSeconds, isActive, onTimeUp }: TimerDisplayProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)

  useEffect(() => {
    if (!isActive || secondsLeft <= 0) return

    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        const next = prev - 1
        if (next === 0) {
          onTimeUp?.()
        }
        return next
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, secondsLeft, onTimeUp])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const isWarning = secondsLeft < 300 // Less than 5 minutes

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
      isWarning ? 'bg-destructive/20 text-destructive' : 'bg-accent/20 text-accent'
    }`}>
      <Clock className="h-5 w-5" />
      <span className="font-mono font-semibold">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  )
}
