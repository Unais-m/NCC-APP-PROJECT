const AttendanceWidget = ({ attendanceRate = 0 }) => (
  <section className="panel attendance">
    <header>
      <h3>Attendance tracker</h3>
    </header>
    <div className="attendance__meter">
      <span style={{ '--value': `${attendanceRate}%` }}>{attendanceRate}%</span>
      <div className="bar">
        <div className="bar__fill" style={{ width: `${attendanceRate}%` }} />
      </div>
    </div>
    <p>
      Keep your attendance above <strong>85%</strong> to qualify for upcoming camps and best cadet nominations.
    </p>
    <button className="btn btn-secondary">Mark today&apos;s attendance</button>
  </section>
)

export default AttendanceWidget

