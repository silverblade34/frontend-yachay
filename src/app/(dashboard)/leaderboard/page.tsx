'use client'

import { useState } from 'react'
import { Card } from '@/src/components/ui/card'
import { Trophy, Flame, TrendingUp } from 'lucide-react'

const LEADERBOARD_DATA = [
  { rank: 1, name: 'Alex Chen', xp: 28500, change: '↑', avatar: '😎' },
  { rank: 2, name: 'Emma Wilson', xp: 27200, change: '↓', avatar: '🥳' },
  { rank: 3, name: 'Marcus Johnson', xp: 26800, change: '↑↑', avatar: '🚀' },
  { rank: 4, name: 'Lisa Anderson', xp: 25600, change: '→', avatar: '💪' },
  { rank: 5, name: 'James Taylor', xp: 24900, change: '↓', avatar: '⚡' },
  { rank: 6, name: 'Sophia Brown', xp: 24100, change: '↑', avatar: '✨' },
  { rank: 7, name: 'David Lee', xp: 23500, change: '↑', avatar: '🎯' },
  { rank: 8, name: 'Nina Patel', xp: 22800, change: '→', avatar: '🔥' },
  { rank: 9, name: 'Carlos Martinez', xp: 22100, change: '↓', avatar: '🏆' },
  { rank: 10, name: 'You (Sarah J)', xp: 12450, change: 'new', avatar: '😎' },
]

const LEAGUES = [
  { name: 'Bronze', color: 'from-amber-700 to-amber-600', users: '1000+' },
  { name: 'Silver', color: 'from-slate-400 to-slate-300', users: '500+' },
  { name: 'Gold', color: 'from-yellow-500 to-yellow-400', users: '200+' },
  { name: 'Platinum', color: 'from-cyan-400 to-blue-400', users: '50+' },
  { name: 'Diamond', color: 'from-purple-500 to-pink-500', users: '10+' },
]

export default function LeaderboardPage() {
  const [selectedLeague, setSelectedLeague] = useState('Gold')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Trophy className="h-8 w-8 text-accent" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground">Compete with learners worldwide</p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* League Selector */}
        <div className="mb-12">
          <h2 className="font-semibold mb-4">Select Your League</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {LEAGUES.map(league => (
              <button
                key={league.name}
                onClick={() => setSelectedLeague(league.name)}
                className={`relative overflow-hidden rounded-lg p-4 text-accent-foreground font-semibold transition-all ${
                  selectedLeague === league.name ? 'ring-2 ring-white scale-105' : 'opacity-75 hover:opacity-100'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${league.color}`}></div>
                <div className="relative z-10">
                  <p>{league.name}</p>
                  <p className="text-xs opacity-90">{league.users} members</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* League Info */}
        <Card className="p-6 bg-accent/10 border-accent/30 mb-12">
          <div className="flex items-center gap-3">
            <Flame className="h-6 w-6 text-accent flex-shrink-0" />
            <div>
              <p className="font-semibold">League resets every Sunday</p>
              <p className="text-sm text-muted-foreground">Climb the ranks and earn exclusive rewards. Top performers advance to higher leagues.</p>
            </div>
          </div>
        </Card>

        {/* Leaderboard */}
        <Card className="border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-secondary/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Player</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">XP</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {LEADERBOARD_DATA.map((player, i) => (
                  <tr
                    key={i}
                    className={`hover:bg-secondary/50 transition ${
                      player.name.includes('You') ? 'bg-accent/10' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {player.rank <= 3 && (
                          <span className="text-lg">
                            {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉'}
                          </span>
                        )}
                        <span className="font-semibold text-muted-foreground">#{player.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{player.avatar}</div>
                        <span className="font-medium">{player.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-lg">{player.xp.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {player.change === '↑' && (
                        <span className="text-green-500 font-semibold">↑</span>
                      )}
                      {player.change === '↓' && (
                        <span className="text-destructive font-semibold">↓</span>
                      )}
                      {player.change === '↑↑' && (
                        <span className="text-green-500 font-semibold">↑↑</span>
                      )}
                      {player.change === '→' && (
                        <span className="text-muted-foreground">→</span>
                      )}
                      {player.change === 'new' && (
                        <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent font-semibold">
                          NEW
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Promotion/Demotion Info */}
        <div className="grid sm:grid-cols-2 gap-4 mt-12">
          <Card className="p-6 bg-green-500/10 border-green-500/30">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-green-500">Promotion</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Top 20 players in your league will be promoted to the next tier at the end of the week.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-destructive/10 border-destructive/30">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-6 w-6 text-destructive flex-shrink-0 mt-1 rotate-180" />
              <div>
                <h3 className="font-semibold text-destructive">Demotion</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Bottom 20 players in your league will be demoted to the previous tier at the end of the week.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
