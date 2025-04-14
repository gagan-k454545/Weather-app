"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState } from "react"

export default function HourlyForecast({ forecast }) {
  const scrollContainerRef = useRef(null)
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(true)

  if (!forecast || !forecast.list) {
    return null
  }

  // Get the next 24 hours of forecast (8 items, 3 hours each)
  const hourlyData = forecast.list.slice(0, 8)

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftScroll(scrollLeft > 0)
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  return (
    <Card className="mb-6 hover-lift">
      <CardHeader className="pb-2 px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl">Hourly Forecast</CardTitle>
      </CardHeader>
      <CardContent className="relative px-2 sm:px-6">
        {/* Left scroll button */}
        {showLeftScroll && (
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full p-1 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {/* Right scroll button */}
        {showRightScroll && (
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full p-1 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={checkScrollButtons}
          className="flex overflow-x-auto pb-2 gap-2 sm:gap-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {hourlyData.map((item, index) => {
            const time = new Date(item.dt * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })

            return (
              <motion.div
                key={item.dt}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex-shrink-0 w-[80px] sm:w-[100px] bg-gray-50 dark:bg-gray-800 rounded-lg p-2 sm:p-3 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm"
              >
                <p className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">{time}</p>
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1 sm:mb-2">
                  <Image
                    src={`/img/${getWeatherIcon(item.weather[0].main)}.png`}
                    alt={item.weather[0].description}
                    fill
                    className="object-contain drop-shadow-md"
                    onError={(e) => {
                      // Fallback to emoji if image fails to load
                      e.currentTarget.style.display = "none"
                      const parent = e.currentTarget.parentElement
                      if (parent) {
                        const fallback = document.createElement("div")
                        fallback.className = "text-xl sm:text-2xl"
                        fallback.textContent = getWeatherEmoji(item.weather[0].main)
                        parent.appendChild(fallback)
                      }
                    }}
                  />
                </div>
                <p className="text-base sm:text-lg font-bold">{Math.round(item.main.temp)}°</p>
                <p className="text-xs text-muted-foreground">{item.weather[0].main}</p>
              </motion.div>
            )
          })}
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
