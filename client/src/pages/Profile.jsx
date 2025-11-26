import { useEffect, useState } from 'react'
import useAuthStore from '../store/useAuthStore'
import api from '../api/client'

const Profile = () => {
  const { user, setUser } = useAuthStore()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNumber: '',
    college: '',
    unit: '',
    contactNumber: '',
    batchYear: '',
    rank: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        rollNumber: user.rollNumber || '',
        college: user.college || '',
        unit: user.unit || '',
        contactNumber: user.contactNumber || '',
        batchYear: user.batchYear || '',
        rank: user.rank || '',
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const { data } = await api.put('/auth/me', formData)
      setUser(data.user)
      setMessage('Profile updated successfully!')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <section className="panel">
        <p>Loading profile…</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <header>
        <h3>My Profile</h3>
        <p>Manage your personal information</p>
      </header>

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="grid-2">
          <label>
            Full Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input type="email" name="email" value={formData.email} disabled />
          </label>
        </div>

        <div className="grid-2">
          <label>
            Roll Number
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
            />
          </label>
          <label>
            Rank
            <input type="text" name="rank" value={formData.rank} onChange={handleChange} />
          </label>
        </div>

        <div className="grid-2">
          <label>
            College / Unit
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
            />
          </label>
          <label>
            Unit
            <input type="text" name="unit" value={formData.unit} onChange={handleChange} />
          </label>
        </div>

        <div className="grid-2">
          <label>
            Contact Number
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </label>
          <label>
            Batch Year
            <input
              type="text"
              name="batchYear"
              value={formData.batchYear}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="profile-info">
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Member since:</strong>{' '}
            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving…' : 'Save Changes'}
        </button>

        {message && <p className={`form-message ${message.includes('success') ? 'success' : ''}`}>{message}</p>}
      </form>
    </section>
  )
}

export default Profile

