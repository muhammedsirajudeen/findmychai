"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Settings, LayoutDashboard } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  const links = [
    {
      name: "Map",
      href: "/dashboard",
      icon: Home,
      active: pathname === "/dashboard",
    },
    {
      name: "Dashboard",
      href: "/dashboard/reviews",
      icon: LayoutDashboard,
      active: pathname === "/dashboard/reviews",
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
      active: pathname === "/profile",
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      active: pathname === "/settings",
    },
  ]

  return (
    <nav className="h-16 border-b border-amber-200 bg-white">
      <div className="container h-full flex items-center justify-between">
        <Link href="/dashboard" className="text-xl font-bold text-amber-900">
          Find My Chai
        </Link>

        <div className="flex items-center space-x-1">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-3 py-2 rounded-md flex items-center space-x-1 transition-colors ${
                link.active ? "bg-amber-100 text-amber-900" : "text-amber-700 hover:bg-amber-50 hover:text-amber-800"
              }`}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

