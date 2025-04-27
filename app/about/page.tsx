import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CloudSun, Code, Database, Server } from "lucide-react"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Weather App</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CloudSun className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Weather App</CardTitle>
            <CardDescription>A full-stack weather application built with modern web technologies</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This weather application provides real-time weather information for your current location and allows you
              to search for weather data in cities around the world. The app features a clean, responsive design and
              provides detailed weather information including temperature, humidity, wind speed, and more.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Code className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Features</CardTitle>
            <CardDescription>Key features and functionality</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Current location weather detection</li>
              <li>City search functionality</li>
              <li>Detailed weather information</li>
              <li>5-day weather forecast</li>
              <li>Search history tracking</li>
              <li>Responsive design for all devices</li>
              <li>Dark mode support</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">Technical Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <Server className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Frontend</CardTitle>
            <CardDescription>Technologies used for the user interface</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>
                <strong>Next.js:</strong> React framework for server-rendered applications
              </li>
              <li>
                <strong>Tailwind CSS:</strong> Utility-first CSS framework
              </li>
              <li>
                <strong>shadcn/ui:</strong> Reusable UI components
              </li>
              <li>
                <strong>Lucide React:</strong> Beautiful icons
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Database className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Backend</CardTitle>
            <CardDescription>Server-side technologies and APIs</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>
                <strong>Next.js API Routes:</strong> Serverless functions for backend logic
              </li>
              <li>
                <strong>OpenWeatherMap API:</strong> Weather data provider
              </li>
              <li>
                <strong>API Endpoints:</strong>
                <ul className="list-disc pl-5 mt-2">
                  <li>GET /api/weather?city=XYZ</li>
                  <li>GET /api/weather/current</li>
                  <li>GET /api/weather/forecast</li>
                  <li>POST /api/search</li>
                  <li>GET /api/searches</li>
                </ul>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">How Weather Data is Fetched</h2>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <p className="text-muted-foreground mb-4">
            This application uses the OpenWeatherMap API to fetch weather data. Here's how it works:
          </p>

          <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
            <li>
              <strong>Current Location Weather:</strong> When you first load the app, it requests permission to access
              your location. If granted, it uses your coordinates to fetch weather data for your current location.
            </li>
            <li>
              <strong>City Search:</strong> When you search for a city, the app sends a request to the OpenWeatherMap
              API to fetch weather data for that city.
            </li>
            <li>
              <strong>Data Processing:</strong> The server processes the API response and formats it for display in the
              user interface.
            </li>
            <li>
              <strong>Forecast Data:</strong> For the 5-day forecast, the app makes a separate API call to fetch
              forecast data and processes it to show daily forecasts.
            </li>
            <li>
              <strong>Search History:</strong> Each search is logged to the server, allowing you to view your search
              history and quickly access previously searched cities.
            </li>
          </ol>
        </CardContent>
      </Card>

      <div className="text-center text-muted-foreground">
        <p>© {new Date().getFullYear()} Weather App. All rights reserved.</p>
        <p className="mt-2">Created for the Web Development Internship Coding Round</p>
      </div>
    </div>
  )
}
