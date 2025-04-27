import { NextResponse } from "next/server"

const API_KEY = "1e3e8f230b6064d27976e41163a82b77"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")

  if (!lat || !lon) {
    return NextResponse.json({ error: "Latitude and longitude parameters are required" }, { status: 400 })
  }

  try {
    // First get the location name using reverse geocoding
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`,
    )

    if (!geoResponse.ok) {
      throw new Error("Failed to get location name")
    }

    const geoData = await geoResponse.json()

    if (!geoData || geoData.length === 0) {
      throw new Error("Location not found")
    }

    // Then get the weather data
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    )

    if (!weatherResponse.ok) {
      throw new Error("Failed to get weather data")
    }

    const weatherData = await weatherResponse.json()
    return NextResponse.json(weatherData)
  } catch (error) {
    console.error("Error fetching current weather data:", error)
    return NextResponse.json({ error: "Failed to fetch current weather data" }, { status: 500 })
  }
}
