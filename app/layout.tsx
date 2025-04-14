import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Toaster } from "@/components/ui/toaster"
import GlobalProvider from "./provider/GlobalProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Find My Chai",
  description: "Find the best chai near you",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body className={inter.className}>

        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <Toaster />
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            <GlobalProvider>
              {children}
            </GlobalProvider>
          </ThemeProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  )
}



