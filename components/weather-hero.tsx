"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Cloud, Droplets, Thermometer, Wind } from "lucide-react"
import { motion } from "framer-motion"

interface WeatherHeroProps {
  weatherData: any
}

export default function WeatherHero({ weatherData }: WeatherHeroProps) {
  const [bgImage, setBgImage] = useState("/img/weather-bg-clear.jpg")
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    if (!weatherData) return

    const condition = weatherData.weather[0].main.toLowerCase()
    if (condition.includes("rain") || condition.includes("drizzle")) {
      setBgImage("/img/weather-bg-rain.jpg")
    } else if (condition.includes("cloud")) {
      setBgImage("/img/weather-bg-cloudy.jpg")
    } else if (condition.includes("snow")) {
      setBgImage("/img/weather-bg-snow.jpg")
    } else if (condition.includes("thunder") || condition.includes("storm")) {
      setBgImage("/img/weather-bg-storm.jpg")
    } else if (condition.includes("fog") || condition.includes("mist") || condition.includes("haze")) {
      setBgImage("/img/weather-bg-fog.jpg")
    } else {
      setBgImage("/img/weather-bg-clear.jpg")
    }
  }, [weatherData])

  if (!weatherData) return null

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] rounded-xl overflow-hidden mb-6 bg-gradient-to-b from-blue-400 to-blue-600 shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
      <Image
        src={bgImage || "/placeholder.svg"}
        alt={weatherData.weather[0].description}
        fill
        className={`object-cover transition-opacity duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        priority
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          console.error("Failed to load image:", bgImage)
          setImageLoaded(true) // Show the gradient background if image fails
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70">
        <div className="container mx-auto h-full flex flex-col justify-end p-4 sm:p-6 md:p-8">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-white">
            <div className="flex flex-col md:flex-row md:items-end justify-between">
              <div>
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl sm:text-5xl md:text-7xl font-bold mb-1 sm:mb-2 text-shadow"
                >
                  {weatherData.name}
                </motion.h1>
                <motion.p variants={itemVariants} className="text-lg sm:text-xl md:text-2xl opacity-90 mb-3 sm:mb-4">
                  {weatherData.sys.country}
                </motion.p>
                <motion.div variants={itemVariants} className="flex items-center gap-3 sm:gap-4">
                  <div className="flex items-center">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 mr-2">
                      <Image
                        src={`/img/${getWeatherIcon(weatherData.weather[0].main)}.png`}
                        alt={weatherData.weather[0].description}
                        fill
                        className="object-contain drop-shadow-lg"
                        onError={(e) => {
                          // Fallback to emoji if image fails to load
                          e.currentTarget.style.display = "none"
                          const parent = e.currentTarget.parentElement
                          if (parent) {
                            const fallback = document.createElement("div")
                            fallback.className = "text-4xl"
                            fallback.textContent = getWeatherEmoji(weatherData.weather[0].main)
                            parent.appendChild(fallback)
                          }
                        }}
                      />
                    </div>
                    <span className="text-3xl sm:text-4xl md:text-6xl font-bold text-shadow">
                      {Math.round(weatherData.main.temp)}°
                    </span>
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl capitalize">{weatherData.weather[0].description}</p>
                    <p className="text-sm sm:text-base opacity-80">
                      Feels like {Math.round(weatherData.main.feels_like)}°
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-4 md:mt-0 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:gap-4">
                <motion.div
                  variants={itemVariants}
                  className="glass p-2 sm:p-3 rounded-lg flex items-center hover:bg-white/30 transition-colors"
                >
                  <Wind className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <div>
                    <p className="text-xs sm:text-sm opacity-80">Wind</p>
                    <p className="text-sm sm:text-base font-medium">{Math.round(weatherData.wind.speed)} m/s</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="glass p-2 sm:p-3 rounded-lg flex items-center hover:bg-white/30 transition-colors"
                >
                  <Droplets className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <div>
                    <p className="text-xs sm:text-sm opacity-80">Humidity</p>
                    <p className="text-sm sm:text-base font-medium">{weatherData.main.humidity}%</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="glass p-2 sm:p-3 rounded-lg flex items-center hover:bg-white/30 transition-colors"
                >
                  <Cloud className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <div>
                    <p className="text-xs sm:text-sm opacity-80">Clouds</p>
                    <p className="text-sm sm:text-base font-medium">{weatherData.clouds.all}%</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="glass p-2 sm:p-3 rounded-lg flex items-center hover:bg-white/30 transition-colors"
                >
                  <Thermometer className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <div>
                    <p className="text-xs sm:text-sm opacity-80">Pressure</p>
                    <p className="text-sm sm:text-base font-medium">{weatherData.main.pressure} hPa</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
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
