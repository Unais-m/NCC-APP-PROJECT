import { useEffect, useState } from 'react'
import api from '../api/client'
import useAuthStore from '../store/useAuthStore'

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
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    if (!enabled) return
    let cancelled = false

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [activitiesRes, notificationsRes, campsRes] = await Promise.all([
          api.get('/activities?limit=5'),
          api.get('/notifications'),
          api.get('/camps'),
        ])

        let summaryData = []
        if (user?._id) {
          try {
            const summaryRes = await api.get(`/activities/summary?cadet=${user._id}`)
            summaryData = summaryRes.data.summary || []
          } catch (err) {
            console.warn('Failed to fetch summary', err)
          }
        }

        if (cancelled) return

        setData({
          activities: activitiesRes.data.activities || [],
          notifications: notificationsRes.data.notifications || [],
          camps: campsRes.data.camps || [],
          stats: transformStats(summaryData),
        })
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message || err.message)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    if (user || enabled) {
      fetchData()
    }

    return () => {
      cancelled = true
    }
  }, [enabled, user?._id])

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

