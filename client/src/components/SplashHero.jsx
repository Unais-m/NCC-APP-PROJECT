import { Link } from 'react-router-dom'

const highlights = [
  { label: 'Activities logged', value: '1.2k+' },
  { label: 'Camp hours tracked', value: '8.4k+' },
  { label: 'Certificates issued', value: '600+' },
]

const SplashHero = () => {
  return (
    <section className="splash">
      <div className="splash__badge">NCC Connect · Smart Training Portal</div>
      <h1>
        Stay mission-ready with a single platform for{' '}
        <span className="text-gradient">cadet performance</span>, camps, and communication.
      </h1>
      <p>
        NCC Connect streamlines registrations, attendance, notifications, and content sharing so cadets,
        ANOs, and administrators can focus on training excellence.
      </p>
      <div className="splash__cta">
        <Link to="/signup" className="btn btn-primary">
          Create cadet account
        </Link>
        <Link to="/login" className="btn btn-secondary">
          Sign in to dashboard
        </Link>
      </div>
      <div className="splash__highlights">
        {highlights.map((item) => (
          <article key={item.label}>
            <span>{item.value}</span>
            <h4>{item.label}</h4>
          </article>
        ))}
      </div>
    </section>
  )
}

export default SplashHero

