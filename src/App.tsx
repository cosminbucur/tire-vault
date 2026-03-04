import { useState } from 'react'
import './App.css'
import Dashboard from '@/components/Dashboard'

function App() {
  const [showDashboard, setShowDashboard] = useState(true)

  if (showDashboard) {
    return (
      <div className="min-h-screen bg-background">
        <Dashboard />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground gap-8">
      {/* Original landing page content omitted for brevity or kept as fallback */}
      <h1 className="text-4xl font-extrabold uppercase tracking-tight">Vite + React</h1>
      <button onClick={() => setShowDashboard(true)}>Go to Dashboard</button>
    </div>
  )
}

export default App
