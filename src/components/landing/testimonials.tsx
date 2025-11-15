'use client'

import { Card } from '@/src/components/ui/card'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Developer',
    content: 'LearnFlow made learning fun again. The gamification kept me motivated to finish a full course.',
    avatar: '👩‍💻',
  },
  {
    name: 'Marcus Johnson',
    role: 'Student',
    content: 'The leaderboard competition pushed me to study consistently. My scores improved by 40%!',
    avatar: '👨‍🎓',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Teacher',
    content: 'I use LearnFlow with my students. The engagement and completion rates have skyrocketed.',
    avatar: '👩‍🏫',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Thousands
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">See what learners are saying about their experience</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="bg-card/50 border border-border/50 backdrop-blur-sm p-6">
              <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
