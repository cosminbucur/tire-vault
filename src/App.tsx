import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground gap-8">
      <div className="flex gap-8">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="w-24 h-24 hover:drop-shadow-[0_0_2em_#646cffaa] transition-all" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="w-24 h-24 hover:drop-shadow-[0_0_2em_#61dafbaa] transition-all animate-spin-slow" alt="React logo" />
        </a>
      </div>
      
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Service App
          </CardTitle>
          <CardDescription>
            Bootstrap your next big project with Shadcn UI & Tailwind CSS
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex justify-center p-4 bg-muted/50 rounded-lg">
            <Button 
              size="lg" 
              className="font-semibold transition-transform active:scale-95"
              onClick={() => setCount((count) => count + 1)}
            >
              Counter: {count}
            </Button>
          </div>
          <p className="text-sm text-center text-muted-foreground italic">
            Edit <code className="font-mono bg-muted px-1 rounded">src/App.tsx</code> to start building.
          </p>
        </CardContent>
      </Card>

      <div className="flex gap-4 items-center text-sm text-muted-foreground overflow-hidden">
        <p>Vite</p>
        <div className="w-1 h-1 rounded-full bg-border" />
        <p>React</p>
        <div className="w-1 h-1 rounded-full bg-border" />
        <p>Tailwind</p>
        <div className="w-1 h-1 rounded-full bg-border" />
        <p>Shadcn UI</p>
      </div>
    </div>
  )
}

export default App
