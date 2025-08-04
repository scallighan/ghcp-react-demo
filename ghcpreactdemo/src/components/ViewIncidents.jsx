import { Link } from 'react-router-dom'
import './ViewIncidents.css'

function ViewIncidents({ incidents }) {
  if (incidents.length === 0) {
    return (
      <div className="view-incidents">
        <div className="header">
          <Link to="/" className="back-button">← Back to Home</Link>
          <h1>Safety Incidents</h1>
        </div>
        <div className="no-incidents">
          <p>No incidents have been reported yet.</p>
          <Link to="/report-incident" className="report-button">
            Report First Incident
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="view-incidents">
      <div className="header">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h1>Safety Incidents ({incidents.length})</h1>
      </div>

      <div className="flex flex-col gap-3">
        {incidents.map((incident) => (
          <div key={incident.id} className="incident-card">
            <div className="flex justify-between items-center incident-header">
              <h3>Incident #{incident.id}</h3>
              <span className="incident-date">
                {incident.date} at {incident.time}
              </span>
            </div>
            
            <div className="incident-details">
              <div className="grid grid-cols-auto gap-2 mb-3">
                <div className="detail-item">
                  <strong>Location:</strong> {incident.location}
                </div>
                <div className="detail-item">
                  <strong>People Involved:</strong> {incident.peopleInvolved}
                </div>
                <div className="detail-item">
                  <strong>People Injured:</strong> {incident.peopleInjured}
                </div>
              </div>
              
              <div className="incident-summary mb-2">
                <strong>Summary:</strong>
                <p>{incident.summary}</p>
              </div>
              
              <div className="incident-meta">
                <small>Reported: {new Date(incident.reportedAt).toLocaleString()}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewIncidents
