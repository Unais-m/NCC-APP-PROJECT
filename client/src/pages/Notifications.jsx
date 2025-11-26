import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import api from '../api/client'
import useAuthStore from '../store/useAuthStore'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const user = useAuthStore((state) => state.user)
  const canCreate = user?.role === 'admin' || user?.role === 'ano'

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/notifications')
      setNotifications(data.notifications || [])
    } catch (err) {
      console.error('Failed to fetch notifications', err)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkRead = async (id) => {
    try {
      await api.post(`/notifications/${id}/read`)
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === id ? { ...notif, isRead: true } : notif
        )
      )
    } catch (err) {
      console.error('Failed to mark as read', err)
    }
  }

  const getTypeIcon = (type) => {
    const icons = {
      info: 'ℹ️',
      alert: '⚠️',
      camp: '🏕️',
      training: '🎓',
    }
    return icons[type] || '📢'
  }

  if (loading) {
    return (
      <section className="panel">
        <p>Loading notifications…</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <header>
        <h3>Message center</h3>
        <p>Stay updated with ANO and admin announcements</p>
      </header>
      {notifications.length === 0 ? (
        <p className="empty-state">No notifications yet. Check back later!</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((notification) => (
            <li key={notification._id} className={notification.isRead ? 'read' : 'unread'}>
              <div>
                <p className="notification-type">
                  {getTypeIcon(notification.type)} {notification.type?.toUpperCase() || 'INFO'}
                </p>
                <h4>{notification.message}</h4>
                <p className="notification-meta">
                  {dayjs(notification.createdAt).format('DD MMM YYYY, HH:mm')}
                </p>
                {notification.attachments && notification.attachments.length > 0 && (
                  <p className="notification-attachments">
                    📎 {notification.attachments.length} attachment(s)
                  </p>
                )}
              </div>
              {!notification.isRead && (
                <button
                  className="pill"
                  onClick={() => handleMarkRead(notification._id)}
                >
                  Mark read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Notifications



