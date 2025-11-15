'use client'

interface QuizProgressProps {
  currentQuestion: number
  totalQuestions: number
  score: number
  difficulty: string
  pointsPerQuestion: number
}

export function QuizProgress({
  currentQuestion,
  totalQuestions,
  score,
  difficulty,
  pointsPerQuestion,
}: QuizProgressProps) {
  const progress = (currentQuestion / totalQuestions) * 100

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Question {currentQuestion} of {totalQuestions}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent font-medium">{difficulty}</span>
        </div>
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Score display */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/20">
        <span className="text-lg">★</span>
        <span className="font-semibold">{score} pts</span>
        <span className="text-xs text-muted-foreground">({pointsPerQuestion} per question)</span>
      </div>
    </div>
  )
}
