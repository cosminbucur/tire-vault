"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { 
  Disc, 
  Ruler, 
  ArrowUpDown, 
  Tags, 
  Circle, 
  Zap, 
  Gauge, 
  Sun, 
  Warehouse, 
  Hash,
  Check,
  ChevronsUpDown,
  Car,
  CheckCircle2,
  Info
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const tireFormSchema = z.object({
  width: z.string().min(1, "Width is required"),
  height: z.string().min(1, "Height is required"),
  diameterType: z.string().min(1, "Diameter is required"),
  brand: z.string().min(1, "Brand is required"),
  rimType: z.enum(["plate", "alloy"]),
  tireType: z.enum(["regular", "runflat"]),
  wearIndicator: z.enum(["Good", "OK", "Warning", "Danger"]),
  season: z.enum(["summer", "winter", "all-season"]),
  storagePoint: z.string().min(1, "Storage point is required"),
  capsNumber: z.preprocess((val) => Number(val), z.number().min(0)),
  location: z.enum(["car", "storage"]),
})

type TireFormValues = z.infer<typeof tireFormSchema>

const brands = [
  "Michelin",
  "Continental",
  "Bridgestone",
  "Pirelli",
  "Goodyear",
  "Hankook",
  "Dunlop",
  "Yokohama",
  "Nexen",
  "Kumho",
  "Toyo",
  "Nokian",
]

interface TireFormProps {
  embedded?: boolean
  showStorageFields?: boolean
  showLocation?: boolean
  showSubmitButton?: boolean
  initialData?: Partial<TireFormValues>
  onSave?: (data: TireFormValues) => void
}

