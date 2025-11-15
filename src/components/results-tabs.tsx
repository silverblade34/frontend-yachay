'use client'

import { useState } from 'react'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { ChevronDown, Save, BookmarkPlus, Heart, Lightbulb, Zap } from 'lucide-react'

interface Question {
  id: number
  question: string
  yourAnswer: string
  correctAnswer: string
  explanation: string
  points: number
  correct: boolean
}

interface ResultsTabsProps {
  score: number
  totalPoints: number
  correct: number
  total: number
  questions: Question[]
  hintsUsed: number
  timeSpent: number
}

export function ResultsTabs({
  score,
  totalPoints,
  correct,
  total,
  questions,
  hintsUsed,
  timeSpent,
}: ResultsTabsProps) {
  const [activeTab, setActiveTab] = useState('resumen')
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)
  const accuracy = Math.round((correct / total) * 100)
  const avgTimePerQuestion = Math.round(timeSpent / total)

  const tabs = [
    { id: 'resumen', label: 'Resumen' },
    { id: 'analisis', label: 'Análisis' },
    { id: 'aprendizaje', label: 'Aprendizaje' },
    { id: 'guardar', label: 'Guardar' },
  ]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-accent text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Resumen Tab */}
      {activeTab === 'resumen' && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="font-semibold mb-4">Test Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-muted-foreground">Test Title</span>
                <span className="font-medium">World History Quiz</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-muted-foreground">Question Count</span>
                <span className="font-medium">{total} questions</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-muted-foreground">Difficulty</span>
                <span className="font-medium">Intermedio</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium text-green-500">Completed</span>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <h3 className="font-semibold">Distribución de Respuestas</h3>
            <Card className="p-6 bg-card border-border">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Answer Distribution</span>
                    <span className="text-sm text-muted-foreground">{correct} / {total}</span>
                  </div>
                  <div className="flex h-8 gap-1 rounded-lg overflow-hidden bg-border">
                    <div
                      className="bg-green-500 transition-all"
                      style={{ width: `${(correct / total) * 100}%` }}
                    ></div>
                    <div
                      className="bg-destructive transition-all"
                      style={{ width: `${((total - correct) / total) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Correctas: {correct}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive"></div>
                    <span className="text-sm">Incorrectas: {total - correct}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Estadísticas Rápidas</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="p-4 bg-card border-border flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Hints Used</p>
                  <p className="font-semibold">{hintsUsed}</p>
                </div>
              </Card>
              <Card className="p-4 bg-card border-border flex items-center gap-3">
                <Zap className="h-6 w-6 text-accent flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Avg Time / Question</p>
                  <p className="font-semibold">{avgTimePerQuestion}s</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Análisis Tab */}
      {activeTab === 'analisis' && (
        <div className="space-y-4">
          {questions.map((q, index) => (
            <Card
              key={q.id}
              className="overflow-hidden bg-card border-border"
            >
              <button
                onClick={() => setExpandedQuestion(expandedQuestion === q.id ? null : q.id)}
                className="w-full p-4 flex items-start justify-between hover:bg-secondary/50 transition text-left"
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      q.correct ? 'bg-green-500/20 text-green-500' : 'bg-destructive/20 text-destructive'
                    }`}>
                      {index + 1}
                    </span>
                    <p className="font-medium text-sm">{q.question}</p>
                  </div>
                  {!expandedQuestion || expandedQuestion !== q.id ? (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      Your answer: {q.yourAnswer}
                    </p>
                  ) : null}
                </div>
                <ChevronDown
                  className={`h-5 w-5 transition-transform flex-shrink-0 ${
                    expandedQuestion === q.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedQuestion === q.id && (
                <div className="border-t border-border px-4 pb-4 pt-4 space-y-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Your Answer</p>
                    <p className={`font-medium p-3 rounded-lg ${
                      q.correct ? 'bg-green-500/20 text-green-500' : 'bg-destructive/20 text-destructive'
                    }`}>
                      {q.yourAnswer}
                    </p>
                  </div>

                  {!q.correct && (
                    <div>
                      <p className="text-muted-foreground mb-1">Correct Answer</p>
                      <p className="font-medium p-3 rounded-lg bg-green-500/20 text-green-500">
                        {q.correctAnswer}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-muted-foreground mb-1">Explanation</p>
                    <p className="text-muted-foreground leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Aprendizaje Tab */}
      {activeTab === 'aprendizaje' && (
        <div className="space-y-4">
          <Card className="p-6 bg-accent/10 border-accent/30">
            <h3 className="font-semibold mb-2">Learning Insights</h3>
            <p className="text-sm text-muted-foreground">
              Based on your performance, here are personalized recommendations to improve your learning.
            </p>
          </Card>

          <div className="space-y-3">
            {questions
              .filter(q => !q.correct)
              .map(q => (
                <Card key={q.id} className="p-4 bg-card border-border">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">📚</span>
                    <div>
                      <p className="font-medium text-sm mb-1">{q.question}</p>
                      <p className="text-xs text-muted-foreground">{q.explanation}</p>
                    </div>
                  </div>
                </Card>
              ))}
          </div>

          {questions.filter(q => !q.correct).length === 0 && (
            <Card className="p-6 bg-card border-border text-center">
              <p className="text-lg font-semibold mb-2">Perfect Score!</p>
              <p className="text-muted-foreground">You answered all questions correctly. Great job!</p>
            </Card>
          )}
        </div>
      )}

      {/* Guardar Tab */}
      {activeTab === 'guardar' && (
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full border-border justify-start p-6 h-auto"
          >
            <div className="flex-1 text-left">
              <h4 className="font-semibold">Crear Nuevo Módulo</h4>
              <p className="text-sm text-muted-foreground mt-1">Create a new module to organize this test</p>
            </div>
            <ChevronDown className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            className="w-full border-border justify-start p-6 h-auto"
          >
            <div className="flex-1 text-left">
              <h4 className="font-semibold">Agregar a Módulo Existente</h4>
              <p className="text-sm text-muted-foreground mt-1">Add this test to an existing module or collection</p>
            </div>
            <ChevronDown className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            className="w-full border-border justify-start p-6 h-auto"
          >
            <div className="flex-1 text-left flex items-center gap-2">
              <Heart className="h-5 w-5" />
              <div>
                <h4 className="font-semibold">Marcar como Favorito</h4>
                <p className="text-sm text-muted-foreground mt-1">Save this test to your favorites for quick access</p>
              </div>
            </div>
            <ChevronDown className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  )
}
