import dayjs from 'dayjs'

const NotificationPanel = ({ notifications = [], onMarkRead }) => {
  if (!notifications.length) {
    return (
      <section className="panel">
        <header>
          <h3>Notifications</h3>
        </header>
        <p className="empty-state">No notifications yet.</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <header>
        <h3>Notifications</h3>
        <p>{notifications.length} updates</p>
      </header>
      <ul className="notification-list">
        {notifications.slice(0, 5).map((notification) => (
          <li key={notification._id}>
            <div>
              <p className="notification-type">{notification.type}</p>
              <h4>{notification.message}</h4>
              <p>{dayjs(notification.createdAt).format('DD MMM YYYY, HH:mm')}</p>
            </div>
            {onMarkRead && (
              <button onClick={() => onMarkRead(notification._id)} className="pill">
                Mark read
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default NotificationPanel