export function TireForm({ 
  embedded = false, 
  showStorageFields = true, 
  showLocation = true,
  showSubmitButton = true,
  initialData,
  onSave
}: TireFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [openBrand, setOpenBrand] = React.useState(false)

  const form = useForm<TireFormValues>({
    resolver: zodResolver(tireFormSchema) as any,
    defaultValues: {
      width: initialData?.width || "215",
      height: initialData?.height || "65",
      diameterType: initialData?.diameterType || "R15",
      brand: initialData?.brand || "Michelin",
      rimType: initialData?.rimType || "alloy",
      tireType: initialData?.tireType || "regular",
      wearIndicator: initialData?.wearIndicator || "Good",
      season: initialData?.season || "summer",
      storagePoint: initialData?.storagePoint || "R1E1E2",
      capsNumber: initialData?.capsNumber || 16,
      location: initialData?.location || "storage",
    },
  })

  async function onSubmit(data: TireFormValues) {
    setIsSubmitting(true)
    console.log("Saving tire info:", data)
    
    if (onSave) {
      onSave(data)
    }
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    setIsSubmitting(false)
    setSuccess(true)
    
    // Reset success message after 2 seconds
    setTimeout(() => setSuccess(false), 2000)
  }

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Location Toggle */}
        {showLocation && (
          <div className="bg-muted/50 p-4 rounded-xl border border-border/10">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm font-semibold flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    Current Tire Set Location
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="car" id="loc-car" className="sr-only" />
                        </FormControl>
                        <label
                          htmlFor="loc-car"
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all border-2",
                            field.value === "car" 
                              ? "bg-primary text-primary-foreground border-primary shadow-md" 
                              : "bg-background border-border hover:bg-muted"
                          )}
                        >
                          <Car className="h-4 w-4" />
                          On Car
                        </label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="storage" id="loc-storage" className="sr-only" />
                        </FormControl>
                        <label
                          htmlFor="loc-storage"
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all border-2",
                            field.value === "storage" 
                              ? "bg-primary text-primary-foreground border-primary shadow-md" 
                              : "bg-background border-border hover:bg-muted"
                          )}
                        >
                          <Warehouse className="h-4 w-4" />
                          In Storage
                        </label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Select where this tire set is currently located.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Specs */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70 px-1">Main Specifications</h3>
            
            <div className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-xs">
                      <Ruler className="h-3 w-3" />
                      Width
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="215" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-xs">
                      <ArrowUpDown className="h-3 w-3" />
                      Height
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="65" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diameterType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-xs">
                      <Disc className="h-3 w-3" />
                      Diam.
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="R15" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center gap-2">
                    <Tags className="h-3.5 w-3.5 text-muted-foreground" />
                    Brand
                  </FormLabel>
                  <Popover open={openBrand} onOpenChange={setOpenBrand}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openBrand}
                          className={cn(
                            "w-full justify-between font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? brands.find((brand) => brand === field.value)
                            : "Select brand..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search brand..." />
                        <CommandList>
                          <CommandEmpty>No brand found.</CommandEmpty>
                          <CommandGroup>
                            {brands.map((brand) => (
                              <CommandItem
                                key={brand}
                                value={brand}
                                onSelect={() => {
                                  form.setValue("brand", brand)
                                  setOpenBrand(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    brand === field.value ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {brand}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showStorageFields && (
              <div className="grid grid-cols-1 gap-4 pt-2">
                <FormField
                  control={form.control}
                  name="storagePoint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Warehouse className="h-3.5 w-3.5 text-muted-foreground" />
                        Storage Point
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="R1E1E2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="capsNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                        Number of Caps
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          {/* Types and Options */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70 px-1">Tire Details</h3>

            <FormField
              control={form.control}
              name="season"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="flex items-center gap-2">
                    <Sun className="h-3.5 w-3.5 text-muted-foreground" />
                    Season
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-3 gap-2"
                    >
                      {["summer", "winter", "all-season"].map((val) => (
                        <FormItem key={val} className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={val} id={`season-${val}`} className="sr-only" />
                          </FormControl>
                          <label
                            htmlFor={`season-${val}`}
                            className={cn(
                              "flex flex-1 items-center justify-center py-2 rounded-md cursor-pointer text-xs font-medium border transition-all truncate px-1",
                              field.value === val 
                                ? "bg-primary/10 text-primary border-primary" 
                                : "bg-background border-border hover:bg-muted"
                            )}
                          >
                            {val.charAt(0).toUpperCase() + val.slice(1)}
                          </label>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rimType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="flex items-center gap-2">
                      <Circle className="h-3.5 w-3.5 text-muted-foreground" />
                      Rim Type
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col gap-2"
                      >
                        {["plate", "alloy"].map((val) => (
                          <FormItem key={val} className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={val} id={`rim-${val}`} />
                            </FormControl>
                            <label htmlFor={`rim-${val}`} className="text-xs capitalize cursor-pointer">
                              {val}
                            </label>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tireType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="flex items-center gap-2">
                      <Zap className="h-3.5 w-3.5 text-muted-foreground" />
                      Tire Type
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col gap-2"
                      >
                        {["regular", "runflat"].map((val) => (
                          <FormItem key={val} className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={val} id={`tire-${val}`} />
                            </FormControl>
                            <label htmlFor={`tire-${val}`} className="text-xs capitalize cursor-pointer">
                              {val}
                            </label>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="wearIndicator"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="flex items-center gap-2">
                    <Gauge className="h-3.5 w-3.5 text-muted-foreground" />
                    Wear Indicator
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-wrap gap-2"
                    >
                      {["Good", "OK", "Warning", "Danger"].map((val) => (
                        <FormItem key={val} className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={val} id={`wear-${val}`} className="sr-only" />
                          </FormControl>
                          <label
                            htmlFor={`wear-${val}`}
                            className={cn(
                              "flex items-center justify-center px-4 py-2 rounded-full cursor-pointer text-xs font-semibold border transition-all",
                              field.value === val 
                                ? val === "Good" ? "bg-green-500 text-white border-green-600 shadow-sm" :
                                  val === "OK" ? "bg-blue-500 text-white border-blue-600 shadow-sm" :
                                  val === "Warning" ? "bg-yellow-500 text-white border-yellow-600 shadow-sm" :
                                  "bg-red-500 text-white border-red-600 shadow-sm"
                                : "bg-background border-border hover:bg-muted"
                            )}
                          >
                            {val}
                          </label>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {success && (
          <div className="flex items-center gap-3 w-full p-3 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 text-sm font-medium animate-in zoom-in-95 duration-300">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span>Tire info saved successfully!</span>
          </div>
        )}

        {showSubmitButton && (
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
                "Save Tire Info"
              )}
            </Button>
          </div>
        )}
      </form>
    </Form>
  )

  if (embedded) {
    return (
      <div className="w-full max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
        {formContent}
      </div>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto border-border/50 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="h-2 w-full bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
      <CardHeader className="space-y-1 pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold tracking-tight">Tire Set Registration</CardTitle>
          <div className="p-2 bg-primary/10 rounded-full">
            <Disc className="h-5 w-5 text-primary" />
          </div>
        </div>
        <CardDescription className="text-muted-foreground">
          Register tire specifications, wear condition, and storage location.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {formContent}
      </CardContent>
      
      <CardFooter className="bg-muted/20 border-t border-border/10 py-4">
        <p className="text-[11px] text-center w-full text-muted-foreground italic flex items-center justify-center gap-2">
          <Info className="h-3 w-3" />
          Storage points follow the Section-Row-Shelf-Floor convention (e.g., R1E1E2).
        </p>
      </CardFooter>
    </Card>
  )
}
