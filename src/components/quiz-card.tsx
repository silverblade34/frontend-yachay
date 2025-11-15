'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'

interface QuizCardProps {
  option: string
  isSelected: boolean
  isAnswered: boolean
  isCorrect: boolean
  onSelect: () => void
  selectedAnswer?: string
}

export function QuizCard({
  option,
  isSelected,
  isAnswered,
  isCorrect,
  onSelect,
  selectedAnswer,
}: QuizCardProps) {
  return (
    <button
      onClick={onSelect}
      disabled={isAnswered}
      className={`w-full p-4 rounded-lg border-2 transition-all text-left font-medium ${
        isAnswered
          ? isCorrect
            ? 'bg-green-500/20 border-green-500'
            : isSelected && selectedAnswer === option
            ? 'bg-destructive/20 border-destructive'
            : 'bg-secondary border-border'
          : isSelected
          ? 'bg-accent/20 border-accent'
          : 'bg-secondary border-border hover:border-accent/50'
      } disabled:cursor-default`}
    >
      <div className="flex items-center justify-between">
        <span>{option}</span>
        {isAnswered && (
          isCorrect ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : isSelected && selectedAnswer === option ? (
            <X className="h-5 w-5 text-destructive" />
          ) : null
        )}
      </div>
    </button>
  )
}
