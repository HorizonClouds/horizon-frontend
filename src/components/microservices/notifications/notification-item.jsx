import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { MessageSquare, Heart, UserPlus, Map, Flag, Star, MessageCircle, Trash2 } from 'lucide-react'
import { cn } from '../../common/utils/cn.jsx'
import { Button } from '../../ui/button'
import { deleteNotification } from '../../../services/microservices/notificationService.js'
import { toast } from 'sonner'

const icons = {
  'itinerary': Map,
  'report': Flag,
  'itinerary review': Star,
  'likes': Heart,
  'pub comment': MessageCircle,
  'friend request': UserPlus,
  'message': MessageSquare
}

const notificationTypes = {
  'itinerary': 'shared a new itinerary',
  'report': 'reported content requires attention',
  'itinerary review': 'left a review on your itinerary',
  'likes': 'liked your content',
  'pub comment': 'commented on your publication',
  'friend request': 'sent you a friend request',
  'message': 'sent you a message'
}

function NotificationItem({ notification = {}, onSeen, onDelete }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  
  if (!notification || !notification.type) {
    return null
  }

  const Icon = icons[notification.type] || MessageSquare

  const getNotificationText = (type) => {
    return notificationTypes[type] || 'interacted with your content'
  }

  const handleDelete = async (e) => {
    e.stopPropagation() // Prevent triggering the parent onClick
    try {
      setIsDeleting(true)
      await deleteNotification(notification._id)
      onDelete?.(notification._id)
      toast.success('Notification deleted')
    } catch (error) {
      console.error('Error deleting notification:', error)
      toast.error('Failed to delete notification')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div
      className={cn(
        "flex items-start gap-4 p-4 transition-all rounded-lg cursor-pointer group",
        notification.notificationStatus === 'NOT SEEN' ? 'bg-primary/5' : 'hover:bg-muted',
        isHovered && 'bg-muted'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => notification.notificationStatus === 'NOT SEEN' && onSeen?.(notification._id)}
      role="button"
      tabIndex={0}
    >
      <div className={cn(
        "p-2 rounded-full",
        notification.notificationStatus === 'NOT SEEN' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
      )}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm">
          <span className="font-medium">Someone</span>
          {' '}
          {getNotificationText(notification.type)}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {notification.createdAt ? 
              formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true }) :
              'Just now'
            }
          </p>
          {notification.config?.email && (
            <span className="text-xs text-muted-foreground">
              Email notification sent
            </span>
          )}
        </div>
      </div>
      {notification.notificationStatus === 'SEEN' && (
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleDelete}
          disabled={isDeleting}
          aria-label="Delete notification"
        >
          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
        </Button>
      )}
    </div>
  )
}

export default NotificationItem

