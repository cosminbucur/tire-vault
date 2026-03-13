import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MechanicForm, MechanicFormValues } from "./MechanicForm"
import { Plus, MoreHorizontal, UserCheck, UserX, Pencil, Trash2, Loader2, Search } from "lucide-react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"

interface Mechanic {
  id: string
  first_name: string
  last_name: string
  is_active: boolean
  created_at: string
}

export default function MechanicManagement() {
  const [mechanics, setMechanics] = useState<Mechanic[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingMechanic, setEditingMechanic] = useState<Mechanic | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchMechanics()
  }, [])

  async function fetchMechanics() {
    setLoading(true)
    const { data, error } = await supabase
      .from("mechanics")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      toast.error("Failed to fetch mechanics")
      console.error(error)
    } else {
      setMechanics(data || [])
    }
    setLoading(false)
  }

  async function handleAddMechanic(values: MechanicFormValues) {
    setIsSubmitting(true)
    const { error } = await supabase
      .from("mechanics")
      .insert([values])

    if (error) {
      toast.error("Failed to add mechanic")
      console.error(error)
    } else {
      toast.success("Mechanic added successfully")
      setIsAddOpen(false)
      fetchMechanics()
    }
    setIsSubmitting(false)
  }

  async function handleEditMechanic(values: MechanicFormValues) {
    if (!editingMechanic) return

    setIsSubmitting(true)
    const { error } = await supabase
      .from("mechanics")
      .update(values)
      .eq("id", editingMechanic.id)

    if (error) {
      toast.error("Failed to update mechanic")
      console.error(error)
    } else {
      toast.success("Mechanic updated successfully")
      setEditingMechanic(null)
      fetchMechanics()
    }
    setIsSubmitting(false)
  }

  async function toggleActive(mechanic: Mechanic) {
    const { error } = await supabase
      .from("mechanics")
      .update({ is_active: !mechanic.is_active })
      .eq("id", mechanic.id)

    if (error) {
      toast.error(`Failed to mark as ${mechanic.is_active ? 'inactive' : 'active'}`)
      console.error(error)
    } else {
      toast.success(`Mechanic marked as ${mechanic.is_active ? 'inactive' : 'active'}`)
      fetchMechanics()
    }
  }

  async function handleDelete(mechanic: Mechanic) {
    const confirmed = window.confirm(`Are you sure you want to PERMANENTLY delete ${mechanic.first_name} ${mechanic.last_name}? This cannot be undone and might fail if there are linked visits.`)
    if (!confirmed) return

    const { error } = await supabase
      .from("mechanics")
      .delete()
      .eq("id", mechanic.id)

    if (error) {
      toast.error("Failed to delete mechanic. They might be linked to visits.")
      console.error(error)
    } else {
      toast.success("Mechanic deleted successfully")
      fetchMechanics()
    }
  }

  const filteredMechanics = mechanics.filter((m) =>
    `${m.first_name} ${m.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search mechanics..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto gap-2">
              <Plus className="h-4 w-4" />
              Add Mechanic
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Mechanic</DialogTitle>
              <DialogDescription>
                Enter the details of the new mechanic.
              </DialogDescription>
            </DialogHeader>
            <MechanicForm onSubmit={handleAddMechanic} isLoading={isSubmitting} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-muted-foreground">Loading mechanics...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredMechanics.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground font-medium">
                  {searchQuery ? "No mechanics found matching your search." : "No mechanics registered yet."}
                </TableCell>
              </TableRow>
            ) : (
              filteredMechanics.map((mechanic) => (
                <TableRow key={mechanic.id} className="group hover:bg-accent/5 transition-colors">
                  <TableCell>
                    <div className="font-semibold text-foreground">
                      {mechanic.first_name} {mechanic.last_name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={mechanic.is_active ? "default" : "secondary"}
                      className={mechanic.is_active ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-muted text-muted-foreground"}
                    >
                      {mechanic.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(mechanic.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent rounded-full transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setEditingMechanic(mechanic)} className="cursor-pointer">
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleActive(mechanic)} className="cursor-pointer">
                          {mechanic.is_active ? (
                            <>
                              <UserX className="mr-2 h-4 w-4 text-orange-500" />
                              <span className="text-orange-500">Mark Inactive</span>
                            </>
                          ) : (
                            <>
                              <UserCheck className="mr-2 h-4 w-4 text-emerald-500" />
                              <span className="text-emerald-500">Mark Active</span>
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDelete(mechanic)} 
                          className="text-destructive focus:text-destructive cursor-pointer"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Permanently
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog 
        open={!!editingMechanic} 
        onOpenChange={(open) => !open && setEditingMechanic(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Mechanic</DialogTitle>
            <DialogDescription>
              Update the details for {editingMechanic?.first_name} {editingMechanic?.last_name}.
            </DialogDescription>
          </DialogHeader>
          {editingMechanic && (
            <MechanicForm 
              initialValues={{
                first_name: editingMechanic.first_name,
                last_name: editingMechanic.last_name,
              }}
              onSubmit={handleEditMechanic} 
              isLoading={isSubmitting}
              submitLabel="Update Mechanic"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
