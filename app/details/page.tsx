"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Search } from "lucide-react"
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

// Common city name corrections and suggestions
const CITY_SUGGESTIONS = {
  MANGLURU: "Mangaluru",
  MANGALOR: "Mangaluru",
  MANGALORE: "Mangaluru",
  BANGLORE: "Bengaluru",
  BANGALORE: "Bengaluru",
  MUMBAY: "Mumbai",
  BOMBAY: "Mumbai",
  DILLI: "Delhi",
  "NEW DELI": "New Delhi",
  MADRAS: "Chennai",
  CALCUTTA: "Kolkata",
  HYDRABAD: "Hyderabad",
  COCHIN: "Kochi",
  MYSORE: "Mysuru",
  // Add more common misspellings as needed
}

// Function to get city suggestions
const getCitySuggestions = (cityName) => {
  if (!cityName) return []

  // Normalize the city name for comparison
  const normalizedCity = cityName.toUpperCase().trim()

  // Check for direct matches in our suggestions map
  if (CITY_SUGGESTIONS[normalizedCity]) {
    return [CITY_SUGGESTIONS[normalizedCity]]
  }

  // Check for partial matches
  const suggestions = []
  for (const [misspelled, correct] of Object.entries(CITY_SUGGESTIONS)) {
    if (misspelled.includes(normalizedCity) || normalizedCity.includes(misspelled)) {
      suggestions.push(correct)
    }
  }

  // Add some popular cities as fallback suggestions
  if (suggestions.length === 0) {
    return ["Bengaluru", "Mumbai", "Delhi", "Chennai", "Kolkata"]
  }

  return suggestions
}

export default function WeatherDetails() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Sanitize the city name to remove any problematic characters
  const sanitizeCity = (cityName) => {
    if (!cityName) return ""

    // Remove any backslashes, quotes, and other potentially problematic characters
    return cityName.replace(/[\\'"<>]/g, "").trim()
  }

  const rawCity = searchParams.get("city")
  const city = sanitizeCity(rawCity)

  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const fetchWeatherData = async () => {
      // If no city parameter is provided, show an error
      if (!city) {
        setError("Please specify a valid city to view weather details")
        setLoading(false)
        return
      }

      // Check if city name is too short (less than 2 characters)
      if (city.trim().length < 2) {
        setError(`"${city}" is too short to be a valid city name. Please enter at least 2 characters.`)
        setLoading(false)
        return
      }

      try {
        // Properly encode the city name for the API request
        const encodedCity = encodeURIComponent(city)

        // Fetch current weather
        const weatherResponse = await fetch(`/api/weather?city=${encodedCity}`)

        if (!weatherResponse.ok) {
          if (weatherResponse.status === 404) {
            // Get suggestions for the city
            const citySuggestions = getCitySuggestions(city)
            setSuggestions(citySuggestions)

            throw new Error(`City "${city}" not found. Did you mean ${citySuggestions.join(", ")}?`)
          } else {
            throw new Error(`Failed to fetch weather data: ${weatherResponse.statusText}`)
          }
        }

        const weatherData = await weatherResponse.json()

        // Fetch forecast
        const forecastResponse = await fetch(`/api/weather/forecast?city=${encodedCity}`)

        if (!forecastResponse.ok) {
          console.error("Forecast fetch failed:", forecastResponse.statusText)
          // Continue with just the weather data if forecast fails
        } else {
          const forecastData = await forecastResponse.json()
          setForecastData(forecastData)
        }

        setWeatherData(weatherData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching weather data:", error)
        setError(error.message || "Failed to fetch weather data. Please try a different city.")
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [city])

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

  const handleSearch = async (e) => {
    e.preventDefault()

    if (!searchInput.trim() || searchInput.trim().length < 2) {
      setError("Please enter a valid city name (at least 2 characters)")
      return
    }

    try {
      // Sanitize the search input
      const sanitizedInput = sanitizeCity(searchInput)

      // Save search to localStorage
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
    }
  }

  if (loading) {
    return <LoadingSpinner message={`Loading weather data for ${city}...`} />
  }

  // If there's no city parameter or an error occurred
  if (!city || error) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => router.push("/")} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
          >
            {error || "Please specify a valid city to view weather details"}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover-lift"
          >
            <div className="text-center mb-6">
              <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Search for a City</h3>
              <p className="text-muted-foreground mb-6">Enter a valid city name below to view its weather details.</p>
            </div>

            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter city name..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">Examples: London, New York, Tokyo, Mumbai, Sydney</div>
            </form>

            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ delay: 0.4 }}
                className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
              >
                <h4 className="font-medium mb-2">Did you mean?</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={suggestion}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          saveSearchToLocalStorage(suggestion)
                          router.push(`/details?city=${encodeURIComponent(suggestion)}`)
                        }}
                        className="hover:bg-primary/10"
                      >
                        {suggestion}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ delay: 0.6 }}
              className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <h4 className="font-medium mb-2">Popular Cities</h4>
              <div className="flex flex-wrap gap-2">
                {["Bengaluru", "Mumbai", "New Delhi", "Mangaluru", "Chennai", "Kolkata"].map((popularCity, index) => (
                  <motion.div
                    key={popularCity}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        saveSearchToLocalStorage(popularCity)
                        router.push(`/details?city=${encodeURIComponent(popularCity)}`)
                      }}
                      className="hover:bg-primary/10"
                    >
                      {popularCity}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </PageTransition>
    )
  }

  // Replace the return statement (after the error handling) with this enhanced UI
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

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
                  <h2 className="text-lg sm:text-xl font-semibold mb-4">Weather Details</h2>
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
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-muted-foreground">Coordinates</span>
                      <span className="text-sm sm:text-base font-semibold">
                        {weatherData.coord.lat.toFixed(2)}, {weatherData.coord.lon.toFixed(2)}
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
      </div>
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
