import { Trash2 } from 'lucide-react'
import { Button } from "../../ui/button"
import { toast } from "sonner"
import analyticsService from '../../../services/microservices/analyticsService.js'

export function DeleteAnalyticButton({ analyticId, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this analytic? This action cannot be undone.')) {
      try {
        await analyticsService.deleteAnalyticById(analyticId)
        toast.success("Analytic deleted successfully")
        if (onDelete) onDelete()
      } catch (error) {
        toast.error("Failed to delete analytic")
      }
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100"
      onClick={handleDelete}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
