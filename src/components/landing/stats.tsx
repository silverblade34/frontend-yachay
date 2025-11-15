'use client'

import { Card } from '@/src/components/ui/card'

const stats = [
  { label: 'Learning Minutes', value: '2.5M+' },
  { label: 'Quizzes Created', value: '15K+' },
  { label: 'User Retention', value: '85%' },
  { label: 'Avg Score Improvement', value: '+34%' },
]

export default function Stats() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
