"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, Search } from "lucide-react"
import LoadingSpinner from "@/components/loading-spinner"
import { getSearchesFromLocalStorage } from "@/lib/client-storage"

export default function SearchHistory() {
  const [searches, setSearches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [usingLocalStorage, setUsingLocalStorage] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        // Try to fetch from API first
        const response = await fetch("/api/searches")

        if (!response.ok) {
          throw new Error(`Failed to fetch search history: ${response.status}`)
        }

        const data = await response.json()

        // Ensure data is an array
        if (Array.isArray(data) && data.length > 0) {
          setSearches(data)
        } else {
          console.log("No data from API or empty array, trying localStorage")

          // Try to get from localStorage as fallback
          const localSearches = getSearchesFromLocalStorage()
          if (localSearches.length > 0) {
            setSearches(localSearches)
            setUsingLocalStorage(true)
          } else {
            setSearches([])
          }
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching search history:", error)

        // Try to get from localStorage as fallback
        const localSearches = getSearchesFromLocalStorage()
        if (localSearches.length > 0) {
          setSearches(localSearches)
          setUsingLocalStorage(true)
          setError("Using locally stored search history")
        } else {
          setSearches([])
          setError("No search history found")
        }

        setLoading(false)
      }
    }

    fetchSearchHistory()
  }, [])

  const handleCityClick = (city) => {
    router.push(`/details?city=${city}`)
  }

  if (loading) {
    return <LoadingSpinner message="Loading search history..." />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search History</h1>

      {usingLocalStorage && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg mb-6">
          Using locally stored search history. Database connection unavailable.
        </div>
      )}

      {error && !usingLocalStorage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
      )}

      {searches.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
          <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No search history yet</h3>
          <p className="text-muted-foreground mb-4">Your search history will appear here once you search for cities.</p>
          <Button onClick={() => router.push("/")}>Search Cities</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searches.map((search, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleCityClick(search.city)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {search.city}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  {new Date(search.timestamp).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
