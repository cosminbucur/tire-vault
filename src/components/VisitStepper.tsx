"use client"

import * as React from "react"
import { User, Wrench, Disc, ClipboardCheck, ChevronRight, ChevronLeft, Check, Warehouse, Hash, Plus, Info, Pencil, Copy, Trash2, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { CustomerForm, CustomerFormValues } from "./CustomerForm"
import { ServiceForm, ServiceFormValues } from "./ServiceForm"
import { TireForm } from "./TireForm"
import { VisitSummary, Tire } from "./VisitSummary"
import { Separator } from "@/components/ui/separator"

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
  
  // Step 1 state
  const [customerData, setCustomerData] = React.useState<CustomerFormValues | null>(null)
  
  // Step 2 state
  const [serviceData, setServiceData] = React.useState<ServiceFormValues | null>(null)

  // Step 3 (Tires) state
  const [storagePoint, setStoragePoint] = React.useState("R1E1E2")
  const [capsNumber, setCapsNumber] = React.useState("16")
  const [tires, setTires] = React.useState<Tire[]>([])
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingTireId, setEditingTireId] = React.useState<string | null>(null)

  const handleBatchSave = (data: any) => {
    const newTires: Tire[] = []
    
    // Create 4 tires on car
    for (let i = 0; i < 4; i++) {
      newTires.push({
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        location: "car"
      })
    }
    
    // Create 4 tires in storage
    for (let i = 0; i < 4; i++) {
      newTires.push({
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        location: "storage"
      })
    }
    
    setTires(newTires)
    setIsDialogOpen(false)
  }

  const handleDeleteTire = (id: string) => {
    setTires(tires.filter(t => t.id !== id))
  }

  const handleCloneTire = (tire: Tire) => {
    const clonedTire = {
      ...tire,
      id: Math.random().toString(36).substr(2, 9)
    }
    setTires([...tires, clonedTire])
  }

  const handleUpdateTire = (data: any) => {
    if (editingTireId) {
      setTires(tires.map(t => t.id === editingTireId ? { ...t, ...data } : t))
      setEditingTireId(null)
    }
  }

  const openEditDialog = (id: string) => {
    setEditingTireId(id)
  }

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
          <CustomerForm 
            embedded={true} 
            onValuesChange={setCustomerData} 
            initialValues={customerData || undefined}
          />
        ) : currentStep === 1 ? (
          <ServiceForm 
            embedded={true} 
            onValuesChange={setServiceData}
            initialValues={serviceData || undefined}
          />
        ) : currentStep === 2 ? (
          <div className="w-full space-y-8 animate-in fade-in zoom-in-95 duration-500">
            {/* Global Storage Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
              <div className="space-y-3">
                <Label htmlFor="storage-point" className="flex items-center gap-2 text-sm font-semibold">
                  <Warehouse className="h-4 w-4 text-primary" />
                  Storage Point
                </Label>
                <Input 
                  id="storage-point" 
                  placeholder="e.g. R1E1E2" 
                  value={storagePoint}
                  onChange={(e) => setStoragePoint(e.target.value)}
                  className="bg-background/50"
                />
                <p className="text-[11px] text-muted-foreground italic flex items-center gap-1">
                  <Info className="h-3 w-3" /> Section-Row-Shelf-Floor
                </p>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="caps-number" className="flex items-center gap-2 text-sm font-semibold">
                  <Hash className="h-4 w-4 text-primary" />
                  Number of Caps
                </Label>
                <Input 
                  id="caps-number" 
                  type="number"
                  value={capsNumber}
                  onChange={(e) => setCapsNumber(e.target.value)}
                  className="bg-background/50"
                />
              </div>
            </div>

            {tires.length === 0 ? (
              <div className="p-8 border-2 border-dashed border-border/50 rounded-2xl bg-muted/20 flex flex-col items-center justify-center text-center space-y-4 transition-all hover:bg-muted/30 hover:border-primary/30 group max-w-lg mx-auto">
                <div className="h-14 w-14 bg-primary/5 rounded-full flex items-center justify-center ring-1 ring-primary/10 group-hover:scale-110 transition-transform duration-300">
                  <Disc className="h-7 w-7 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg">Batch Tire Creation</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Set details once to create 4 tires on the car and 4 tires in storage.
                  </p>
                </div>
                
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="mt-2 shadow-lg shadow-primary/10">
                      <Plus className="h-4 w-4 mr-2" />
                      Open Tire Form
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Configure Tire Details</DialogTitle>
                      <DialogDescription>
                        These settings will be applied to all 8 tires.
                      </DialogDescription>
                    </DialogHeader>
                    <TireForm 
                      embedded={true} 
                      showStorageFields={false} 
                      showLocation={false}
                      showSubmitButton={true}
                      onSave={handleBatchSave}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {/* On Car Container */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-primary/10 rounded-md">
                        <Car className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="font-bold text-lg">On Car</h3>
                    </div>
                    <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10">
                      {tires.filter(t => t.location === "car").length} Tires
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {tires.filter(t => t.location === "car").map(tire => (
                      <TireItem 
                        key={tire.id} 
                        tire={tire} 
                        onDelete={handleDeleteTire}
                        onClone={handleCloneTire}
                        onEdit={openEditDialog}
                      />
                    ))}
                  </div>
                </div>

                {/* In Storage Container */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-amber-500/10 rounded-md">
                        <Warehouse className="h-4 w-4 text-amber-500" />
                      </div>
                      <h3 className="font-bold text-lg">In Storage</h3>
                    </div>
                    <Badge variant="secondary" className="bg-amber-500/5 text-amber-500 border-amber-500/10">
                      {tires.filter(t => t.location === "storage").length} Tires
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {tires.filter(t => t.location === "storage").map(tire => (
                      <TireItem 
                        key={tire.id} 
                        tire={tire} 
                        onDelete={handleDeleteTire}
                        onClone={handleCloneTire}
                        onEdit={openEditDialog}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Edit Tire Dialog */}
            <Dialog open={!!editingTireId} onOpenChange={(open) => !open && setEditingTireId(null)}>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Tire Details</DialogTitle>
                </DialogHeader>
                {editingTireId && (
                  <TireForm 
                    embedded={true} 
                    showStorageFields={false} 
                    showLocation={true}
                    showSubmitButton={true}
                    initialData={tires.find(t => t.id === editingTireId)}
                    onSave={handleUpdateTire}
                  />
                )}
              </DialogContent>
            </Dialog>

            {tires.length > 0 && (
              <div className="flex justify-center pt-4">
                <Button variant="outline" size="sm" onClick={() => setTires([])} className="text-muted-foreground">
                  Reset Tires and Start Over
                </Button>
              </div>
            )}
          </div>
        ) : (
          <VisitSummary 
            customerData={customerData}
            serviceData={serviceData}
            tires={tires}
            storagePoint={storagePoint}
            capsNumber={capsNumber}
            onEditStep={setCurrentStep}
          />
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
              onClick={() => {
                const finalData = {
                  customer: customerData,
                  service: serviceData,
                  tires: tires,
                  storage: {
                    point: storagePoint,
                    caps: capsNumber
                  }
                }
                console.log("Final Registration Data:", finalData)
                alert("Registration completed! Check console for data.")
              }}
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

function TireItem({ tire, onDelete, onClone, onEdit }: { 
  tire: Tire, 
  onDelete: (id: string) => void,
  onClone: (tire: Tire) => void,
  onEdit: (id: string) => void
}) {
  return (
    <div className="group relative bg-card border border-border/60 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-primary/20 transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm truncate">{tire.brand}</span>
            <Badge variant="outline" className={cn(
              "text-[10px] h-4 px-1 uppercase",
              tire.wearIndicator === "Good" ? "border-green-500/30 text-green-600 bg-green-500/5 text-green-500" :
              tire.wearIndicator === "OK" ? "border-blue-500/30 text-blue-600 bg-blue-500/5 text-blue-500" :
              tire.wearIndicator === "Warning" ? "border-yellow-500/30 text-yellow-600 bg-yellow-500/5 text-yellow-500" :
              "border-red-500/30 text-red-600 bg-red-500/5 text-red-500"
            )}>
              {tire.wearIndicator}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground font-medium">
            <span className="flex items-center gap-1">
              <Disc className="h-3 w-3" />
              {tire.width}/{tire.height} {tire.diameterType}
            </span>
            <span className="flex items-center gap-1">
              <Disc className="h-3 w-3 opacity-50" />
              {tire.season}
            </span>
            <span className="flex items-center gap-1 capitalize">
              <Disc className="h-3 w-3 opacity-30" />
              {tire.rimType}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
            onClick={() => onEdit(tire.id)}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-amber-600 hover:bg-amber-600/10"
            onClick={() => onClone(tire)}
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(tire.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
