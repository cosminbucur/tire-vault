import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-background text-foreground max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">
            Analyze your performance and monitor key metrics in real-time.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Data</Button>
          <Button>Create New</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Revenue", value: "$45,231.89", trend: "+20.1% from last month", icon: "💰" },
          { title: "Subscriptions", value: "+2350", trend: "+180.1% from last month", icon: "👤" },
          { title: "Sales", value: "+12,234", trend: "+19.1% from last month", icon: "🛍️" },
          { title: "Active Now", value: "+573", trend: "+201 since last hour", icon: "📈" },
        ].map((stat, i) => (
          <Card key={i} className="transition-all hover:shadow-md border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <span className="text-xl">{stat.icon}</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4 overflow-hidden border-border/50">
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
            <CardDescription>
              Visualization of your system performance over the last 30 days.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative aspect-video w-full bg-muted overflow-hidden">
               <img 
                src="/dashboard-placeholder.png" 
                alt="Dashboard Performance Chart" 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 border-border/50">
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
                <div key={i} className="flex items-center gap-4">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs border border-primary/20">
                    {activity.avatar}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.user}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
