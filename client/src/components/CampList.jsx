import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

const CampList = ({ camps = [] }) => {
  const navigate = useNavigate()
  const recentCamps = camps.slice(0, 3)

  return (
    <section className="panel">
      <header>
        <h3>Upcoming camps</h3>
        <p>Apply and track approvals</p>
      </header>
      {recentCamps.length === 0 ? (
        <p className="empty-state">No active camps. Check back soon!</p>
      ) : (
        <>
          <ul className="camp-list">
            {recentCamps.map((camp) => (
              <li key={camp._id}>
                <div>
                  <h4>{camp.title}</h4>
                  <p>
                    {camp.startDate && dayjs(camp.startDate).format('DD MMM')} -{' '}
                    {camp.endDate && dayjs(camp.endDate).format('DD MMM YYYY')}
                  </p>
                  {camp.location && <p>📍 {camp.location}</p>}
                </div>
                <button
                  className="btn btn-primary btn-small"
                  onClick={() => navigate('/dashboard/camps')}
                >
                  View
                </button>
              </li>
            ))}
          </ul>
          {camps.length > 3 && (
            <button className="btn btn-secondary btn-small" onClick={() => navigate('/dashboard/camps')}>
              View all ({camps.length})
            </button>
          )}
        </>
      )}
    </section>
  )
}

export default CampList



