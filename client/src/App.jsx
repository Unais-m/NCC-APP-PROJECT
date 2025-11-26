import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import Splash from './pages/Splash'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Activities from './pages/Activities'
import Notifications from './pages/Notifications'
import Camps from './pages/Camps'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import DashboardLayout from './components/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'
import useAuthStore from './store/useAuthStore'
import './App.css'

function App() {
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    const handler = () => logout()
    window.addEventListener('auth:unauthorized', handler)
    return () => window.removeEventListener('auth:unauthorized', handler)
  }, [logout])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/activities" element={<Activities />} />
            <Route path="/dashboard/notifications" element={<Notifications />} />
            <Route path="/dashboard/camps" element={<Camps />} />
            <Route path="/dashboard/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute roles={['admin']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
