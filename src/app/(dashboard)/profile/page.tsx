'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs'
import { Trophy, Zap, BookOpen, Plus, Settings, Flame, Award, TrendingUp, Clock, Target } from 'lucide-react'

const ACHIEVEMENTS = [
  { id: 1, name: 'First Test', description: 'Complete your first test', icon: '🎯', unlocked: true },
  { id: 2, name: 'Streak Master', description: '7 day streak', icon: '🔥', unlocked: true },
  { id: 3, name: 'Perfect Score', description: 'Get 100% on a test', icon: '⭐', unlocked: false },
  { id: 4, name: 'Quiz Creator', description: 'Create 5 tests', icon: '✨', unlocked: false },
  { id: 5, name: 'Speed Demon', description: 'Complete 10 tests in a day', icon: '⚡', unlocked: false },
  { id: 6, name: 'Knowledge Master', description: 'Score 100+ points', icon: '🏆', unlocked: true },
]

const ACTIVITY = [
  { date: 'Today', action: 'Completed World History Quiz', points: 240 },
  { date: 'Yesterday', action: 'Created Biology Fundamentals test', points: 0 },
  { date: '2 days ago', action: 'Completed US Government', points: 180 },
  { date: '3 days ago', action: 'Completed Spanish Vocabulary', points: 220 },
  { date: '4 days ago', action: 'Completed Advanced Mathematics', points: 150 },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center text-2xl">
                😎
              </div>
              <div>
                <h1 className="text-2xl font-bold">Sarah Johnson</h1>
                <p className="text-muted-foreground">@sarahjohnson</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-border"
            >
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {[
            { icon: Zap, label: 'Total XP', value: '12,450' },
            { icon: BookOpen, label: 'Tests Taken', value: '47' },
            { icon: Plus, label: 'Tests Created', value: '12' },
            { icon: Flame, label: 'Streak', value: '7 days' },
            { icon: Trophy, label: 'Rank', value: 'Gold' },
          ].map((stat, i) => (
            <Card key={i} className="p-4 bg-card border-border">
              <stat.icon className="h-6 w-6 text-accent mb-2" />
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Card className="border-border bg-card">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="border-b border-border w-full justify-start h-auto bg-transparent p-0 rounded-none">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'achievements', label: 'Achievements' },
                { id: 'activity', label: 'Activity' },
              ].map(tab => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Performance Overview</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Average Score', value: '78%', trend: '+5%' },
                    { label: 'Completion Rate', value: '94%', trend: '+2%' },
                    { label: 'Study Time This Week', value: '14.5 hrs', trend: '+3 hrs' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                      <span className="text-sm font-medium">{item.label}</span>
                      <div className="text-right">
                        <p className="font-semibold">{item.value}</p>
                        <p className="text-xs text-green-500">{item.trend}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Top Subjects</h3>
                <div className="space-y-3">
                  {[
                    { subject: 'History', score: 85, tests: 8 },
                    { subject: 'Languages', score: 92, tests: 12 },
                    { subject: 'Science', score: 76, tests: 5 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.subject}</p>
                        <p className="text-xs text-muted-foreground">{item.tests} tests taken</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-accent">{item.score}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="p-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ACHIEVEMENTS.map(achievement => (
                  <Card
                    key={achievement.id}
                    className={`p-4 text-center border-border ${
                      achievement.unlocked ? 'bg-card' : 'bg-secondary/50 opacity-60'
                    }`}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <h4 className="font-semibold text-sm mb-1">{achievement.name}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    {achievement.unlocked && (
                      <div className="mt-3 flex items-center justify-center gap-1 text-xs text-green-500">
                        <Award className="h-3 w-3" />
                        Unlocked
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="p-6">
              <div className="space-y-3">
                {ACTIVITY.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary border border-border hover:border-accent/50 transition"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.action}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                    {item.points > 0 && (
                      <span className="font-semibold text-accent">+{item.points} XP</span>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  )
}
