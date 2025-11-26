import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import { useEffect } from 'react'

const ProtectedRoute = ({ roles }) => {
  const { user, bootstrap, bootstrapComplete, loading } = useAuthStore()

  useEffect(() => {
    bootstrap()
  }, [bootstrap])

  if (!bootstrapComplete || loading) {
    return (
      <div className="splash loading">
        <p className="auth__eyebrow">NCC Connect</p>
        <h2>Preparing your dashboard…</h2>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default ProtectedRoute



