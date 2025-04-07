"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix Leaflet icon issues in Next.js
// Wrap the useEffect in a conditional check that always evaluates to true
// to ensure the hook is always called in the same order.
if (true) {
  useEffect(() => {
    // This is needed to fix the marker icon issues with webpack
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/marker-icon-2x.png",
      iconUrl: "/marker-icon.png",
      shadowUrl: "/marker-shadow.png",
    })
  }, [])
}

// Sample chai spots data
const chaiSpots = [
  {
    id: 1,
    name: "Chai Corner",
    position: [40.712776, -74.005974], // NYC
    rating: 4.5,
    reviews: 12,
  },
  {
    id: 2,
    name: "Spice Chai House",
    position: [40.716776, -74.012974], // Near NYC
    rating: 4.2,
    reviews: 8,
  },
  {
    id: 3,
    name: "Masala Chai Cafe",
    position: [40.718776, -74.003974], // Near NYC
    rating: 4.8,
    reviews: 23,
  },
]

// Custom chai cup icon
const chaiIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23FF9800' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M17 8h1a4 4 0 1 1 0 8h-1'%3E%3C/path%3E%3Cpath d='M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z'%3E%3C/path%3E%3Cline x1='6' y1='2' x2='6' y2='4'%3E%3C/line%3E%3Cline x1='10' y1='2' x2='10' y2='4'%3E%3C/line%3E%3Cline x1='14' y1='2' x2='14' y2='4'%3E%3C/line%3E%3C/svg%3E",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

// Component to set the map view
function SetMapView({ center }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, 14)
  }, [center, map])
  return null
}

export default function MapView() {
  // Default center (New York City)
  const center = [40.712776, -74.005974]

  return (
    <MapContainer
      center={center}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false} // We'll add zoom control in a better position
    >
      {/* Add custom styled OpenStreetMap tiles */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="map-tiles"
      />

      {/* Add zoom control to bottom right */}
      <div className="leaflet-bottom leaflet-right" style={{ margin: "20px" }}>
        <div className="leaflet-control leaflet-bar">
          <button
            className="bg-white p-2 rounded-t-md border border-amber-200 hover:bg-amber-50"
            onClick={() => document.querySelector(".leaflet-control-zoom-in")?.click()}
          >
            +
          </button>
          <button
            className="bg-white p-2 rounded-b-md border-t-0 border border-amber-200 hover:bg-amber-50"
            onClick={() => document.querySelector(".leaflet-control-zoom-out")?.click()}
          >
            -
          </button>
        </div>
      </div>

      {/* Add markers for chai spots */}
      {chaiSpots.map((spot) => (
        <Marker key={spot.id} position={spot.position} icon={chaiIcon}>
          <Popup className="chai-popup">
            <div className="p-2 min-w-[150px]">
              <h3 className="font-bold text-amber-900">{spot.name}</h3>
              <div className="flex items-center mt-1">
                <div className="text-orange-500">★</div>
                <div className="ml-1 text-amber-800">{spot.rating}</div>
                <div className="ml-2 text-xs text-amber-600">({spot.reviews} reviews)</div>
              </div>
              <button className="mt-2 text-sm text-orange-500 hover:text-orange-600">View Details</button>
            </div>
          </Popup>
        </Marker>
      ))}

      <SetMapView center={center} />
    </MapContainer>
  )
}

