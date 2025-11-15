'use client'

import { useState } from 'react'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { Sparkles, ChevronRight, Minus, Plus, Sliders } from 'lucide-react'

interface TestConfig {
  title: string
  subject: string
  description: string
  category: string
  difficulty: string
  questionTypes: string[]
  questionCount: number
  timeLimit: number
}

interface CreateTestTabsProps {
  onCreateTest: (config: TestConfig) => void
}

const SUBJECTS = [
  { name: 'Matemáticas', icon: '🔢' },
  { name: 'Ciencias', icon: '🔬' },
  { name: 'Historia', icon: '🏛️' },
  { name: 'Idiomas', icon: '🗣️' },
  { name: 'Literatura', icon: '📚' },
  { name: 'Geografía', icon: '🗺️' },
]

const QUESTION_TYPES = [
  'Opción Múltiple',
  'Selección Múltiple',
  'Verdadero/Falso',
  'Completar Espacios',
  'Arrastrar y Soltar',
  'Ordenar Secuencia',
  'Seleccionar Texto',
]

const DIFFICULTIES = ['Básico', 'Intermedio', 'Avanzado', 'Experto']

const CATEGORIES = [
  'General',
  'Académico',
  'Profesional',
  'Certificación',
  'Preparación de Examen',
]

export function CreateTestTabs({ onCreateTest }: CreateTestTabsProps) {
  const [activeTab, setActiveTab] = useState(1)
  const [config, setConfig] = useState<TestConfig>({
    title: '',
    subject: '',
    description: '',
    category: '',
    difficulty: '',
    questionTypes: [],
    questionCount: 10,
    timeLimit: 30,
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: keyof TestConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }))
  }

  const toggleQuestionType = (type: string) => {
    setConfig(prev => ({
      ...prev,
      questionTypes: prev.questionTypes.includes(type)
        ? prev.questionTypes.filter(t => t !== type)
        : [...prev.questionTypes, type],
    }))
  }

  const incrementCounter = (field: 'questionCount' | 'timeLimit') => {
    setConfig(prev => ({ ...prev, [field]: prev[field] + 1 }))
  }

  const decrementCounter = (field: 'questionCount' | 'timeLimit') => {
    setConfig(prev => ({
      ...prev,
      [field]: Math.max(field === 'questionCount' ? 1 : 1, prev[field] - 1),
    }))
  }

  const handleCreate = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      onCreateTest(config)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border">
        {[
          { id: 1, label: 'Information' },
          { id: 2, label: 'Configuration' },
          { id: 3, label: 'Review' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-accent text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Information */}
      {activeTab === 1 && (
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-2 block">Test Title</Label>
            <Input
              placeholder="Enter test title..."
              value={config.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">Subject</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SUBJECTS.map(subject => (
                <button
                  key={subject.name}
                  onClick={() => handleInputChange('subject', subject.name)}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    config.subject === subject.name
                      ? 'bg-accent/20 border-accent'
                      : 'bg-secondary border-border hover:border-accent/50'
                  }`}
                >
                  <div className="text-2xl mb-1">{subject.icon}</div>
                  <p className="text-xs font-medium">{subject.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Description (Optional)</Label>
            <textarea
              placeholder="Describe what this test is about..."
              value={config.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-input border border-input rounded-lg text-foreground resize-none"
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Category</Label>
            <select
              value={config.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-3 py-2 bg-input border border-input rounded-lg text-foreground"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">Difficulty</Label>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map(diff => (
                <button
                  key={diff}
                  onClick={() => handleInputChange('difficulty', diff)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    config.difficulty === diff
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-secondary border border-border hover:border-accent/50'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Configuration */}
      {activeTab === 2 && (
        <div className="space-y-8">
          <div>
            <Label className="text-sm font-medium mb-3 block">Question Types</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {QUESTION_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => toggleQuestionType(type)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border-2 transition-all text-center ${
                    config.questionTypes.includes(type)
                      ? 'bg-accent/20 border-accent text-accent'
                      : 'bg-secondary border-border hover:border-accent/50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-4 block">Number of Questions</Label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => decrementCounter('questionCount')}
                className="p-2 rounded-lg bg-secondary border border-border hover:border-accent/50"
              >
                <Minus className="h-4 w-4" />
              </button>
              <Input
                type="number"
                min="1"
                value={config.questionCount}
                onChange={(e) => handleInputChange('questionCount', Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center"
              />
              <button
                onClick={() => incrementCounter('questionCount')}
                className="p-2 rounded-lg bg-secondary border border-border hover:border-accent/50"
              >
                <Plus className="h-4 w-4" />
              </button>
              <input
                type="range"
                min="1"
                max="100"
                value={config.questionCount}
                onChange={(e) => handleInputChange('questionCount', parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground whitespace-nowrap">{config.questionCount} questions</span>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-4 block">Time Limit (minutes)</Label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => decrementCounter('timeLimit')}
                className="p-2 rounded-lg bg-secondary border border-border hover:border-accent/50"
              >
                <Minus className="h-4 w-4" />
              </button>
              <Input
                type="number"
                min="1"
                value={config.timeLimit}
                onChange={(e) => handleInputChange('timeLimit', Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center"
              />
              <button
                onClick={() => incrementCounter('timeLimit')}
                className="p-2 rounded-lg bg-secondary border border-border hover:border-accent/50"
              >
                <Plus className="h-4 w-4" />
              </button>
              <input
                type="range"
                min="1"
                max="180"
                value={config.timeLimit}
                onChange={(e) => handleInputChange('timeLimit', parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground whitespace-nowrap">{config.timeLimit} min</span>
            </div>
          </div>

          <Card className="p-4 bg-accent/10 border-accent/30">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">IA Generativa Lista</p>
                <p className="text-xs text-muted-foreground mt-1">Our AI will generate intelligent questions based on your configuration</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Tab 3: Review */}
      {activeTab === 3 && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="font-semibold mb-4">Review your test configuration</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-start pb-4 border-b border-border">
                <span className="text-muted-foreground">Title</span>
                <span className="font-medium text-right">{config.title || '—'}</span>
              </div>
              <div className="flex justify-between items-start pb-4 border-b border-border">
                <span className="text-muted-foreground">Subject</span>
                <span className="font-medium text-right">{config.subject || '—'}</span>
              </div>
              <div className="flex justify-between items-start pb-4 border-b border-border">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium text-right">{config.category || '—'}</span>
              </div>
              <div className="flex justify-between items-start pb-4 border-b border-border">
                <span className="text-muted-foreground">Difficulty</span>
                <span className="font-medium text-right">{config.difficulty || '—'}</span>
              </div>
              <div className="flex justify-between items-start pb-4 border-b border-border">
                <span className="text-muted-foreground">Question Types</span>
                <div className="text-right">
                  {config.questionTypes.length > 0 ? (
                    <div className="space-y-1">
                      {config.questionTypes.map(type => (
                        <div key={type} className="text-sm font-medium">{type}</div>
                      ))}
                    </div>
                  ) : (
                    <span className="font-medium">—</span>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-start pb-4 border-b border-border">
                <span className="text-muted-foreground">Questions</span>
                <span className="font-medium">{config.questionCount}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-muted-foreground">Time Limit</span>
                <span className="font-medium">{config.timeLimit} minutes</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-accent/10 border-accent/30">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Nuestra IA generará preguntas inteligentes</p>
                <p className="text-xs text-muted-foreground mt-1">Based on your configuration, our AI will create high-quality questions that match the difficulty level and question types you've selected.</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3 pt-6 border-t border-border">
        {activeTab > 1 && (
          <Button
            variant="outline"
            onClick={() => setActiveTab(activeTab - 1)}
            className="border-border"
          >
            Back
          </Button>
        )}
        <div className="flex-1"></div>
        {activeTab < 3 && (
          <Button
            onClick={() => setActiveTab(activeTab + 1)}
            className="bg-accent text-accent-foreground hover:opacity-90"
          >
            Next
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        )}
        {activeTab === 3 && (
          <Button
            onClick={handleCreate}
            disabled={loading}
            className="bg-accent text-accent-foreground hover:opacity-90 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                Create Test
                <Sparkles className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
