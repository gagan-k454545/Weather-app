"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ForecastSection from "@/components/forecast-section"
import LoadingSpinner from "@/components/loading-spinner"
import { saveSearchToLocalStorage } from "@/lib/client-storage"
import PageTransition from "@/components/page-transition"

// Add these imports at the top
import WeatherHero from "@/components/weather-hero"
import HourlyForecast from "@/components/hourly-forecast"
import WeatherMap from "@/components/weather-map"
import AirQuality from "@/components/air-quality"
import WeatherAlerts from "@/components/weather-alerts"
import { motion } from "framer-motion"

// Helper function to check if geolocation is actually available
const isGeolocationAvailable = () => {
  // Check if navigator exists (for SSR)
  if (typeof navigator === "undefined") return false

  // Check if geolocation exists
  if (!navigator.geolocation) return false

  // Try to detect if geolocation is disabled by permissions policy
  // This is a best-effort check and may not catch all cases
  try {
    // If permissions API is available, we can check directly
    if (navigator.permissions) {
      return true // We'll check the actual permission when we try to use it
    }

    return true // Assume it's available if we can't check
  } catch (e) {
    console.error("Error checking geolocation availability:", e)
    return false
  }
}

// Sanitize the city name to remove any problematic characters
const sanitizeCity = (cityName) => {
  if (!cityName) return ""

  // Remove any backslashes, quotes, and other potentially problematic characters
  return cityName.replace(/[\\'"<>]/g, "").trim()
}

export default function Home() {
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  // Update the DEFAULT_CITY constant to use Bengaluru, Karnataka
  const DEFAULT_CITY = "Bengaluru"

  // Replace the fetchCityWeather function with this improved version that includes better error handling
  const fetchCityWeather = async (city = DEFAULT_CITY) => {
    try {
      setLoading(true)
      setError("")

      // Sanitize the city name
      const sanitizedCity = sanitizeCity(city)
      if (!sanitizedCity) {
        throw new Error("Invalid city name")
      }

      // Properly encode the city name for the API request
      const encodedCity = encodeURIComponent(sanitizedCity)

      // Fetch current weather
      const weatherResponse = await fetch(`/api/weather?city=${encodedCity}`)

      if (!weatherResponse.ok) {
        throw new Error(`Failed to fetch weather for ${sanitizedCity}`)
      }

      const weatherData = await weatherResponse.json()

      // Fetch forecast
      const forecastResponse = await fetch(`/api/weather/forecast?city=${encodedCity}`)

      if (!forecastResponse.ok) {
        throw new Error(`Failed to fetch forecast for ${sanitizedCity}`)
      }

      const forecastData = await forecastResponse.json()

      setWeatherData(weatherData)
      setForecastData(forecastData)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching city weather:", error)
      setError(`Failed to fetch weather data for ${city}. Please try searching for a different city.`)
      setLoading(false)
    }
  }

  useEffect(() => {
    // Default city to show when geolocation is not available
    const DEFAULT_CITY = "Bengaluru"

    // Check if geolocation is available before trying to use it
    if (isGeolocationAvailable()) {
      // Try to use permissions API to check if we have permission first
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then((permissionStatus) => {
            if (permissionStatus.state === "granted" || permissionStatus.state === "prompt") {
              // We have permission or can request it, try to get location
              navigator.geolocation.getCurrentPosition(
                async (position) => {
                  try {
                    const { latitude, longitude } = position.coords

                    // Fetch current weather based on coordinates
                    const weatherResponse = await fetch(`/api/weather/current?lat=${latitude}&lon=${longitude}`)

                    if (!weatherResponse.ok) {
                      throw new Error("Failed to fetch weather by coordinates")
                    }

                    const weatherData = await weatherResponse.json()

                    // Fetch forecast based on the city name we got
                    const forecastResponse = await fetch(
                      `/api/weather/forecast?city=${encodeURIComponent(weatherData.name)}`,
                    )
                    const forecastData = await forecastResponse.json()

                    setWeatherData(weatherData)
                    setForecastData(forecastData)
                    setLoading(false)
                  } catch (error) {
                    console.error("Error fetching weather by coordinates:", error)
                    // Fall back to default city
                    fetchCityWeather(DEFAULT_CITY)
                  }
                },
                (error) => {
                  console.error("Geolocation error:", error)
                  // Fall back to default city
                  fetchCityWeather(DEFAULT_CITY)
                },
                { timeout: 5000 }, // 5 second timeout
              )
            } else {
              // Permission denied, use default city
              console.log("Geolocation permission denied")
              fetchCityWeather(DEFAULT_CITY)
            }
          })
          .catch((error) => {
            console.error("Error checking geolocation permission:", error)
            fetchCityWeather(DEFAULT_CITY)
          })
      } else {
        // Permissions API not available, try geolocation directly
        try {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              // Same code as above for handling position
              try {
                const { latitude, longitude } = position.coords
                const weatherResponse = await fetch(`/api/weather/current?lat=${latitude}&lon=${longitude}`)
                const weatherData = await weatherResponse.json()
                const forecastResponse = await fetch(
                  `/api/weather/forecast?city=${encodeURIComponent(weatherData.name)}`,
                )
                const forecastData = await forecastResponse.json()

                setWeatherData(weatherData)
                setForecastData(forecastData)
                setLoading(false)
              } catch (error) {
                fetchCityWeather(DEFAULT_CITY)
              }
            },
            (error) => {
              fetchCityWeather(DEFAULT_CITY)
            },
            { timeout: 5000 },
          )
        } catch (e) {
          // Any exception means we should use the default city
          console.error("Exception when using geolocation:", e)
          fetchCityWeather(DEFAULT_CITY)
        }
      }
    } else {
      // Geolocation not available at all, use default city immediately
      console.log("Geolocation not available")
      fetchCityWeather(DEFAULT_CITY)
    }
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()

    if (!searchInput.trim()) return

    try {
      setLoading(true)

      // Sanitize the search input
      const sanitizedInput = sanitizeCity(searchInput)
      if (!sanitizedInput) {
        setError("Please enter a valid city name")
        setLoading(false)
        return
      }

      // Save search to localStorage as a fallback
      saveSearchToLocalStorage(sanitizedInput)

      // Try to log search to backend
      try {
        const response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ city: sanitizedInput }),
        })

        if (!response.ok) {
          console.warn("Search API returned non-OK status:", response.status)
        } else {
          const data = await response.json()
          if (data.warning) {
            console.warn("Search API warning:", data.warning)
          }
        }
      } catch (apiError) {
        console.error("Failed to log search to API:", apiError)
        // Continue anyway since we saved to localStorage
      }

      // Navigate to details page for the searched city
      router.push(`/details?city=${encodeURIComponent(sanitizedInput)}`)
    } catch (error) {
      console.error("Search error:", error)
      setError("Failed to search. Please try again.")
      setLoading(false)
    }
  }

  // Format date
  const getCurrentDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const now = new Date()
    return `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`
  }

  if (loading) {
    return <LoadingSpinner message="Fetching weather data..." />
  }

  // Replace the return statement with this enhanced UI
  return (
    <PageTransition>
      <main className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold">Weather App</h1>
            <p className="text-sm sm:text-base text-muted-foreground">{getCurrentDate()}</p>
          </div>
          <form onSubmit={handleSearch} className="flex w-full md:w-auto">
            <Input
              type="text"
              placeholder="Search city..."
              className="w-full md:w-64 h-10"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button type="submit" className="ml-2 h-10">
              <Search className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </form>
        </div>

        {error ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        ) : null}

        {weatherData && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <WeatherHero weatherData={weatherData} />

            {/* Weather Alerts if any */}
            {weatherData.alerts && <WeatherAlerts alerts={weatherData.alerts} />}

            {/* Hourly Forecast */}
            {forecastData && <HourlyForecast forecast={forecastData} />}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 h-full hover-lift">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4">Today's Weather Details</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg text-center"
                    >
                      <p className="text-xs sm:text-sm text-muted-foreground">Feels Like</p>
                      <p className="text-xl sm:text-2xl font-semibold">{Math.round(weatherData.main.feels_like)}°</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg text-center"
                    >
                      <p className="text-xs sm:text-sm text-muted-foreground">Humidity</p>
                      <p className="text-xl sm:text-2xl font-semibold">{weatherData.main.humidity}%</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg text-center"
                    >
                      <p className="text-xs sm:text-sm text-muted-foreground">Wind</p>
                      <p className="text-xl sm:text-2xl font-semibold">{Math.round(weatherData.wind.speed)} m/s</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg text-center"
                    >
                      <p className="text-xs sm:text-sm text-muted-foreground">Pressure</p>
                      <p className="text-xl sm:text-2xl font-semibold">{weatherData.main.pressure} hPa</p>
                    </motion.div>
                  </div>

                  <div className="mt-4 sm:mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg text-center"
                    >
                      <p className="text-xs sm:text-sm text-muted-foreground">Min Temp</p>
                      <p className="text-xl sm:text-2xl font-semibold">{Math.round(weatherData.main.temp_min)}°</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg text-center"
                    >
                      <p className="text-xs sm:text-sm text-muted-foreground">Max Temp</p>
                      <p className="text-xl sm:text-2xl font-semibold">{Math.round(weatherData.main.temp_max)}°</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg text-center"
                    >
                      <p className="text-xs sm:text-sm text-muted-foreground">Visibility</p>
                      <p className="text-xl sm:text-2xl font-semibold">
                        {(weatherData.visibility / 1000).toFixed(1)} km
                      </p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg text-center"
                    >
                      <p className="text-xs sm:text-sm text-muted-foreground">Cloudiness</p>
                      <p className="text-xl sm:text-2xl font-semibold">{weatherData.clouds.all}%</p>
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 hover-lift">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Sun & Moon</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-muted-foreground">Sunrise</span>
                      <span className="text-sm sm:text-base font-semibold">
                        {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-muted-foreground">Sunset</span>
                      <span className="text-sm sm:text-base font-semibold">
                        {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-muted-foreground">Day Length</span>
                      <span className="text-sm sm:text-base font-semibold">
                        {formatDayLength(weatherData.sys.sunset - weatherData.sys.sunrise)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Simulated Air Quality - in a real app, you'd fetch this from an API */}
                <AirQuality aqi={Math.floor(Math.random() * 100) + 1} />
              </div>
            </div>

            {/* Weather Map */}
            {weatherData.coord && <WeatherMap lat={weatherData.coord.lat} lon={weatherData.coord.lon} />}

            {/* 5-Day Forecast */}
            {forecastData && <ForecastSection forecast={forecastData} />}
          </motion.div>
        )}
      </main>
    </PageTransition>
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

// Add this helper function at the bottom of the file
function formatDayLength(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${hours}h ${minutes}m`
}
