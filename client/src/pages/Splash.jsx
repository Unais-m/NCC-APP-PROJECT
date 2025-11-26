import SplashHero from '../components/SplashHero'

const Splash = () => (
  <div className="shell">
    <SplashHero />
    <section className="features">
      <article>
        <h3>Attendance & activities</h3>
        <p>Log parades, drills, and camps from your phone and keep your hours synced.</p>
      </article>
      <article>
        <h3>Smart notifications</h3>
        <p>Get instant updates for camp approvals, training slots, and new materials.</p>
      </article>
      <article>
        <h3>Admin control</h3>
        <p>Officers manage cadet data, send broadcasts, and download reports within minutes.</p>
      </article>
    </section>
  </div>
)

export default Splash



