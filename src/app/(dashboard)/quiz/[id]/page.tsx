'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import { QuizCard } from '@/src/components/quiz-card'
import { TimerDisplay } from '@/src/components/timer-display'
import { QuizProgress } from '@/src/components/quiz-progress'
import { ExplanationCard } from '@/src/components/explanation-card'
import { Lightbulb, ChevronRight } from 'lucide-react'

// Mock quiz data
const MOCK_QUESTIONS = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correct: 'Paris',
    explanation: 'Paris is the capital and most populous city of France, located in north-central France on the Seine River.',
    difficulty: 'Básico',
    points: 20,
  },
  {
    id: 2,
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correct: 'Mars',
    explanation: 'Mars is often called the "Red Planet" due to its reddish appearance caused by iron oxide on its surface.',
    difficulty: 'Básico',
    points: 20,
  },
  {
    id: 3,
    question: 'Who wrote Romeo and Juliet?',
    options: ['Jane Austen', 'Charles Dickens', 'William Shakespeare', 'Mark Twain'],
    correct: 'William Shakespeare',
    explanation: 'William Shakespeare wrote Romeo and Juliet, one of the most famous tragedies in English literature.',
    difficulty: 'Intermedio',
    points: 30,
  },
  {
    id: 4,
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correct: 'Pacific Ocean',
    explanation: 'The Pacific Ocean is the largest and deepest of Earth\'s five oceanic divisions.',
    difficulty: 'Básico',
    points: 20,
  },
  {
    id: 5,
    question: 'In what year did the Titanic sink?',
    options: ['1912', '1905', '1920', '1898'],
    correct: '1912',
    explanation: 'The RMS Titanic sank on April 15, 1912, after hitting an iceberg in the North Atlantic.',
    difficulty: 'Intermedio',
    points: 30,
  },
]

export default function QuizPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [timeLimit] = useState(30 * 60) // 30 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(true)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const question = MOCK_QUESTIONS[currentQuestion]

  const handleSelectAnswer = (option: string) => {
    if (answered) return
    
    setSelectedAnswer(option)
    setAnswered(true)
    setShowExplanation(true)

    if (option === question.correct) {
      setScore(prev => prev + question.points)
    }
  }

  const handleContinue = () => {
    if (currentQuestion < MOCK_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setAnswered(false)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleUseHint = () => {
    // Disable hint for now, just increment counter
    setHintsUsed(prev => prev + 1)
  }

  const handleFinish = () => {
    router.push(`/results/${params.id}?score=${score}&total=${MOCK_QUESTIONS.length * 30}&correct=${MOCK_QUESTIONS.filter((_, i) => i < currentQuestion || (i === currentQuestion && selectedAnswer === question.correct)).length}`)
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full border-border bg-card text-center">
          <h1 className="text-2xl font-bold mb-4">Ready to start?</h1>
          <p className="text-muted-foreground mb-6">You have {MOCK_QUESTIONS.length} questions to answer in 30 minutes</p>
          <Button
            onClick={() => setQuizStarted(true)}
            className="w-full bg-accent text-accent-foreground hover:opacity-90"
          >
            Start Quiz
          </Button>
        </Card>
      </div>
    )
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full border-border bg-card text-center space-y-6">
          <div className="text-6xl animate-bounce">🎉</div>
          <h1 className="text-3xl font-bold">Quiz Complete!</h1>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-accent">{score} points</p>
            <p className="text-muted-foreground">{Math.round((score / (MOCK_QUESTIONS.length * 30)) * 100)}% accuracy</p>
          </div>
          <Button
            onClick={handleFinish}
            className="w-full bg-accent text-accent-foreground hover:opacity-90"
          >
            View Results
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <QuizProgress
                currentQuestion={currentQuestion + 1}
                totalQuestions={MOCK_QUESTIONS.length}
                score={score}
                difficulty={question.difficulty}
                pointsPerQuestion={question.points}
              />
            </div>
            <TimerDisplay
              initialSeconds={timeLimit}
              isActive={true}
              onTimeUp={handleFinish}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Question */}
          <Card className="p-8 border-l-4 border-l-accent border-border bg-card">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold flex-1">{question.question}</h2>
              <span className="text-sm px-3 py-1 rounded-full bg-accent/20 text-accent font-medium whitespace-nowrap ml-4">
                {question.points} pts
              </span>
            </div>
          </Card>

          {/* Answer Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <QuizCard
                key={index}
                option={option}
                isSelected={selectedAnswer === option}
                isAnswered={answered}
                isCorrect={option === question.correct}
                onSelect={() => handleSelectAnswer(option)}
                selectedAnswer={selectedAnswer}
              />
            ))}
          </div>

          {/* Hint Button */}
          {!answered && (
            <Button
              onClick={handleUseHint}
              variant="outline"
              className="w-full border-border"
            >
              <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
              Ver pista
            </Button>
          )}

          {/* Explanation */}
          {answered && showExplanation && (
            <ExplanationCard
              explanation={question.explanation}
              correctAnswer={question.correct}
            />
          )}

          {/* Continue Button */}
          {answered && (
            <Button
              onClick={handleContinue}
              className="w-full bg-accent text-accent-foreground hover:opacity-90 h-12 text-base"
            >
              Continuar
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}
