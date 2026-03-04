import { useState } from "react"
import { Search, FileText, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const MOCK_VISITS = [
  {
    id: "VST-001",
    licensePlate: "B-10-ABC",
    customerName: "Alice Johnson",
    services: "Tire Replacement, Alignment",
    date: "2026-03-04",
    status: "Completed",
  },
  {
    id: "VST-002",
    licensePlate: "CJ-22-XYZ",
    customerName: "Bob Smith",
    services: "Oil Change",
    date: "2026-03-04",
    status: "In Progress",
  },
  {
    id: "VST-003",
    licensePlate: "TM-99-QWE",
    customerName: "Charlie Davis",
    services: "Brake Pads, Fluid Check",
    date: "2026-03-05",
    status: "Pending",
  },
  {
    id: "VST-004",
    licensePlate: "B-12-DEF",
    customerName: "Diana Prince",
    services: "Winter Tires Setup",
    date: "2026-03-05",
    status: "Pending",
  },
  {
    id: "VST-005",
    licensePlate: "CJ-88-PLM",
    customerName: "Edward Elric",
    services: "Full Checkup",
    date: "2026-03-05",
    status: "Completed",
  },
  {
    id: "VST-006",
    licensePlate: "B-99-ZZZ",
    customerName: "Frank Castle",
    services: "Brake Fluid Change",
    date: "2026-03-06",
    status: "Pending",
  },
  {
    id: "VST-007",
    licensePlate: "TM-11-AAA",
    customerName: "George Smith",
    services: "Tire Pressure Check",
    date: "2026-03-06",
    status: "In Progress",
  },
  {
    id: "VST-008",
    licensePlate: "B-44-QWE",
    customerName: "Hannah Montana",
    services: "Alignment",
    date: "2026-03-07",
    status: "Pending",
  },
]

const ITEMS_PER_PAGE = 5

export default function Visits() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const filteredVisits = MOCK_VISITS.filter((visit) =>
    visit.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA
  })

  const totalPages = Math.ceil(filteredVisits.length / ITEMS_PER_PAGE)
  const paginatedVisits = filteredVisits.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
      case "In Progress":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "Pending":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            Visits Tracker
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and search through customer service visits.
          </p>
        </div>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-4 border-b">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Recent Visits</CardTitle>
              <CardDescription>
                A comprehensive list of all recent customer vehicles in shop.
              </CardDescription>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by license plate..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-9 h-10 w-full bg-muted/50 focus-visible:bg-transparent"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-semibold px-6 py-4">License Plate</TableHead>
                <TableHead className="font-semibold">Customer</TableHead>
                <TableHead className="font-semibold">Services Performed</TableHead>
                <TableHead className="font-semibold">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    className="-ml-4 h-8 bg-transparent hover:bg-muted/50 font-semibold text-muted-foreground"
                  >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-right px-6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedVisits.length > 0 ? (
                paginatedVisits.map((visit) => (
                  <TableRow key={visit.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium px-6">{visit.licensePlate}</TableCell>
                    <TableCell>{visit.customerName}</TableCell>
                    <TableCell className="text-muted-foreground">{visit.services}</TableCell>
                    <TableCell>{visit.date}</TableCell>
                    <TableCell className="text-right px-6">
                      <Badge className={getStatusColor(visit.status)} variant="outline">
                        {visit.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No visits found matching "{searchTerm}".
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredVisits.length)}
              </span>{" "}
              of <span className="font-medium">{filteredVisits.length}</span> results
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "ghost"}
                    size="icon"
                    className="w-8 h-8"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
