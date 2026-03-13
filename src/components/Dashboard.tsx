import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CustomerForm, VisitStepper } from "@/components/Visits"
import { LayoutDashboard, FileText, ArrowLeft } from "lucide-react"

export default function Dashboard() {
  const [view, setView] = useState<"overview" | "customer" | "visit">("overview")

  if (view === "customer") {
    return (
      <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={() => setView("overview")} className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add Customer</h1>
            <p className="text-muted-foreground mt-1">
              Create a new customer profile in your database.
            </p>
          </div>
        </div>
        <CustomerForm />
      </div>
    )
  }

  if (view === "visit") {
    return (
      <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={() => setView("overview")} className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Register Visit</h1>
            <p className="text-muted-foreground mt-1">
              Follow the steps to register a new customer visit and service.
            </p>
          </div>
        </div>
        <VisitStepper />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <LayoutDashboard className="h-8 w-8 text-primary" />
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Analyze your performance and monitor key metrics in real-time.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setView("visit")} className="flex items-center gap-2 shadow-lg hover:shadow-primary/20 bg-primary text-primary-foreground">
            <FileText className="h-4 w-4" />
            Register Visit
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Revenue", value: "45,231.89 RON", trend: "+20.1% from last month", icon: "💰" },
          { title: "Customers", value: "220", trend: "+10.1% from last month", icon: "👤" },
          { title: "Sales", value: "12,234 RON", trend: "+19.1% from last month", icon: "🛍️" },
          { title: "Tires in Storage", value: "640", trend: "+24 since last month", icon: "📈" },
        ].map((stat, i) => (
          <Card key={i} className="transition-all hover:shadow-md border-border/50 group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <span className="text-xl transition-transform group-hover:scale-125 duration-300">{stat.icon}</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 font-medium text-emerald-600 dark:text-emerald-400">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4 overflow-hidden border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
            <CardDescription>
              Visualization of your system performance over the last 30 days.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative aspect-video w-full bg-muted overflow-hidden group">
               <img 
                src="/dashboard-placeholder.png" 
                alt="Dashboard Performance Chart" 
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-semibold text-white px-2 py-1 bg-black/50 backdrop-blur-md rounded-md">Live Data Feed</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              You have 12 new notifications today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { user: "Alice Johnson", action: "purchased Pro Plan", time: "2 min ago", avatar: "AJ" },
                { user: "Bob Smith", action: "signed up", time: "1 hour ago", avatar: "BS" },
                { user: "Charlie Davis", action: "updated profile", time: "3 hours ago", avatar: "CD" },
                { user: "Diana Prince", action: "started a trial", time: "5 hours ago", avatar: "DP" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer p-1 rounded-lg hover:bg-accent/50 transition-colors">
                  <Avatar className="h-9 w-9 border border-primary/10 transition-transform group-hover:scale-110">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs transition-colors group-hover:bg-primary group-hover:text-white">
                      {activity.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
                      {activity.user}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
