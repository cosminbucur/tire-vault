"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { 
  ArrowRight, 
  Warehouse, 
  Hash,
  CheckCircle2,
  Info,
  Package,
  Search,
  ChevronLeft,
  ChevronRight,
  Car,
  Check,
  ChevronsUpDown
} from "lucide-react"

import { cn } from "@/lib/utils"

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Mock Data
const MOCK_STORAGE_DATA = [
  { id: 1, storagePoint: "R1E1E1", licensePlate: "B-10-XYZ", tiresCount: 4 },
  { id: 2, storagePoint: "R1E1E2", licensePlate: "B-11-XYZ", tiresCount: 4 },
  { id: 3, storagePoint: "R1E1E3", licensePlate: "B-12-XYZ", tiresCount: 4 },
  { id: 4, storagePoint: "R1E2E1", licensePlate: "B-13-XYZ", tiresCount: 4 },
  { id: 5, storagePoint: "R1E2E2", licensePlate: "B-14-XYZ", tiresCount: 4 },
  { id: 6, storagePoint: "R1E2E3", licensePlate: "B-15-XYZ", tiresCount: 4 },
  { id: 7, storagePoint: "R1E3E1", licensePlate: "B-16-XYZ", tiresCount: 4 },
  { id: 8, storagePoint: "R1E3E2", licensePlate: "B-17-XYZ", tiresCount: 4 },
  { id: 9, storagePoint: "R1E3E3", licensePlate: "B-18-XYZ", tiresCount: 4 },
  { id: 10, storagePoint: "R1E4E1", licensePlate: "B-19-XYZ", tiresCount: 4 },
  { id: 11, storagePoint: "R1E4E2", licensePlate: "B-20-XYZ", tiresCount: 4 },
  { id: 12, storagePoint: "R1E4E3", licensePlate: "B-21-XYZ", tiresCount: 4 },
]

const EMPTY_STORAGE_POINTS = [
  "R1E5E1",
  "R1E5E2",
]

const storageSchema = z.object({
  licensePlate: z.string().min(1, "License plate is required"),
  source: z.string().min(1, "Source storage point is required"),
  destination: z.string().min(1, "Destination storage point is required"),
  quantity: z.preprocess((val) => Number(val), z.number().min(1, "Quantity must be at least 1")),
})

type StorageFormValues = z.infer<typeof storageSchema>

export default function Storage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [openDest, setOpenDest] = React.useState(false)

  const [searchTerm, setSearchTerm] = React.useState("")
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 8

  const form = useForm<StorageFormValues>({
    resolver: zodResolver(storageSchema) as any,
    defaultValues: {
      licensePlate: "",
      source: "",
      destination: "",
      quantity: 4,
    },
  })

  async function onSubmit(data: StorageFormValues) {
    setIsSubmitting(true)
    console.log("Moving tires:", data)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    setIsSubmitting(false)
    setSuccess(true)
    
    // Reset success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000)
    form.reset()
  }

  const filteredData = React.useMemo(() => {
    if (!searchTerm) return MOCK_STORAGE_DATA
    return MOCK_STORAGE_DATA.filter((item) => 
      item.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.storagePoint.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, currentPage])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl animate-in fade-in zoom-in-95 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Side: Search & Table */}
        <div className="lg:col-span-3 space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Storage Points</h2>
            <p className="text-muted-foreground mt-1">
              Search storage locations by license plate or point ID.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search plate (e.g. B-10-XYZ) or location..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-9 bg-background shadow-sm h-11"
              />
            </div>
          </div>

          <div className="rounded-xl border shadow-sm overflow-hidden bg-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="h-11">License Plate</TableHead>
                  <TableHead className="h-11">Storage Point</TableHead>
                  <TableHead className="text-right h-11">Tires</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <TableRow 
                      key={item.id} 
                      className="cursor-pointer transition-colors hover:bg-muted/50 active:bg-muted/80"
                      onClick={() => {
                        form.setValue("licensePlate", item.licensePlate || "")
                        form.setValue("source", item.storagePoint)
                        form.setValue("quantity", item.tiresCount)
                        // Smooth scroll to top for mobile users to quickly see the form updated
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          <span className="bg-secondary/50 px-2 py-0.5 rounded text-sm border font-mono tracking-tight">
                            {item.licensePlate}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Warehouse className="h-4 w-4 text-blue-500" />
                          {item.storagePoint}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="inline-flex items-center justify-center bg-primary/10 text-primary px-2.5 py-1 rounded-md text-xs font-semibold">
                          {item.tiresCount}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-48 text-center text-muted-foreground">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Search className="h-8 w-8 text-muted-foreground/50" />
                        <p>No storage points found matching "{searchTerm}"</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20">
                <span className="text-sm font-medium text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Move Tires Form */}
        <div className="lg:col-span-2">
          <Card className="sticky top-24 border-border/50 shadow-xl overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-black via-black to-black" />
            <CardHeader className="space-y-1 pb-6 bg-muted/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-xl">
                  <Package className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold tracking-tight">Move Tires</CardTitle>
                  <CardDescription className="text-muted-foreground mt-0.5">
                    Transfer a batch between points
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  <FormField
                    control={form.control}
                    name="licensePlate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 font-semibold">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          License Plate
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. B-10-XYZ" className="h-11 uppercase font-mono tracking-tight" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 font-semibold">
                          <Warehouse className="h-4 w-4 text-muted-foreground" />
                          From Point
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. R1E1E2" className="h-11" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-center -my-2 relaive z-10">
                    <div className="bg-background border shadow-sm p-1.5 rounded-full">
                      <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90 lg:rotate-0" />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="destination"
                    render={({ field }) => (
                      <FormItem className="flex flex-col pt-1">
                        <FormLabel className="flex items-center gap-2 font-semibold">
                          <Warehouse className="h-4 w-4 text-blue-500" />
                          To Point
                        </FormLabel>
                        <Popover open={openDest} onOpenChange={setOpenDest}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openDest}
                                className={cn(
                                  "w-full justify-between h-11 border-blue-200 bg-blue-50/10 hover:bg-blue-50/30",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? field.value : "Select destination..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Search storage point..." />
                              <CommandList>
                                <CommandEmpty>No empty point found.</CommandEmpty>
                                <CommandGroup>
                                  {EMPTY_STORAGE_POINTS.map((point) => (
                                    <CommandItem
                                      key={point}
                                      value={point}
                                      onSelect={() => {
                                        form.setValue("destination", point)
                                        setOpenDest(false)
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          point === field.value ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      {point}
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

                  <div className="pt-2">
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem className="bg-muted/30 p-4 rounded-xl border border-border/40">
                          <FormLabel className="flex items-center gap-2 font-semibold">
                            <Hash className="h-4 w-4 text-muted-foreground" />
                            Quantity to Move
                          </FormLabel>
                          <FormControl>
                            <Input type="number" className="h-10 bg-background w-full" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {success && (
                    <div className="flex items-center gap-3 w-full p-3 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 text-sm font-medium animate-in zoom-in-95 duration-200">
                      <CheckCircle2 className="h-5 w-5 shrink-0" />
                      <span>Moved successfully!</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-black hover:bg-black/90 text-white shadow-md h-11 text-base font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white/20 border-t-white animate-spin rounded-full" />
                        <span>Moving...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        <span>Confirm Transfer</span>
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            
            <CardFooter className="bg-muted/10 border-t py-3">
              <p className="text-[11px] w-full text-muted-foreground flex items-center justify-center gap-2">
                <Info className="h-3 w-3 shrink-0" />
                Format: Section-Row-Shelf-Floor (e.g. R1E1E2)
              </p>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  )
}
