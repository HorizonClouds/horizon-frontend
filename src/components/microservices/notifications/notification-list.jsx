import { useEffect, useState } from 'react'
import { getAllNotifications, markNotificationAsSeen } from '../../../services/microservices/notificationService.js'
import NotificationItem from './notification-item'
import { toast } from 'sonner'

export function NotificationsList() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const data = await getAllNotifications()
      setNotifications(data || [])
    } catch (error) {
      console.error('Error fetching notifications:', error)
      toast.error('Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsSeen = async (notificationId) => {
    try {
      await markNotificationAsSeen(notificationId)
      setNotifications(notifications.map(notification =>
        notification._id === notificationId
          ? { ...notification, notificationStatus: 'SEEN' }
          : notification
      ))
    } catch (error) {
      console.error('Error marking notification as seen:', error)
      toast.error('Failed to mark notification as seen')
    }
  }

  const handleDelete = (notificationId) => {
    setNotifications(notifications.filter(n => n._id !== notificationId))
  }

  if (loading) {
    return <div>Loading notifications...</div>
  }

  if (!notifications.length) {
    return <div>No notifications</div>
  }

  return (
    <div className="space-y-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification._id}
          notification={notification}
          onSeen={handleMarkAsSeen}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}

