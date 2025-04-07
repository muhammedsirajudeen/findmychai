"use client"

import type React from "react"
import { useState } from "react"
import { X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

interface AddChaiSpotModalProps {
  isOpen: boolean
  onClose: () => void
  currentLocation?: { lat: number; lng: number }
}

export default function AddChaiSpotModal({ isOpen, onClose, currentLocation }: AddChaiSpotModalProps) {
  const [rating, setRating] = useState([3])
  const [strongness, setStrongness] = useState([3])
  const [character, setCharacter] = useState([3])
  const [ambience, setAmbience] = useState([3])
  const [emoji, setEmoji] = useState("")
  const [preview, setPreview] = useState<string | null>(null)

  if (!isOpen) return null

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    onClose()
  }

  const SliderSection = ({
    label,
    value,
    setValue,
    minLabel,
    maxLabel,
  }: {
    label: string
    value: number[]
    setValue: (val: number[]) => void
    minLabel: string
    maxLabel: string
  }) => (
    <div>
      <Label className="text-amber-800">{label}</Label>
      <div className="flex items-center gap-2 pt-2">
        <span className="text-amber-700 text-sm">{minLabel}</span>
        <Slider value={value} min={1} max={5} step={1} onValueChange={setValue} className="flex-1" />
        <span className="text-amber-700 text-sm">{maxLabel}</span>
      </div>
      <div className="text-center text-amber-800 font-medium mt-1">
        {value[0]} / 5
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[2000]">
      <div className="bg-white rounded-xl w-full max-h-[90vh] overflow-scroll max-w-md p-6 shadow-xl animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-amber-900">Add a Chai Spot</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="spot-name" className="text-amber-800">
              Spot Name
            </Label>
            <Input
              id="spot-name"
              placeholder="e.g. Chai Corner"
              className="border-amber-200 focus-visible:ring-amber-500"
            />
          </div>

          <div>
            <Label htmlFor="review" className="text-amber-800">
              Your Review
            </Label>
            <Textarea
              id="review"
              placeholder="How was the chai?"
              className="border-amber-200 focus-visible:ring-amber-500"
            />
          </div>

          <SliderSection
            label="Overall Rating"
            value={rating}
            setValue={setRating}
            minLabel="1"
            maxLabel="5"
          />
          <SliderSection
            label="Strongness"
            value={strongness}
            setValue={setStrongness}
            minLabel="Mild"
            maxLabel="Kadak"
          />
          <SliderSection
            label="Character"
            value={character}
            setValue={setCharacter}
            minLabel="Plain"
            maxLabel="Masaledar"
          />
          <SliderSection
            label="Ambience"
            value={ambience}
            setValue={setAmbience}
            minLabel="Chill"
            maxLabel="Crowded"
          />

          <div>
            <Label htmlFor="emoji" className="text-amber-800">
              Emoji that describes the chai ☕️
            </Label>
            <Input
              id="emoji"
              placeholder="e.g. 😌, 🔥, 🤤"
              maxLength={2}
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="border-amber-200 focus-visible:ring-amber-500 text-center text-xl"
            />
          </div>

          <div>
            <Label htmlFor="photo" className="text-amber-800">
              Upload Photo
            </Label>
            <div className="mt-1 border-2 border-dashed border-amber-200 rounded-lg p-4 text-center">
              {preview ? (
                <div className="relative">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Preview"
                    className="mx-auto max-h-40 rounded-md object-cover"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80"
                    onClick={() => setPreview(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Input id="photo" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  <Button
                    type="button"
                    variant="outline"
                    className="text-amber-700 border-amber-300 hover:bg-amber-100"
                    onClick={() => document.getElementById("photo")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Photo
                  </Button>
                  <p className="mt-2 text-sm text-amber-600">JPG, PNG or GIF up to 5MB</p>
                </>
              )}
            </div>
          </div>

          {currentLocation && (
            <div className="text-sm text-amber-700 bg-amber-50 p-3 rounded-md">
              <p>Adding spot at current location:</p>
              <p className="font-mono mt-1">
                Lat: {currentLocation.lat.toFixed(6)}, Lng: {currentLocation.lng.toFixed(6)}
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-orange-400 hover:from-amber-600 hover:to-orange-500"
          >
            Add Spot
          </Button>
        </form>
      </div>
    </div>
  )
}
