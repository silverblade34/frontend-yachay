'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import { ResultsTabs } from '@/src/components/results-tabs'
import { ChevronLeft, Download, Share2, Home } from 'lucide-react'

// Mock question data from quiz
const MOCK_QUESTIONS = [
  {
    id: 1,
    question: 'What is the capital of France?',
    yourAnswer: 'Paris',
    correctAnswer: 'Paris',
    explanation: 'Paris is the capital and most populous city of France, located in north-central France on the Seine River.',
    points: 20,
    correct: true,
  },
  {
    id: 2,
    question: 'Which planet is known as the Red Planet?',
    yourAnswer: 'Venus',
    correctAnswer: 'Mars',
    explanation: 'Mars is often called the "Red Planet" due to its reddish appearance caused by iron oxide on its surface.',
    points: 20,
    correct: false,
  },
  {
    id: 3,
    question: 'Who wrote Romeo and Juliet?',
    yourAnswer: 'William Shakespeare',
    correctAnswer: 'William Shakespeare',
    explanation: 'William Shakespeare wrote Romeo and Juliet, one of the most famous tragedies in English literature.',
    points: 30,
    correct: true,
  },
  {
    id: 4,
    question: 'What is the largest ocean on Earth?',
    yourAnswer: 'Atlantic Ocean',
    correctAnswer: 'Pacific Ocean',
    explanation: 'The Pacific Ocean is the largest and deepest of Earth\'s five oceanic divisions.',
    points: 20,
    correct: false,
  },
  {
    id: 5,
    question: 'In what year did the Titanic sink?',
    yourAnswer: '1912',
    correctAnswer: '1912',
    explanation: 'The RMS Titanic sank on April 15, 1912, after hitting an iceberg in the North Atlantic.',
    points: 30,
    correct: true,
  },
]

export default function ResultsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const score = parseInt(searchParams.get('score') || '0')
  const totalPoints = parseInt(searchParams.get('total') || '150')
  const correct = parseInt(searchParams.get('correct') || '3')
  const total = MOCK_QUESTIONS.length

  const accuracy = Math.round((correct / total) * 100)
  const timeSpent = 15 * 60 // Mock: 15 minutes
  const hintsUsed = 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 hover:text-accent transition">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm">Back</span>
          </Link>
          <h1 className="text-2xl font-bold">Results</h1>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-secondary transition">
              <Download className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-secondary transition">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Stats Section */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {/* Score */}
          <Card className="p-6 bg-gradient-to-br from-accent/20 to-transparent border-accent/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Score</p>
                <p className="text-3xl font-bold">{score}</p>
              </div>
              <span className="text-4xl">⭐</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">out of {totalPoints} points</p>
          </Card>

          {/* Accuracy */}
          <Card className="p-6 bg-gradient-to-br from-green-500/20 to-transparent border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
                <p className="text-3xl font-bold">{accuracy}%</p>
              </div>
              <span className="text-4xl">🏆</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{correct} correct answers</p>
          </Card>

          {/* Time */}
          <Card className="p-6 bg-gradient-to-br from-blue-500/20 to-transparent border-blue-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Time Spent</p>
                <p className="text-3xl font-bold">{Math.floor(timeSpent / 60)}m</p>
              </div>
              <span className="text-4xl">🕐</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{Math.round(timeSpent / total)}s per question</p>
          </Card>
        </div>

        {/* Results Tabs */}
        <Card className="p-6 bg-card border-border">
          <ResultsTabs
            score={score}
            totalPoints={totalPoints}
            correct={correct}
            total={total}
            questions={MOCK_QUESTIONS}
            hintsUsed={hintsUsed}
            timeSpent={timeSpent}
          />
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <Button
            variant="outline"
            className="flex-1 border-border"
            onClick={() => router.push('/dashboard')}
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Dashboard
          </Button>
          <Button
            onClick={() => router.push('/create-test')}
            className="flex-1 bg-accent text-accent-foreground hover:opacity-90"
          >
            Try Another Test
          </Button>
        </div>
      </main>
    </div>
  )
}
