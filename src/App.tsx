import { useState } from 'react'
import './App.css'
import Dashboard from '@/components/Dashboard'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'

function App() {
  const [showDashboard, setShowDashboard] = useState(true)

  if (showDashboard) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1">
          <Dashboard />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground gap-8">
      {/* Original landing page content omitted for brevity or kept as fallback */}
      <h1 className="text-4xl font-extrabold uppercase tracking-tight">Vite + React</h1>
      <Button onClick={() => setShowDashboard(true)} size="lg">Go to Dashboard</Button>
    </div>
  )
}

export default App
