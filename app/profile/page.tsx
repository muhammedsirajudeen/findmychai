import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Badge } from "@/components/ui/badge"
import { CupSodaIcon as Cup } from "lucide-react"

export default function Profile() {
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <div className="hidden md:block">
        <MainNav />
      </div>

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <Avatar className="w-24 h-24 border-4 border-orange-300">
            <AvatarImage src="/placeholder.svg" alt="@username" />
            <AvatarFallback className="bg-amber-200 text-amber-800 text-xl">JD</AvatarFallback>
          </Avatar>

          <h1 className="mt-4 text-2xl font-bold text-amber-900">Jane Doe</h1>
          <p className="text-amber-700">Chai Enthusiast</p>

          <div className="flex items-center mt-2 bg-amber-100 rounded-full px-4 py-1">
            <Cup className="h-4 w-4 text-orange-500 mr-1" />
            <span className="text-amber-800 font-medium">12 Chai spots reviewed</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white border-amber-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-900">Your Chai Stats</CardTitle>
              <CardDescription className="text-amber-700">Your chai journey so far</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-amber-800">Spots Reviewed</span>
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">12</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-800">Favorite Spots</span>
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">5</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-800">Cities Explored</span>
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">3</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-800">Average Rating</span>
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">4.2</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-amber-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-900">Chai Badges</CardTitle>
              <CardDescription className="text-amber-700">Achievements unlocked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <Cup className="h-8 w-8 text-orange-500 mb-1" />
                  <span className="text-sm font-medium text-amber-800 text-center">Chai Explorer</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <Cup className="h-8 w-8 text-orange-500 mb-1" />
                  <span className="text-sm font-medium text-amber-800 text-center">Chai Connoisseur</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <Cup className="h-8 w-8 text-orange-500 mb-1" />
                  <span className="text-sm font-medium text-amber-800 text-center">Chai Reviewer</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <Cup className="h-8 w-8 text-orange-500 mb-1" />
                  <span className="text-sm font-medium text-amber-800 text-center">Chai Master</span>
                </div>
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

