"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Cloud, Droplets, Thermometer, Wind } from "lucide-react"

export default function ForecastSection({ forecast }) {
  if (!forecast || !forecast.list) {
    return null
  }

  // Process forecast data to get daily forecasts
  const dailyForecasts = {}

  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0]

    if (!dailyForecasts[date]) {
      const dayName = new Date(date).toLocaleDateString("en-US", { weekday: "short" })
      const fullDay = new Date(date).toLocaleDateString("en-US", { weekday: "long" })
      const dayNum = new Date(date).getDate()
      const month = new Date(date).toLocaleDateString("en-US", { month: "short" })

      dailyForecasts[date] = {
        day: dayName,
        fullDay,
        dayNum,
        month,
        temperature: Math.floor(item.main.temp),
        minTemp: item.main.temp_min,
        maxTemp: item.main.temp_max,
        description: item.weather[0].description,
        weatherCondition: item.weather[0].main.toLowerCase(),
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
        pressure: item.main.pressure,
      }
    } else {
      // Update min/max temperatures if needed
      if (item.main.temp_min < dailyForecasts[date].minTemp) {
        dailyForecasts[date].minTemp = item.main.temp_min
      }
      if (item.main.temp_max > dailyForecasts[date].maxTemp) {
        dailyForecasts[date].maxTemp = item.main.temp_max
      }
    }
  })

  // Convert to array and limit to 5 days
  const forecastArray = Object.values(dailyForecasts).slice(0, 5)

  return (
    <Card className="mb-8">
      <CardHeader className="pb-2 px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {forecastArray.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden"
            >
              <div className="bg-primary/10 p-2 sm:p-3 text-center">
                <p className="font-medium">{day.fullDay}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {day.month} {day.dayNum}
                </p>
              </div>

              <div className="p-3 sm:p-4 text-center">
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-1 sm:mb-2">
                  <Image
                    src={`/img/${getWeatherIcon(day.weatherCondition)}.png`}
                    alt={day.description}
                    fill
                    className="object-contain"
                    onError={(e) => {
                      // Fallback to emoji if image fails to load
                      e.currentTarget.style.display = "none"
                      const parent = e.currentTarget.parentElement
                      if (parent) {
                        const fallback = document.createElement("div")
                        fallback.className = "text-2xl sm:text-3xl"
                        fallback.textContent = getWeatherEmoji(day.weatherCondition)
                        parent.appendChild(fallback)
                      }
                    }}
                  />
                </div>
                <div className="text-xl sm:text-2xl font-bold mb-1">{Math.round(day.temperature)}°</div>
                <div className="flex justify-center gap-2 text-xs sm:text-sm mb-2 sm:mb-3">
                  <span className="text-blue-500">{Math.round(day.minTemp)}°</span>
                  <span>/</span>
                  <span className="text-red-500">{Math.round(day.maxTemp)}°</span>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground capitalize mb-3 sm:mb-4">
                  {day.description}
                </div>

                <div className="grid grid-cols-2 gap-1 sm:gap-2 text-[10px] sm:text-xs">
                  <div className="flex items-center justify-center gap-1">
                    <Wind className="h-3 w-3" />
                    <span>{Math.round(day.windSpeed)} m/s</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Droplets className="h-3 w-3" />
                    <span>{day.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Cloud className="h-3 w-3" />
                    <span>20%</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Thermometer className="h-3 w-3" />
                    <span>{day.pressure} hPa</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function getWeatherIcon(condition) {
  if (condition === "rain") return "rain"
  if (condition === "clear") return "sun"
  if (condition === "snow") return "snow"
  if (condition === "clouds" || condition === "smoke") return "cloud"
  if (condition === "mist" || condition === "fog") return "mist"
  if (condition === "haze") return "haze"
  return "sun" // default
}

function getWeatherEmoji(condition) {
  if (condition === "rain") return "🌧️"
  if (condition === "clear") return "☀️"
  if (condition === "snow") return "❄️"
  if (condition === "clouds" || condition === "smoke") return "☁️"
  if (condition === "mist" || condition === "fog") return "🌫️"
  if (condition === "haze") return "🌫️"
  return "☀️" // default
}
