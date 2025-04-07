"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { LogOut, Moon, Sun } from "lucide-react"

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <div className="hidden md:block">
        <MainNav />
      </div>

      <main className="flex-1 container max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-amber-900 mb-6">Settings</h1>

        <div className="space-y-6">
          <Card className="bg-white border-amber-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-900">Appearance</CardTitle>
              <CardDescription className="text-amber-700">Customize how Find My Chai looks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {darkMode ? <Moon className="h-5 w-5 text-amber-700" /> : <Sun className="h-5 w-5 text-amber-700" />}
                  <Label htmlFor="dark-mode" className="text-amber-800">
                    Dark Mode
                  </Label>
                </div>
                <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-amber-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-900">Notifications</CardTitle>
              <CardDescription className="text-amber-700">Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-spots" className="text-amber-800">
                    New chai spots nearby
                  </Label>
                  <Switch id="new-spots" checked={notifications} onCheckedChange={setNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="reviews" className="text-amber-800">
                    Responses to your reviews
                  </Label>
                  <Switch id="reviews" checked={notifications} onCheckedChange={setNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="updates" className="text-amber-800">
                    App updates
                  </Label>
                  <Switch id="updates" checked={notifications} onCheckedChange={setNotifications} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-amber-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-900">Account</CardTitle>
              <CardDescription className="text-amber-700">Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full border-amber-300 text-amber-800 hover:bg-amber-100 hover:text-amber-900"
                >
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-amber-300 text-amber-800 hover:bg-amber-100 hover:text-amber-900"
                >
                  Change Password
                </Button>
                <Button
                  variant="destructive"
                  className="w-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <div className="md:hidden">
        <MobileNav />
      </div>
    </div>
  )
}

