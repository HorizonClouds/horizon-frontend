import { Calendar, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function EmptyState({ onUpdate, isUpdating }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
      <Calendar className="h-8 w-8 mb-4" />
      <p className="text-sm">No analytics data available</p>
      <p className="text-xs mt-2 mb-4">Click "Update Analytics" to generate your first report</p>
      <Button 
        onClick={onUpdate}
        disabled={isUpdating}
        variant="outline"
        className="flex items-center gap-2"
      >
        <RefreshCw className={`h-4 w-4 ${isUpdating ? 'animate-spin' : ''}`} />
        {isUpdating ? 'Updating...' : 'Update Analytics'}
      </Button>
    </div>
  )
}
