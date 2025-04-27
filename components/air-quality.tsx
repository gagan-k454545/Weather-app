"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wind } from "lucide-react"
import { motion } from "framer-motion"

export default function AirQuality({ aqi }) {
  if (!aqi) return null

  // AQI levels
  const getAqiLevel = (aqi) => {
    if (aqi <= 50) return { level: "Good", color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" }
    if (aqi <= 100) return { level: "Moderate", color: "text-yellow-500", bg: "bg-yellow-100 dark:bg-yellow-900/30" }
    if (aqi <= 150)
      return {
        level: "Unhealthy for Sensitive Groups",
        color: "text-orange-500",
        bg: "bg-orange-100 dark:bg-orange-900/30",
      }
    if (aqi <= 200) return { level: "Unhealthy", color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30" }
    if (aqi <= 300)
      return { level: "Very Unhealthy", color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30" }
    return { level: "Hazardous", color: "text-rose-500", bg: "bg-rose-100 dark:bg-rose-900/30" }
  }

  const aqiInfo = getAqiLevel(aqi)

  // Calculate the percentage for the progress indicator
  const aqiPercentage = Math.min((aqi / 300) * 100, 100)

  return (
    <Card className="hover-lift">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Wind className="mr-2 h-5 w-5" />
          Air Quality
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-lg p-4 ${aqiInfo.bg}`}
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-sm text-muted-foreground">Air Quality Index</p>
              <p className={`text-2xl font-bold ${aqiInfo.color}`}>{aqi}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Level</p>
              <p className={`font-medium ${aqiInfo.color}`}>{aqiInfo.level}</p>
            </div>
          </div>

          {/* AQI Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
            <motion.div
              className={`h-2.5 rounded-full ${getProgressColor(aqi)}`}
              initial={{ width: 0 }}
              animate={{ width: `${aqiPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>

          {/* AQI Scale */}
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>Good</span>
            <span>Moderate</span>
            <span>Unhealthy</span>
            <span>Hazardous</span>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}

function getProgressColor(aqi) {
  if (aqi <= 50) return "bg-green-500"
  if (aqi <= 100) return "bg-yellow-500"
  if (aqi <= 150) return "bg-orange-500"
  if (aqi <= 200) return "bg-red-500"
  if (aqi <= 300) return "bg-purple-500"
  return "bg-rose-500"
}
