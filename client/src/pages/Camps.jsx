import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import api from '../api/client'
import useAuthStore from '../store/useAuthStore'

const Camps = () => {
  const [camps, setCamps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        setLoading(true)
        const { data } = await api.get('/camps')
        setCamps(data.camps || [])
      } catch (err) {
        setError(err.response?.data?.message || err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCamps()
  }, [])

  const handleApply = async (campId) => {
    try {
      await api.post(`/camps/${campId}/apply`)
      setCamps((prev) =>
        prev.map((camp) =>
          camp._id === campId
            ? {
                ...camp,
                applicants: [...(camp.applicants || []), { cadet: user._id, status: 'pending' }],
              }
            : camp
        )
      )
      alert('Application submitted successfully!')
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to apply')
    }
  }

  const hasApplied = (camp) => {
    return camp.applicants?.some((a) => String(a.cadet) === String(user?._id))
  }

  const getApplicationStatus = (camp) => {
    const application = camp.applicants?.find((a) => String(a.cadet) === String(user?._id))
    return application?.status || null
  }

  if (loading) {
    return (
      <section className="panel">
        <p>Loading camps…</p>
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
    <section className="panel">
      <header>
        <h3>Camps</h3>
        <p>Apply for CATC, RDC, and more.</p>
      </header>
      <div className="camp-grid">
        {camps.length === 0 ? (
          <p className="empty-state">No camps available at the moment. Check back soon!</p>
        ) : (
          camps.map((camp) => {
            const applied = hasApplied(camp)
            const status = getApplicationStatus(camp)
            return (
              <article key={camp._id}>
                <h4>{camp.title}</h4>
                <p className="camp-type">{camp.campType || 'General'}</p>
                <p>{camp.description}</p>
                <p className="camp-date">
                  {camp.startDate && dayjs(camp.startDate).format('DD MMM YYYY')} -{' '}
                  {camp.endDate && dayjs(camp.endDate).format('DD MMM YYYY')}
                </p>
                {camp.location && <p className="camp-location">📍 {camp.location}</p>}
                {camp.capacity && <p className="camp-capacity">Capacity: {camp.capacity}</p>}
                {user?.role === 'cadet' && (
                  <button
                    className={`btn ${applied ? 'btn-secondary' : 'btn-primary'} btn-small`}
                    onClick={() => handleApply(camp._id)}
                    disabled={applied}
                  >
                    {applied ? `Applied (${status})` : 'Apply now'}
                  </button>
                )}
              </article>
            )
          })
        )}
      </div>
    </section>
  )
}

export default Camps



