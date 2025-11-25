import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

const defaultFields = {
  name: '',
  email: '',
  password: '',
  role: 'cadet',
  college: '',
  rollNumber: '',
}

const roleOptions = [
  { label: 'Cadet', value: 'cadet' },
  { label: 'ANO / Officer', value: 'ano' },
  { label: 'Admin', value: 'admin' },
]

const AuthForm = ({ mode = 'login' }) => {
  const [formData, setFormData] = useState(defaultFields)
  const [message, setMessage] = useState(null)
  const { login, signup, loading, error } = useAuthStore()

  const isSignup = mode === 'signup'

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage(null)
    try {
      if (isSignup) {
        await signup(formData)
        setMessage('Account created successfully!')
      } else {
        await login({ email: formData.email, password: formData.password })
      }
    } catch (err) {
      setMessage(err.message)
    }
  }

  return (
    <section className="auth">
      <div className="auth__card">
        <header>
          <p className="auth__eyebrow">NCC Connect</p>
          <h2>{isSignup ? 'Create your cadet profile' : 'Welcome back, cadet'}</h2>
          <p>Access attendance, messages, and training tools in seconds.</p>
        </header>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="grid-2">
              <label>
                Full name
                <input name="name" value={formData.name} onChange={handleChange} required />
              </label>
              <label>
                Roll number
                <input name="rollNumber" value={formData.rollNumber} onChange={handleChange} />
              </label>
            </div>
          )}

          <label>
            Email
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>

          <label>
            Password
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </label>

          {isSignup && (
            <>
              <div className="grid-2">
                <label>
                  College / Unit
                  <input name="college" value={formData.college} onChange={handleChange} />
                </label>
                <label>
                  Role
                  <select name="role" value={formData.role} onChange={handleChange}>
                    {roleOptions.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </>
          )}

          <button className="btn btn-primary" disabled={loading}>
            {loading ? 'Please wait…' : isSignup ? 'Sign up' : 'Log in'}
          </button>
          {(message || error) && <p className="form-message">{message || error}</p>}
        </form>

        <footer>
          {isSignup ? (
            <p>
              Already registered? <Link to="/login">Sign in</Link>
            </p>
          ) : (
            <p>
              Need an account? <Link to="/signup">Create one</Link>
            </p>
          )}
        </footer>
      </div>
    </section>
  )
}

export default AuthForm

