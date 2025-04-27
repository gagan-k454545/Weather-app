import { NextResponse } from "next/server"

const API_KEY = "1e3e8f230b6064d27976e41163a82b77"

// Sanitize the city name to remove any problematic characters
const sanitizeCity = (cityName) => {
  if (!cityName) return ""

  // Remove any backslashes, quotes, and other potentially problematic characters
  return cityName.replace(/[\\'"<>]/g, "").trim()
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const rawCity = searchParams.get("city")

  // Sanitize and validate the city parameter
  const city = sanitizeCity(rawCity)

  if (!city) {
    return NextResponse.json({ error: "Valid city parameter is required" }, { status: 400 })
  }

  try {
    // Properly encode the city name for the API request
    const encodedCity = encodeURIComponent(city)

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${encodedCity}&appid=${API_KEY}`,
    )

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "City not found" }, { status: 404 })
      }
      return NextResponse.json(
        { error: `Weather API error: ${response.status} ${response.statusText}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching forecast data:", error)
    return NextResponse.json({ error: "Failed to fetch forecast data" }, { status: 500 })
  }
}
