'use client'

import { Card } from '@/src/components/ui/card'

const features = [
  {
    title: 'XP & Leveling System',
    description: 'Earn experience points with every quiz completed and watch yourself level up as you progress.',
    icon: '⚡',
  },
  {
    title: 'Streak Tracking',
    description: 'Build consistent learning habits with streak counters that motivate daily engagement.',
    icon: '🔥',
  },
  {
    title: 'Leaderboards',
    description: 'Compete with peers globally and see where you rank among thousands of learners.',
    icon: '🏆',
  },
  {
    title: 'Achievements',
    description: 'Unlock badges and achievements to celebrate milestones and showcase your accomplishments.',
    icon: '🎖️',
  },
  {
    title: 'Progress Tracking',
    description: 'Detailed analytics show your improvement over time with visual performance charts.',
    icon: '📊',
  },
  {
    title: 'Custom Quizzes',
    description: 'Create and share your own quizzes with the community or keep them private.',
    icon: '✏️',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Powerful Features for{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Better Learning
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to learn faster, smarter, and more enjoyably.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card key={i} className="bg-card/50 border border-border/50 backdrop-blur-sm p-6 hover:border-primary/50 transition-colors">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
