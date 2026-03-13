import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { supabase } from '@/lib/supabaseClient'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Warehouse, LogOut, Settings, User, CreditCard } from "lucide-react"

export default function Header() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const location = useLocation()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const userInitial = user?.email?.charAt(0).toUpperCase() ?? 'U'
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6 mx-auto max-w-7xl">
        <Link to="/dashboard" className="flex items-center gap-3 group transition-all duration-300">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Warehouse className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/40 transition-all duration-300">
              TireVault
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold leading-none group-hover:text-primary/70 transition-colors duration-300">
              Premium Storage
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {[
            { name: 'Dashboard', path: '/dashboard' },
            { name: 'Storage', path: '/storage' },
            { name: 'Visits', path: '/visits' },
            { name: 'Reports', path: '/reports' },
            { name: 'Admin', path: '/admin' },
          ].map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative py-1 transition-all duration-300 hover:text-primary group ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.name}
                <span 
                  className={`absolute inset-x-0 -bottom-1 h-0.5 bg-primary transition-transform duration-300 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} 
                />
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative flex h-12 items-center gap-3 rounded-full hover:bg-accent/50 px-2 transition-colors focus:outline-none group">
                <Avatar className="h-9 w-9 border-2 border-primary/10 shadow-sm transition-transform group-hover:scale-105">
                  <AvatarImage src={user?.user_metadata?.avatar_url} alt={userName} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">{userInitial}</AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start transition-opacity group-hover:opacity-80 text-left">
                  <span className="text-sm font-semibold leading-none truncate max-w-[120px]">{userName}</span>
                  <span className="text-[11px] text-muted-foreground mt-0.5 truncate max-w-[150px]">{user?.email}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive cursor-pointer font-medium"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
