"use client"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { useIsMobile } from "@/hooks/use-mobile"
import type React from "react"
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = useIsMobile()

  return (
    <>
      {isMobile && <MobileNav />}
      {!isMobile && <MainNav />}

      {children}
    </>

  )
}

