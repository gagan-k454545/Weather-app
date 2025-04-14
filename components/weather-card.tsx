import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function WeatherCard({ city, temperature, condition }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex justify-between items-center p-4">
          <div>
            <h3 className="text-lg font-semibold">{city}</h3>
            <p className="text-3xl font-bold">{temperature}°</p>
          </div>
          <div className="relative w-16 h-16">
            <Image
              src={`/img/${getWeatherIcon(condition)}.png`}
              alt={condition}
              fill
              className="object-contain"
              onError={(e) => {
                // Fallback to emoji if image fails to load
                e.currentTarget.style.display = "none"
                const parent = e.currentTarget.parentElement
                if (parent) {
                  const fallback = document.createElement("div")
                  fallback.className = "text-3xl"
                  fallback.textContent = getWeatherEmoji(condition)
                  parent.appendChild(fallback)
                }
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function getWeatherIcon(condition) {
  const conditionLower = condition.toLowerCase()
  if (conditionLower === "rain") return "rain"
  if (conditionLower === "clear") return "sun"
  if (conditionLower === "snow") return "snow"
  if (conditionLower === "clouds" || conditionLower === "smoke") return "cloud"
  if (conditionLower === "mist" || conditionLower === "fog") return "mist"
  if (conditionLower === "haze") return "haze"
  return "sun" // default
}

function getWeatherEmoji(condition) {
  const conditionLower = condition.toLowerCase()
  if (conditionLower === "rain") return "🌧️"
  if (conditionLower === "clear") return "☀️"
  if (conditionLower === "snow") return "❄️"
  if (conditionLower === "clouds" || conditionLower === "smoke") return "☁️"
  if (conditionLower === "mist" || conditionLower === "fog") return "🌫️"
  if (conditionLower === "haze") return "🌫️"
  return "☀️" // default
}
