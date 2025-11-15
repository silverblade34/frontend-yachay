'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Button } from '@/src/components/ui/button'
import { Search, Filter, Star, Play } from 'lucide-react'

const MOCK_TESTS = [
  {
    id: 1,
    title: 'World History Quiz',
    creator: 'Prof. Anderson',
    difficulty: 'Intermedio',
    category: 'History',
    rating: 4.8,
    attempts: 2540,
    icon: '🏛️',
  },
  {
    id: 2,
    title: 'Biology Fundamentals',
    creator: 'Dr. Smith',
    difficulty: 'Básico',
    category: 'Science',
    rating: 4.6,
    attempts: 3120,
    icon: '🔬',
  },
  {
    id: 3,
    title: 'Spanish Vocabulary',
    creator: 'María González',
    difficulty: 'Intermedio',
    category: 'Languages',
    rating: 4.9,
    attempts: 1890,
    icon: '🗣️',
  },
  {
    id: 4,
    title: 'Advanced Mathematics',
    creator: 'Prof. Johnson',
    difficulty: 'Avanzado',
    category: 'Math',
    rating: 4.5,
    attempts: 956,
    icon: '🔢',
  },
  {
    id: 5,
    title: 'US Government',
    creator: 'Dr. Williams',
    difficulty: 'Intermedio',
    category: 'Social Studies',
    rating: 4.7,
    attempts: 2100,
    icon: '🏛️',
  },
  {
    id: 6,
    title: 'Literature Analysis',
    creator: 'Prof. Brown',
    difficulty: 'Avanzado',
    category: 'Literature',
    rating: 4.4,
    attempts: 1340,
    icon: '📚',
  },
]

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)

  const categories = ['History', 'Science', 'Languages', 'Math', 'Social Studies', 'Literature']
  const difficulties = ['Básico', 'Intermedio', 'Avanzado', 'Experto']

  const filteredTests = MOCK_TESTS.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || test.category === selectedCategory
    const matchesDifficulty = !selectedDifficulty || test.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold mb-4">Explore Tests</h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search tests by title, creator..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Category:
            </div>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-secondary border border-border hover:border-accent/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Difficulty:
            </div>
            {difficulties.map(difficulty => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(selectedDifficulty === difficulty ? null : difficulty)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedDifficulty === difficulty
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-secondary border border-border hover:border-accent/50'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">{filteredTests.length} tests found</p>
        </div>

        {/* Tests Grid */}
        {filteredTests.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTests.map(test => (
              <Card
                key={test.id}
                className="overflow-hidden border-border hover:border-accent/50 transition group cursor-pointer"
              >
                <Link href={`/quiz/${test.id}`}>
                  <div className="p-6 space-y-4">
                    {/* Header with icon and difficulty */}
                    <div className="flex items-start justify-between">
                      <div className="text-4xl">{test.icon}</div>
                      <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent font-medium">
                        {test.difficulty}
                      </span>
                    </div>

                    {/* Title and Creator */}
                    <div>
                      <h3 className="font-semibold line-clamp-2 group-hover:text-accent transition">
                        {test.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">by {test.creator}</p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{test.rating}</span>
                      </div>
                      <span className="text-muted-foreground">{test.attempts.toLocaleString()} attempts</span>
                    </div>

                    {/* CTA Button */}
                    <Button
                      className="w-full bg-accent text-accent-foreground hover:opacity-90 group-hover:scale-105 transition"
                      size="sm"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Take Test
                    </Button>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 bg-card border-border text-center">
            <p className="text-lg font-semibold mb-2">No tests found</p>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </Card>
        )}
      </main>
    </div>
  )
}
