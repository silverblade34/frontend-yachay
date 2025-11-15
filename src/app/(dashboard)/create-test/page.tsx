'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/src/components/ui/card'
import { CreateTestTabs } from '@/src/components/create-test-tabs'
import { Sparkles, ChevronLeft } from 'lucide-react'

export default function CreateTestPage() {
  const router = useRouter()
  const [testCreated, setTestCreated] = useState(false)

  const handleCreateTest = async (config: any) => {
    // Simulate API call to create test
    console.log('Creating test with config:', config)
    setTestCreated(true)
    
    // In a real app, you'd save this and redirect
    setTimeout(() => {
      router.push(`/quiz/generated-${Date.now()}`)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 hover:text-accent transition">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm">Back</span>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-accent-foreground" />
              </div>
              Create a New Test
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {!testCreated ? (
          <Card className="p-8 bg-card border-border">
            <CreateTestTabs onCreateTest={handleCreateTest} />
          </Card>
        ) : (
          <div className="text-center space-y-6">
            <div className="text-6xl animate-bounce">✨</div>
            <h2 className="text-2xl font-bold">Generating your test...</h2>
            <p className="text-muted-foreground">Our AI is creating intelligent questions based on your configuration</p>
            <div className="mt-8 w-full h-1 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-accent animate-pulse"></div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
