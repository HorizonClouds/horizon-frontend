import { Button } from "@/components/ui/button"
import { AlertTriangle } from 'lucide-react'
import { useNavigate } from "react-router-dom"

export function ReportButton({ resourceId }) {
  const navigate = useNavigate()

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700"
      onClick={() => navigate(`/report?type=itinerary&id=${resourceId}`)}
    >
      <AlertTriangle className="h-4 w-4" />
      Report Itinerary
    </Button>
  )
}

