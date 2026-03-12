"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Wrench, Car, UserCog, ClipboardList, StickyNote, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const serviceSchema = z.object({
  licensePlate: z.string().min(1, "License plate is required").max(10, "License plate too long"),
  mechanic: z.string().min(1, "Please select a mechanic"),
  servicesPerformed: z.string().min(5, "Please describe the services performed"),
  notes: z.string().optional(),
})

export type ServiceFormValues = z.infer<typeof serviceSchema>

const mechanics = [
  { id: "7b823e64-1234-4321-abcd-1234567890ab", name: "Alex Vasile" },
  { id: "8c934f75-5678-8765-bcde-0987654321ba", name: "Vali Marin" },
]

export function ServiceForm({ 
  embedded = false,
  onValuesChange,
  initialValues
}: { 
  embedded?: boolean,
  onValuesChange?: (values: ServiceFormValues) => void,
  initialValues?: Partial<ServiceFormValues>
}) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      licensePlate: initialValues?.licensePlate || "",
      mechanic: initialValues?.mechanic || "",
      servicesPerformed: initialValues?.servicesPerformed || "",
      notes: initialValues?.notes || "",
    },
  })

  // Sync changes to parent
  React.useEffect(() => {
    // Initial sync
    if (onValuesChange) {
      onValuesChange(form.getValues())
    }

    const { unsubscribe } = form.watch((value) => {
      if (onValuesChange) {
        onValuesChange(value as any)
      }
    })
    return () => unsubscribe()
  }, [form, onValuesChange])

  async function onSubmit(data: ServiceFormValues) {
    setIsSubmitting(true)
    console.log("Saving service info:", data)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSuccess(true)
    // We don't necessarily want to reset if it's part of a stepper, 
    // but the user might want a success state
    
    // Reset success message after 5 seconds
    setTimeout(() => setSuccess(false), 5000)
  }

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="licensePlate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Car className="h-3.5 w-3.5 text-muted-foreground" />
                License Plate
              </FormLabel>
              <FormControl>
                <Input placeholder="B 123 ABC" className="uppercase" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mechanic"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <UserCog className="h-3.5 w-3.5 text-muted-foreground" />
                Assigned Mechanic
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a mechanic" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mechanics.map((mechanic) => (
                    <SelectItem key={mechanic.id} value={mechanic.id}>
                      {mechanic.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="servicesPerformed"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <ClipboardList className="h-3.5 w-3.5 text-muted-foreground" />
                Services Performed
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Oil change, brake check, etc." 
                  className="min-h-[100px] resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <StickyNote className="h-3.5 w-3.5 text-muted-foreground" />
                Notes (Optional)
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Additional details or customer requests..." 
                  className="min-h-[80px] resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {success && (
          <div className="flex items-center gap-3 w-full p-3 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 text-sm font-medium animate-in zoom-in-95 duration-300">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span>Service info saved successfully!</span>
          </div>
        )}

        {!embedded && (
          <div className="flex w-full gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => form.reset()}
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 shadow-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-primary-foreground/20 border-t-primary-foreground animate-spin rounded-full" />
                  <span>Saving...</span>
                </div>
              ) : (
                "Save Service Info"
              )}
            </Button>
          </div>
        )}
      </form>
    </Form>
  )

  if (embedded) {
    return (
      <div className="w-full max-w-lg mx-auto animate-in fade-in zoom-in-95 duration-500">
        {formContent}
      </div>
    )
  }

  return (
    <Card className="max-w-xl mx-auto border-border/50 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="h-2 w-full bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
      <CardHeader className="space-y-1 pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold tracking-tight">Service Details</CardTitle>
          <div className="p-2 bg-primary/10 rounded-full">
            <Wrench className="h-5 w-5 text-primary" />
          </div>
        </div>
        <CardDescription className="text-muted-foreground">
          Enter details about the vehicle and the services being performed.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {formContent}
      </CardContent>
      
      <CardFooter className="bg-muted/20 border-t border-border/10 py-4">
        <p className="text-[11px] text-center w-full text-muted-foreground italic">
          All service records are stored and linked to the customer's history.
        </p>
      </CardFooter>
    </Card>
  )
}
