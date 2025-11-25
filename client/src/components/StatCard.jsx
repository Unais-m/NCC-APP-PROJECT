const StatCard = ({ label, value, trend }) => (
  <article className="stat-card">
    <p>{label}</p>
    <h3>{value}</h3>
    {trend && <span className={trend > 0 ? 'trend-up' : 'trend-down'}>{trend}% vs last month</span>}
  </article>
)

export default StatCard

