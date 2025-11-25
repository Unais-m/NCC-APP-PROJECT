import dayjs from 'dayjs'

const activityTypeLabels = {
  parade: 'Parade',
  drill: 'Drill',
  camp: 'Camp',
  social: 'Social Service',
  training: 'Training',
  other: 'Other',
}

const ActivityTimeline = ({ activities = [] }) => (
  <section className="panel">
    <header>
      <h3>Recent activity</h3>
      <p>Latest submissions and approvals</p>
    </header>
    {activities.length === 0 ? (
      <p className="empty-state">No activity logged yet.</p>
    ) : (
      <ul className="timeline">
        {activities.slice(0, 5).map((activity) => (
          <li key={activity._id}>
            <div className="timeline__dot" data-status={activity.status} />
            <div>
              <p className="timeline__type">{activityTypeLabels[activity.type] || activity.type}</p>
              <h4>{activity.title}</h4>
              <p>
                {dayjs(activity.date).format('DD MMM YYYY')} · {activity.hours} hrs · {activity.points} pts
              </p>
            </div>
          </li>
        ))}
      </ul>
    )}
  </section>
)

export default ActivityTimeline

