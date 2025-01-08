import { NotificationsDropdown } from "../microservices/notifications/notifications-dropdown.jsx"
import { NotificationsList } from "../microservices/notifications/notification-list.jsx"

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <NotificationsDropdown />
        </div>
        <NotificationsList />
      </main>
    </div>
  )
}

