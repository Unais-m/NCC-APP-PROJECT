import StatCard from '../components/StatCard'
import NotificationPanel from '../components/NotificationPanel'
import ActivityTimeline from '../components/ActivityTimeline'
import AttendanceWidget from '../components/AttendanceWidget'
import CampList from '../components/CampList'
import useDashboardData from '../hooks/useDashboardData'

const Dashboard = () => {
  const { stats, notifications, activities, camps, loading, error } = useDashboardData(true)

  if (loading) {
    return (
      <section className="panel">
        <p>Loading dashboard data…</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="panel error">
        <p>{error}</p>
      </section>
    )
  }

  return (
    <>
      <div className="stat-grid">
        <StatCard label="Total hours logged" value={`${stats.totalHours} hrs`} trend={8} />
        <StatCard label="Activity points" value={stats.totalPoints} trend={5} />
        <StatCard label="Verified activities" value={stats.approvedActivities} trend={2} />
      </div>
      <div className="grid-2 responsive">
        <NotificationPanel notifications={notifications} />
        <ActivityTimeline activities={activities} />
      </div>
      <div className="grid-2 responsive">
        <AttendanceWidget attendanceRate={82} />
        <CampList camps={camps} />
      </div>
    </>
  )
}

export default Dashboard



