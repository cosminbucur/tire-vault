"use client"

import * as React from "react"
import { User, Wrench, Disc, Pencil, Car, Warehouse, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CustomerFormValues } from "./CustomerForm"
import { ServiceFormValues } from "./ServiceForm"

export interface Tire {
  id: string
  width: string
  height: string
  diameterType: string
  brand: string
  rimType: "plate" | "alloy"
  tireType: "regular" | "runflat"
  wearIndicator: "Good" | "OK" | "Warning" | "Danger"
  season: "summer" | "winter" | "all-season"
  location: "car" | "storage"
}

interface VisitSummaryProps {
  customerData: CustomerFormValues | null
  serviceData: ServiceFormValues | null
  tires: Tire[]
  storagePoint: string
  capsNumber: string
  onEditStep: (stepIndex: number) => void
}

export function VisitSummary({
  customerData,
  serviceData,
  tires,
  storagePoint,
  capsNumber,
  onEditStep
}: VisitSummaryProps) {
  return (
    <div className="w-full space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        <div className="text-center space-y-2 mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Review Registration</h2>
          <p className="text-muted-foreground">Please double-check all information before finalizing the registration.</p>
        </div>

        {/* Customer Info Review */}
        <div className="space-y-4 p-5 rounded-2xl bg-muted/30 border border-border/50">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
              <User className="h-4 w-4" />
              Customer Information
            </h3>
            <Button variant="ghost" size="sm" onClick={() => onEditStep(0)} className="h-7 text-xs gap-1">
              <Pencil className="h-3 w-3" /> Edit
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground/70">Full Name</p>
                <p className="font-semibold">{customerData?.firstName} {customerData?.lastName || "—"}</p>
              </div>
              {customerData?.company && (
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground/70">Company</p>
                  <p className="font-semibold">{customerData.company}</p>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground/70">Phone</p>
                <p className="font-semibold">{customerData?.phone || "—"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground/70">Email</p>
                <p className="font-semibold truncate">{customerData?.email || "—"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Info Review */}
        <div className="space-y-4 p-5 rounded-2xl bg-muted/30 border border-border/50">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Service Information
            </h3>
            <Button variant="ghost" size="sm" onClick={() => onEditStep(1)} className="h-7 text-xs gap-1">
              <Pencil className="h-3 w-3" /> Edit
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground/70">License Plate</p>
                <Badge variant="secondary" className="font-mono text-sm uppercase px-3 py-1 bg-primary/5 text-primary border-primary/20">
                  {serviceData?.licensePlate || "—"}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground/70">Mechanic</p>
                <p className="font-semibold">{serviceData?.mechanic || "—"}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground/70">Services Performed</p>
                <p className="text-sm leading-relaxed">{serviceData?.servicesPerformed || "—"}</p>
              </div>
              {serviceData?.notes && (
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground/70">Notes</p>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">"{serviceData.notes}"</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tires Review */}
        <div className="space-y-6 p-5 rounded-2xl bg-muted/30 border border-border/50">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
              <Disc className="h-4 w-4" />
              Tires Information
            </h3>
            <Button variant="ghost" size="sm" onClick={() => onEditStep(2)} className="h-7 text-xs gap-1">
              <Pencil className="h-3 w-3" /> Edit
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6 bg-background/40 p-3 rounded-xl border border-border/20">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-muted-foreground/70">Storage Point</p>
              <div className="flex items-center gap-2">
                <Warehouse className="h-3 w-3 text-amber-500" />
                <p className="font-semibold text-sm">{storagePoint || "—"}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-muted-foreground/70">Caps Count</p>
              <div className="flex items-center gap-2">
                <Hash className="h-3 w-3 text-primary" />
                <p className="font-semibold text-sm">{capsNumber || "—"}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* On Car Summary */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-border/50 pb-1.5">
                <Car className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-tight">On Car ({tires.filter(t => t.location === "car").length})</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {tires.filter(t => t.location === "car").map((tire, idx) => (
                  <div key={tire.id} className="text-[11px] bg-background/60 p-2 rounded-lg border border-border/30 flex justify-between items-center group hover:border-primary/30 transition-colors">
                    <div className="flex flex-col">
                      <span className="font-bold flex items-center gap-1.5">
                        Tire {idx + 1}: {tire.brand}
                        <Badge className={cn(
                          "h-3.5 px-1 text-[8px] uppercase font-bold border-none",
                          tire.wearIndicator === "Good" ? "bg-green-500/10 text-green-600" :
                          tire.wearIndicator === "OK" ? "bg-blue-500/10 text-blue-600" :
                          tire.wearIndicator === "Warning" ? "bg-yellow-500/10 text-yellow-600" :
                          "bg-red-500/10 text-red-600"
                        )}>
                          {tire.wearIndicator}
                        </Badge>
                      </span>
                      <span className="text-muted-foreground">
                        {tire.width}/{tire.height} {tire.diameterType} • {tire.season} • {tire.rimType}
                      </span>
                    </div>
                  </div>
                ))}
                {tires.filter(t => t.location === "car").length === 0 && (
                  <p className="text-[11px] text-muted-foreground italic text-center py-2">No tires on car</p>
                )}
              </div>
            </div>

            {/* In Storage Summary */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-border/50 pb-1.5">
                <Warehouse className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-xs font-bold uppercase tracking-tight">In Storage ({tires.filter(t => t.location === "storage").length})</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {tires.filter(t => t.location === "storage").map((tire, idx) => (
                  <div key={tire.id} className="text-[11px] bg-background/60 p-2 rounded-lg border border-border/30 flex justify-between items-center group hover:border-amber-500/30 transition-colors">
                    <div className="flex flex-col">
                      <span className="font-bold flex items-center gap-1.5">
                        Tire {idx + 1}: {tire.brand}
                        <Badge className={cn(
                          "h-3.5 px-1 text-[8px] uppercase font-bold border-none",
                          tire.wearIndicator === "Good" ? "bg-green-500/10 text-green-600" :
                          tire.wearIndicator === "OK" ? "bg-blue-500/10 text-blue-600" :
                          tire.wearIndicator === "Warning" ? "bg-yellow-500/10 text-yellow-600" :
                          "bg-red-500/10 text-red-600"
                        )}>
                          {tire.wearIndicator}
                        </Badge>
                      </span>
                      <span className="text-muted-foreground">
                        {tire.width}/{tire.height} {tire.diameterType} • {tire.season} • {tire.rimType}
                      </span>
                    </div>
                  </div>
                ))}
                {tires.filter(t => t.location === "storage").length === 0 && (
                  <p className="text-[11px] text-muted-foreground italic text-center py-2">No tires in storage</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
