import { Link, NavLink, Outlet } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

const navItems = [
  { label: 'Overview', to: '/dashboard' },
  { label: 'Activities', to: '/dashboard/activities' },
  { label: 'Messages', to: '/dashboard/notifications' },
  { label: 'Camps', to: '/dashboard/camps' },
  { label: 'Profile', to: '/dashboard/profile' },
]

const DashboardLayout = () => {
  const { user, logout } = useAuthStore()
  const isAdmin = user?.role === 'admin'

  return (
    <div className="dashboard">
      <aside>
        <div className="brand">
          <span>NCC Connect</span>
          <p>{user?.college || 'All India NCC'}</p>
        </div>
        <nav>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/dashboard'}>
              {item.label}
            </NavLink>
          ))}
          {isAdmin && <NavLink to="/dashboard/admin">Admin</NavLink>}
        </nav>
        <div className="aside__footer">
          <p>
            Logged in as <strong>{user?.name}</strong>
          </p>
          <button className="btn btn-secondary" onClick={logout}>
            Logout
          </button>
        </div>
      </aside>
      <main>
        <header className="dashboard__header">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1>Welcome back, {user?.name?.split(' ')[0] || 'Cadet'} 👋</h1>
          </div>
          <Link to="/dashboard/notifications" className="pill">
            {user?.role === 'cadet' ? 'Cadet view' : user?.role?.toUpperCase()}
          </Link>
        </header>
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout

