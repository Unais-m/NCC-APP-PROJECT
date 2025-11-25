import { useEffect, useState } from 'react'
import api from '../api/client'

const initialState = {
  notifications: [],
  activities: [],
  camps: [],
  stats: {
    totalHours: 0,
    totalPoints: 0,
    approvedActivities: 0,
  },
}

const useDashboardData = (enabled = true) => {
  const [data, setData] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!enabled) return
    let cancelled = false

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [activitiesRes, notificationsRes, campsRes, summaryRes] = await Promise.all([
          api.get('/activities?limit=5'),
          api.get('/notifications'),
          api.get('/camps'),
          api.get('/activities/summary'),
        ])

        if (cancelled) return

        setData({
          activities: activitiesRes.data.activities || [],
          notifications: notificationsRes.data.notifications || [],
          camps: campsRes.data.camps || [],
          stats: transformStats(summaryRes.data.summary),
        })
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message || err.message)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [enabled])

  return { ...data, loading, error }
}

const transformStats = (summary = []) => {
  return summary.reduce(
    (acc, item) => {
      acc.totalHours += item.totalHours || 0
      acc.totalPoints += item.totalPoints || 0
      acc.approvedActivities += item.count || 0
      return acc
    },
    { totalHours: 0, totalPoints: 0, approvedActivities: 0 },
  )
}

export default useDashboardData

