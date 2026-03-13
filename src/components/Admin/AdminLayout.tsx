import { Link, Outlet, useLocation } from "react-router-dom"
import { Users, Shield, Wrench, Settings } from "lucide-react"

const navItems = [
  { name: "Mechanics", path: "/admin/mechanics", icon: Wrench },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Permissions", path: "/admin/permissions", icon: Shield },
  { name: "Settings", path: "/admin/settings", icon: Settings },
]

export default function AdminLayout() {
  const location = useLocation()

  return (
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          Administration
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage system configurations, users, and mechanics.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className={`h-4 w-4 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                {item.name}
              </Link>
            )
          })}
        </aside>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
