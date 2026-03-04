"use client"

import * as React from "react"
import { User, Wrench, Disc, ClipboardCheck, ChevronRight, ChevronLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CustomerForm } from "./CustomerForm"
import { ServiceForm } from "./ServiceForm"

const steps = [
  {
    id: "customer",
    title: "Customer Info",
    description: "Personal and contact details",
    icon: User,
  },
  {
    id: "service",
    title: "Service Info",
    description: "Reason for visit and requested services",
    icon: Wrench,
  },
  {
    id: "tires",
    title: "Tires Info",
    description: "Tire condition and storage details",
    icon: Disc,
  },
  {
    id: "summary",
    title: "Summary",
    description: "Review and confirm visit registration",
    icon: ClipboardCheck,
  },
]

export function VisitStepper() {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([])

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep])
      }
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (index: number) => {
    // Only allow going to previous steps or next step if current is completed
    if (index < currentStep || completedSteps.includes(index - 1)) {
      setCurrentStep(index)
    }
  }

  return (
    <Card className="max-w-4xl mx-auto border-border/50 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="h-2 w-full bg-muted overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-in-out" 
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
      
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight">Register New Visit</CardTitle>
            <CardDescription>
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </CardDescription>
          </div>
          <div className="flex gap-1.5 p-1 bg-muted/30 rounded-lg border border-border/10">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              const isCompleted = completedSteps.includes(index)
              
              return (
                <button
                  key={step.id}
                  onClick={() => goToStep(index)}
                  disabled={!isCompleted && index > currentStep}
                  className={cn(
                    "relative flex items-center justify-center h-10 w-10 rounded-md transition-all duration-300",
                    isActive ? "bg-primary text-primary-foreground shadow-md scale-110 z-10" : 
                    isCompleted ? "bg-primary/20 text-primary hover:bg-primary/30" : 
                    "bg-transparent text-muted-foreground hover:bg-muted"
                  )}
                  title={step.title}
                >
                  {isCompleted && !isActive ? (
                    <Check className="h-5 w-5 stroke-[3px]" />
                  ) : (
                    <Icon className={cn("h-5 w-5", isActive && "animate-pulse")} />
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </CardHeader>

      <CardContent className="min-h-[450px] flex flex-col items-center py-8 px-6">
        {currentStep === 0 ? (
          <CustomerForm embedded={true} />
        ) : currentStep === 1 ? (
          <ServiceForm embedded={true} />
        ) : (
          <div className="w-full max-w-lg space-y-6 animate-in fade-in zoom-in-95 duration-500 my-auto">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-primary/5 rounded-2xl ring-1 ring-primary/20 animate-bounce-subtle">
                {React.createElement(steps[currentStep].icon, { className: "h-12 w-12 text-primary" })}
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold tracking-tight">{steps[currentStep].title}</h2>
                <p className="text-muted-foreground max-w-sm">
                  Placeholder for {steps[currentStep].description}. Details for this step will be implemented soon.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 opacity-50 select-none">
              <div className="h-10 w-full bg-muted rounded-md border border-dashed border-border/50 flex items-center px-4">
                <div className="h-2 w-1/3 bg-muted-foreground/20 rounded-full" />
              </div>
              <div className="h-10 w-full bg-muted rounded-md border border-dashed border-border/50 flex items-center px-4">
                <div className="h-2 w-1/2 bg-muted-foreground/20 rounded-full" />
              </div>
              <div className="h-24 w-full bg-muted rounded-md border border-dashed border-border/50 flex flex-col gap-2 p-4">
                <div className="h-2 w-3/4 bg-muted-foreground/20 rounded-full" />
                <div className="h-2 w-2/3 bg-muted-foreground/20 rounded-full" />
                <div className="h-2 w-1/2 bg-muted-foreground/20 rounded-full" />
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center bg-muted/20 border-t border-border/10 p-6">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex gap-2">
          {currentStep === steps.length - 1 ? (
            <Button 
              className="px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              onClick={() => alert("Registration completed!")}
            >
              Finish Registration
            </Button>
          ) : (
            <Button 
              onClick={nextStep}
              className="flex items-center gap-2 px-6"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
