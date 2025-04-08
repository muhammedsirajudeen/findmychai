"use client"

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl,
} from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Button } from "./ui/button"
import { MapIcon } from "lucide-react"

const fixLeafletIcons = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/marker-icon-2x.png",
    iconUrl: "/marker-icon.png",
    shadowUrl: "/marker-shadow.png",
  })
}

const chaiIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23FF9800' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M17 8h1a4 4 0 1 1 0 8h-1'%3E%3C/path%3E%3Cpath d='M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z'%3E%3C/path%3E%3Cline x1='6' y1='2' x2='6' y2='4'%3E%3C/line%3E%3Cline x1='10' y1='2' x2='10' y2='4'%3E%3C/line%3E%3Cline x1='14' y1='2' x2='14' y2='4'%3E%3C/line%3E%3C/svg%3E",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})
const locationIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

const chaiSpots: { id: number; name: string; position: [number, number]; rating: number; reviews: number }[] = [
  {
    id: 1,
    name: "Chai Corner",
    position: [10.9369142, 76.4214447],
    rating: 4.5,
    reviews: 12,
  },
  {
    id: 2,
    name: "Spice Chai House",
    position: [40.716776, -74.012974],
    rating: 4.2,
    reviews: 8,
  },
  {
    id: 3,
    name: "Masala Chai Cafe",
    position: [40.718776, -74.003974],
    rating: 4.8,
    reviews: 23,
  },
]

function SetViewOnLoad({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, 14)
  }, [])
  return null
}

interface MapViewProps {
  longitude: number
  latitude: number
  setSelectedLocation: Dispatch<SetStateAction<{ lat: number; lng: number }>>
  onDropPin: () => void
}
//The value isnt reactive so keep it there
export default function MapView({ longitude, latitude, setSelectedLocation, onDropPin }: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null)
  const [longPressTimeout, setLongPressTimeout] = useState<NodeJS.Timeout | null>(null)
  const [longPressLocation, setLongPressLocation] = useState<[number, number] | null>(null)

  useEffect(() => {
    fixLeafletIcons()
  }, [])

  const handleRecenter = () => {
    if (mapRef.current) {
      mapRef.current.setView([latitude, longitude], 14)
    }
  }

  const handleLongPressStart = (event: React.MouseEvent | React.TouchEvent) => {
    const timeout = setTimeout(() => {
      if (mapRef.current) {
        const map = mapRef.current
        let clientX = 0
        let clientY = 0

        if ('touches' in event && event.touches.length > 0) {
          clientX = event.touches[0].clientX
          clientY = event.touches[0].clientY
        } else if ('clientX' in event) {
          clientX = event.clientX
          clientY = event.clientY
        }
        const containerPoint = map.containerPointToLatLng(
          map.mouseEventToContainerPoint({ clientX, clientY } as MouseEvent)
        )

        setLongPressLocation([containerPoint.lat, containerPoint.lng])
        setSelectedLocation({ lat: containerPoint.lat, lng: containerPoint.lng })
        setTimeout(() => {
          onDropPin()
        }, 1000)
      }
    }, 1000) // You can adjust the delay

    setLongPressTimeout(timeout)
  }


  const handleLongPressEnd = () => {
    if (longPressTimeout) {
      clearTimeout(longPressTimeout)
      setLongPressTimeout(null)
    }
  }

  return (
    <div
      className="relative h-full w-full touch-none"
      onMouseDown={handleLongPressStart}
      onMouseUp={handleLongPressEnd}
      onMouseLeave={handleLongPressEnd}
      onTouchStart={handleLongPressStart}
      onTouchEnd={handleLongPressEnd}
    >
      <MapContainer
        center={[latitude, longitude]}
        zoom={14}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        zoomControl={false}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={locationIcon}>
          <p>current location</p>
        </Marker>

        {longPressLocation && (
          <Marker position={longPressLocation} icon={locationIcon}>
            <Popup>Long press location</Popup>
          </Marker>
        )}

        <ZoomControl position="bottomleft" />

        {chaiSpots.map((spot) => (
          <Marker key={spot.id} position={spot.position} icon={chaiIcon}>
            <Popup className="chai-popup">
              <div className="p-2 min-w-[150px]">
                <h3 className="font-bold text-amber-900">{spot.name}</h3>
                <div className="flex items-center mt-1">
                  <div className="text-orange-500">★</div>
                  <div className="ml-1 text-amber-800">{spot.rating}</div>
                  <div className="ml-2 text-xs text-amber-600">
                    ({spot.reviews} reviews)
                  </div>
                </div>
                <button className="mt-2 text-sm text-orange-500 hover:text-orange-600">
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        <SetViewOnLoad center={[latitude, longitude]} />
      </MapContainer>

      <Button
        onClick={handleRecenter}
        className="absolute top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-2xl shadow-lg border border-gray-300 bg-white hover:bg-amber-50 hover:border-amber-300 transition-colors duration-200"
      >
        <MapIcon className="w-4 h-4 text-amber-500" />
        <span className="text-sm font-medium text-amber-700">Recenter Map</span>
      </Button>
    </div>
  )
}
