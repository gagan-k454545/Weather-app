"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef } from "react"

export default function WeatherMap({ lat, lon }) {
  const mapRef = useRef(null)

  useEffect(() => {
    if (!lat || !lon) return

    // Load OpenStreetMap
    const iframe = document.createElement("iframe")
    iframe.style.width = "100%"
    iframe.style.height = "100%"
    iframe.style.border = "none"
    iframe.style.borderRadius = "0.5rem"

    // Create OpenStreetMap URL with the location
    iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.1}%2C${lat - 0.1}%2C${lon + 0.1}%2C${lat + 0.1}&layer=mapnik&marker=${lat}%2C${lon}`

    // Clear previous content and append the iframe
    if (mapRef.current) {
      mapRef.current.innerHTML = ""
      mapRef.current.appendChild(iframe)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = ""
      }
    }
  }, [lat, lon])

  if (!lat || !lon) return null

  return (
    <Card className="mb-8">
      <CardHeader className="pb-2">
        <CardTitle>Location Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={mapRef} className="w-full h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
      </CardContent>
    </Card>
  )
}
