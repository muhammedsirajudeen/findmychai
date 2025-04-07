"use client"

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { useIsMobile } from "@/hooks/use-mobile"
import dynamic from "next/dynamic"
import AddChaiSpotModal from "@/components/add-chai-spot-modal"

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

  const [currentLocation, setCurrentLocation] = useState({ lat: 10.9309142, lng: 76.4214447 })
  const [selectedLocation, setSelectedLocation] = useState({ lat: 10.9309142, lng: 76.4214447 })
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        console.log(latitude, longitude)
        // setCurrentLocation({ lat: latitude, lng: longitude })

      }, (error) => {
        console.error("Error getting location", error)
      },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        })
    }
  }, [])
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">

      <main className="flex-1 relative">
        <div className="w-full h-[calc(100vh-4rem)] bg-orange-100 relative">
          <div className="absolute inset-0">
            <MapView latitude={currentLocation.lat} longitude={currentLocation.lng} />
          </div>

          <Button
            onClick={() => setShowAddSpot(true)}
            className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg z-[1000]"
          >
            <Plus className="h-6 w-6" />
            <span className="sr-only">Add Chai Spot</span>
          </Button>
        </div>
      </main>

      <AddChaiSpotModal isOpen={showAddSpot} onClose={() => setShowAddSpot(false)} currentLocation={currentLocation} />

    </div>
  )
}

