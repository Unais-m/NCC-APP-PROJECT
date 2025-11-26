import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import api from '../api/client'
import useAuthStore from '../store/useAuthStore'

const Activities = () => {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    type: 'parade',
    title: '',
    description: '',
    hours: 0,
    date: new Date().toISOString().split('T')[0],
  })
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/activities')
      setActivities(data.activities || [])
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/activities', formData)
      setShowForm(false)
      setFormData({
        type: 'parade',
        title: '',
        description: '',
        hours: 0,
        date: new Date().toISOString().split('T')[0],
      })
      fetchActivities()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create activity')
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: '⏳ Pending',
      approved: '✅ Approved',
      rejected: '❌ Rejected',
    }
    return badges[status] || status
  }

  if (loading) {
    return (
      <section className="panel">
        <p>Loading activities…</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <header>
        <h3>Activity log</h3>
        {user?.role === 'cadet' && (
          <button className="btn btn-primary btn-small" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Log activity'}
          </button>
        )}
      </header>

      {showForm && user?.role === 'cadet' && (
        <form onSubmit={handleSubmit} className="activity-form" style={{ marginBottom: '2rem' }}>
          <h4>Log New Activity</h4>
          <div className="grid-2">
            <label>
              Type
              <select
                name="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              >
                <option value="parade">Parade</option>
                <option value="drill">Drill</option>
                <option value="camp">Camp</option>
                <option value="social">Social</option>
                <option value="training">Training</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label>
              Date
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </label>
          </div>
          <label>
            Title
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </label>
          <label>
            Description
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
            />
          </label>
          <label>
            Hours
            <input
              type="number"
              min="0"
              value={formData.hours}
              onChange={(e) => setFormData({ ...formData, hours: parseFloat(e.target.value) || 0 })}
              required
            />
          </label>
          <button type="submit" className="btn btn-primary">
            Submit Activity
          </button>
        </form>
      )}

      {error && <p className="form-message">{error}</p>}

      {activities.length === 0 ? (
        <p className="empty-state">No activities logged yet. Start logging your activities!</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Title</th>
                <th>Date</th>
                <th>Hours</th>
                <th>Points</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>
                    <span className="badge">{activity.type}</span>
                  </td>
                  <td>
                    <strong>{activity.title}</strong>
                    {activity.description && (
                      <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.25rem' }}>
                        {activity.description.substring(0, 50)}
                        {activity.description.length > 50 ? '...' : ''}
                      </p>
                    )}
                  </td>
                  <td>{dayjs(activity.date).format('DD MMM YYYY')}</td>
                  <td>{activity.hours || 0}</td>
                  <td>{activity.points || 0}</td>
                  <td>{getStatusBadge(activity.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities



