import { Link } from 'react-router-dom'
import './HomePage.css'

function HomePage({ incidentsCount }) {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Safety Incident Management System</h1>
        <p>Report and track safety incidents to maintain a safe workplace environment.</p>
        <div className="flex justify-center items-center gap-2 flex-wrap">
          <Link to="/report-incident" className="report-button">
            Report Incident
          </Link>
          <Link to="/view-incidents" className="view-button">
            View Incidents ({incidentsCount || 0})
          </Link>
          <Link to="/analytics" className="analytics-button">
            Analytics
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-auto gap-4">
        <div className="info-card">
          <h3>Quick Reporting</h3>
          <p>Submit incident reports quickly and efficiently with our streamlined form.</p>
        </div>
        <div className="info-card">
          <h3>Secure Storage</h3>
          <p>All incident data is securely stored and managed within the system.</p>
        </div>
        <div className="info-card">
          <h3>Easy Access</h3>
          <p>Access and review incident reports whenever needed.</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
