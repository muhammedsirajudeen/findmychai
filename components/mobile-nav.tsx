"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Settings, LayoutDashboard } from "lucide-react"

export function MobileNav() {
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
    <nav className="fixed bottom-0 left-0 right-0 h-16 border-t border-amber-200 bg-white">
      <div className="h-full grid grid-cols-4">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`flex flex-col items-center justify-center transition-colors ${
              link.active ? "text-orange-500" : "text-amber-700 hover:text-amber-900"
            }`}
          >
            <link.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{link.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

