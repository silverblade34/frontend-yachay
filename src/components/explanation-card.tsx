'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Card } from '@/src/components/ui/card'

interface ExplanationCardProps {
  explanation: string
  correctAnswer: string
}

export function ExplanationCard({ explanation, correctAnswer }: ExplanationCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="border-border bg-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition"
      >
        <div className="text-left">
          <p className="font-semibold text-sm mb-1">Explanation</p>
          <p className="text-xs text-accent">Correct answer: {correctAnswer}</p>
        </div>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4 border-t border-border pt-4 text-sm text-muted-foreground">
          {explanation}
        </div>
      )}
    </Card>
  )
}
