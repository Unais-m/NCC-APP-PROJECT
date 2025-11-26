import { useCallback, useEffect, useMemo, useState } from 'react'
import api from '../api/client'

const AdminDashboard = () => {
  const [cadets, setCadets] = useState([])
  const [stats, setStats] = useState({ cadets: 0, activities: 0, camps: 0 })
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const query = useMemo(() => search.trim(), [search])

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [cadetsRes, statsRes] = await Promise.all([
        api.get(`/admin/cadets${query ? `?search=${encodeURIComponent(query)}` : ''}`),
        api.get('/admin/stats'),
      ])
      setCadets(cadetsRes.data.cadets || [])
      setStats(statsRes.data.stats || {})
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }, [query])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleRoleChange = async (cadetId, nextRole) => {
    await api.patch(`/admin/cadets/${cadetId}/role`, { role: nextRole })
    setCadets((prev) => prev.map((cadet) => (cadet._id === cadetId ? { ...cadet, role: nextRole } : cadet)))
  }

  return (
    <section className="panel">
      <header>
        <div>
          <h3>Admin control room</h3>
          <p>Manage cadet access, approvals, and communications.</p>
        </div>
        <button className="btn btn-secondary" onClick={fetchData} disabled={loading}>
          Refresh
        </button>
      </header>

      <div className="stat-grid">
        <article className="stat-card">
          <p>Total cadets</p>
          <h3>{stats.cadets || 0}</h3>
        </article>
        <article className="stat-card">
          <p>Activities logged</p>
          <h3>{stats.activities || 0}</h3>
        </article>
        <article className="stat-card">
          <p>Active camps</p>
          <h3>{stats.camps || 0}</h3>
        </article>
      </div>

      <div className="admin-grid">
        <article>
          <div className="table-toolbar">
            <h4>Cadet roster</h4>
            <input
              placeholder="Search by name, email, or roll no."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          {error && <p className="form-message">{error}</p>}
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>College / Unit</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {cadets.map((cadet) => (
                  <tr key={cadet._id}>
                    <td>{cadet.name}</td>
                    <td>{cadet.email}</td>
                    <td>{cadet.college || cadet.unit || '—'}</td>
                    <td>
                      <select value={cadet.role} onChange={(event) => handleRoleChange(cadet._id, event.target.value)}>
                        <option value="cadet">Cadet</option>
                        <option value="ano">ANO / Officer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loading && <p>Loading roster…</p>}
          </div>
        </article>

        <article>
          <h4>Quick actions</h4>
          <div className="quick-actions">
            <button className="btn btn-primary btn-small">Broadcast notice</button>
            <button className="btn btn-secondary btn-small">Generate certificates</button>
            <button className="btn btn-secondary btn-small">View attendance</button>
          </div>
        </article>
      </div>
    </section>
  )
}

export default AdminDashboard

