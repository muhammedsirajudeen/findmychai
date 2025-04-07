"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { useIsMobile } from "@/hooks/use-mobile"
import dynamic from "next/dynamic"
import AddChaiSpotModal from "@/components/add-chai-spot-modal"

// Import MapView with no SSR since Leaflet requires window object
const MapView = dynamic(() => import("@/components/map-view"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-amber-100">
      <div className="text-amber-800 text-center p-4">
        <p className="text-lg font-medium">Loading Map...</p>
      </div>
    </div>
  ),
})

export default function Dashboard() {
  const [showAddSpot, setShowAddSpot] = useState(false)
  const isMobile = useIsMobile()

  // Mock current location (New York City)
  const currentLocation = { lat: 40.712776, lng: -74.005974 }

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      {!isMobile && <MainNav />}

      <main className="flex-1 relative">
        <div className="w-full h-[calc(100vh-4rem)] bg-orange-100 relative">
          {/* Leaflet Map */}
          <div className="absolute inset-0">
            {/* <MapView /> */}
          </div>

          {/* Add Chai Spot Button */}
          <Button
            onClick={() => setShowAddSpot(true)}
            className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg z-[1000]"
          >
            <Plus className="h-6 w-6" />
            <span className="sr-only">Add Chai Spot</span>
          </Button>
        </div>
      </main>

      {/* Add Chai Spot Modal */}
      <AddChaiSpotModal isOpen={showAddSpot} onClose={() => setShowAddSpot(false)} currentLocation={currentLocation} />

      {isMobile && <MobileNav />}
    </div>
  )
}

