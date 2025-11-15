'use client'

import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { Sparkles, Zap, Trophy, BookOpen, Plus, Flame } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-accent-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">LearnFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">Profile</div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, Learner!</h1>
              <p className="text-muted-foreground">Your daily quest awaits</p>
            </div>
            <div className="flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-lg">
              <Flame className="h-5 w-5 text-accent" />
              <span className="font-semibold">7 day streak!</span>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Zap, label: 'XP Today', value: '240' },
            { icon: BookOpen, label: 'Tests Taken', value: '24' },
            { icon: Trophy, label: 'Rank', value: 'Gold' },
            { icon: Flame, label: 'Streak', value: '7 days' },
          ].map((stat, i) => (
            <Card key={i} className="p-6 bg-card border-border">
              <stat.icon className="h-6 w-6 text-accent mb-2" />
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Main CTA */}
        <Link href="/create-test" className="block mb-12">
          <Card className="p-8 bg-gradient-to-br from-accent/20 to-transparent border-accent/30 hover:border-accent/50 transition cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-accent flex items-center justify-center">
                <Plus className="h-6 w-6 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">Create a Test</h3>
                <p className="text-sm text-muted-foreground">Use AI to generate smart questions on any topic</p>
              </div>
              <Sparkles className="h-5 w-5 text-accent hidden sm:block" />
            </div>
          </Card>
        </Link>

        {/* Recent section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Tests</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="p-6 bg-card border-border hover:border-accent/50 transition cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-2xl">📚</div>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">Intermedio</span>
                </div>
                <h3 className="font-semibold mb-2">World History Quiz</h3>
                <p className="text-sm text-muted-foreground mb-4">10 questions • 15 min</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-accent">15 attempts</span>
                  <span className="text-sm">⭐ 4.8</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
