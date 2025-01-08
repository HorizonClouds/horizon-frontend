import { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import { Button } from "../../ui/button"
import { ScrollArea } from "../../ui/scroll-area"
import { Badge } from "../../ui/badge"
import NotificationItem from "./notification-item"
import { Skeleton } from "../../ui/skeleton"
import { getAllNotifications, markNotificationAsSeen} from '../../../services/microservices/notificationService.js'
import { useNotificationSummary } from '../../../services/microservices/useNotificationSummary.js'

import { toast } from 'sonner'

export function NotificationsDropdown({ userId }) {
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
  
    console.log('[NotificationsDropdown] Rendering with userId:', userId);
  
    const { unseenCount, refresh: refreshSummary, loading: summaryLoading } = useNotificationSummary(userId)
  
    console.log('[NotificationsDropdown] Current unseenCount:', unseenCount);
  
    useEffect(() => {
      console.log('[NotificationsDropdown] Current unseenCount:', unseenCount);
      console.log('[NotificationsDropdown] Current userId:', userId);
    }, [unseenCount, userId]);
  
    useEffect(() => {
      console.log('[NotificationsDropdown] Current unseenCount:', unseenCount);
    }, [unseenCount]);
  
    const fetchNotifications = async () => {
      try {
        setLoading(true)
        const data = await getAllNotifications()
        setNotifications(data || [])
      } catch (error) {
        toast.error("Failed to load notifications")
      } finally {
        setLoading(false)
      }
    }
  
    useEffect(() => {
      if (open) {
        fetchNotifications()
      }
    }, [open])
  
    const handleMarkAsSeen = async (notificationId) => {
      try {
        await markNotificationAsSeen(notificationId);
        setNotifications(notifications.map(notification =>
          notification._id === notificationId
            ? { ...notification, notificationStatus: 'SEEN' }
            : notification
        ));
        // Force refresh summary after marking as seen
        await refreshSummary();
      } catch (error) {
        toast.error("Failed to mark notification as seen");
      }
    };
  
    const handleMarkAllAsSeen = async () => {
      try {
        await Promise.all(
          notifications
            .filter(n => n.notificationStatus === 'NOT SEEN')
            .map(n => markNotificationAsSeen(n._id))
        )
        setNotifications(notifications.map(notification => ({
          ...notification,
          notificationStatus: 'SEEN'
        })))
        refreshSummary()
        toast.success("All notifications marked as seen")
      } catch (error) {
        toast.error("Failed to mark all notifications as seen")
      }
    }
  
    const handleDelete = (notificationId) => {
      setNotifications(notifications.filter(n => n._id !== notificationId))
      refreshSummary()
    }
  
    const groupNotificationsByDate = (notifications) => {
      const groups = notifications.reduce((acc, notification) => {
        const date = new Date(notification.createdAt).toLocaleDateString()
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(notification)
        return acc
      }, {})
  
      return Object.entries(groups).sort((a, b) => new Date(b[0]) - new Date(a[0]))
    }
  
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label={`Notifications ${unseenCount > 0 ? `(${unseenCount} unread)` : ''}`}
          >
            <Bell className="h-5 w-5" />
            {unseenCount > 0 && (
              <Badge 
                variant="default" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
              >
                {unseenCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[380px]">
          <div className="flex items-center justify-between p-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Notifications</h4>
              <p className="text-xs text-muted-foreground">
                You have {unseenCount} unread {unseenCount === 1 ? 'message' : 'messages'}
              </p>
            </div>
            {unseenCount > 0 && (
              <Button
                variant="ghost"
                className="text-xs"
                onClick={handleMarkAllAsSeen}
              >
                Mark all as read
              </Button>
            )}
          </div>
          <ScrollArea className="h-[calc(100vh-8rem)] border-t">
            {loading ? (
              <div className="p-4 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-[72px] w-full" />
                ))}
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No notifications yet
                </p>
              </div>
            ) : (
              <div className="p-2">
                {groupNotificationsByDate(notifications).map(([date, items]) => (
                  <div key={date} className="mb-4">
                    <div className="sticky top-0 bg-background/95 backdrop-blur-sm px-4 py-2 z-10">
                      <h6 className="text-sm font-medium text-muted-foreground">
                        {date === new Date().toLocaleDateString() 
                          ? 'Today' 
                          : date === new Date(Date.now() - 86400000).toLocaleDateString()
                          ? 'Yesterday'
                          : date}
                      </h6>
                    </div>
                    {items.map((notification) => (
                      <NotificationItem
                        key={notification._id}
                        notification={notification}
                        onSeen={handleMarkAsSeen}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

