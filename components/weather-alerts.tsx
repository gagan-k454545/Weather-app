import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function WeatherAlerts({ alerts }) {
  if (!alerts || alerts.length === 0) return null

  return (
    <Card className="mb-8">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-amber-500">
          <AlertTriangle className="mr-2 h-5 w-5" />
          Weather Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <Alert key={index} variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>{alert.event}</AlertTitle>
              <AlertDescription>
                {alert.description.length > 200 ? `${alert.description.substring(0, 200)}...` : alert.description}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
