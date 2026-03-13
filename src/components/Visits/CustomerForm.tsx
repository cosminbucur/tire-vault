"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { User, Building, Phone, Mail, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const customerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters").optional().or(z.literal("")),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format (e.g. 0722 333 444)"),
  email: z.string().email("Invalid email address"),
})

export type CustomerFormValues = z.infer<typeof customerSchema>

export function CustomerForm({ 
  embedded = false, 
  onValuesChange,
  initialValues
}: { 
  embedded?: boolean,
  onValuesChange?: (values: CustomerFormValues) => void,
  initialValues?: Partial<CustomerFormValues>
}) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      firstName: initialValues?.firstName || "",
      lastName: initialValues?.lastName || "",
      company: initialValues?.company || "",
      phone: initialValues?.phone || "",
      email: initialValues?.email || "",
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

  async function onSubmit(data: CustomerFormValues) {
    setIsSubmitting(true)
    console.log("Registering customer:", data)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSuccess(true)
    form.reset()
    
    // Reset success message after 5 seconds
    setTimeout(() => setSuccess(false), 5000)
  }

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Building className="h-3.5 w-3.5 text-muted-foreground" />
                Company (Optional)
              </FormLabel>
              <FormControl>
                <Input placeholder="Acme Corp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                Phone Number
              </FormLabel>
              <FormControl>
                <Input type="tel" placeholder="0722 333 444" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                Email Address
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {success && (
          <div className="flex items-center gap-3 w-full p-3 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 text-sm font-medium animate-in zoom-in-95 duration-300">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span>Customer registered successfully!</span>
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
                  <span>Registering...</span>
                </div>
              ) : (
                "Register Customer"
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
          <CardTitle className="text-2xl font-bold tracking-tight">Register New Customer</CardTitle>
          <div className="p-2 bg-primary/10 rounded-full">
            <User className="h-5 w-5 text-primary" />
          </div>
        </div>
        <CardDescription className="text-muted-foreground">
          Enter customer information to create a new profile in the system.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {formContent}
      </CardContent>
      
      <CardFooter className="bg-muted/20 border-t border-border/10 py-4">
        <p className="text-[11px] text-center w-full text-muted-foreground italic">
          All data is encrypted and stored securely.
        </p>
      </CardFooter>
    </Card>
  )
}
