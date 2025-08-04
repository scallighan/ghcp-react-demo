import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './ReportIncident.css'

function ReportIncident({ onAddIncident }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    time: '',
    date: '',
    location: '',
    peopleInvolved: '',
    peopleInjured: '',
    summary: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate form data
    if (!formData.time || !formData.date || !formData.location || !formData.peopleInvolved || !formData.peopleInjured || !formData.summary) {
      alert('Please fill in all fields')
      return
    }

    // Create incident object with unique ID and timestamp
    const incident = {
      id: Date.now(),
      ...formData,
      reportedAt: new Date().toISOString(),
      peopleInvolved: parseInt(formData.peopleInvolved),
      peopleInjured: parseInt(formData.peopleInjured)
    }

    // Add incident to state
    onAddIncident(incident)

    // Reset form
    setFormData({
      time: '',
      date: '',
      location: '',
      peopleInvolved: '',
      peopleInjured: '',
      summary: ''
    })

    // Show success message and redirect
    alert('Incident reported successfully!')
    navigate('/')
  }

  return (
    <div className="report-incident">
      <div className="header">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h1>Report Safety Incident</h1>
      </div>

      <form onSubmit={handleSubmit} className="incident-form">
        <div className="grid grid-cols-auto gap-3 mb-3">
          <div className="flex flex-col">
            <label htmlFor="date">Date of Incident *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="time">Time of Incident *</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Main Office, Warehouse A, Loading Dock"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="peopleInvolved">Number of People Involved *</label>
            <input
              type="number"
              id="peopleInvolved"
              name="peopleInvolved"
              value={formData.peopleInvolved}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="peopleInjured">Number of People Injured *</label>
            <input
              type="number"
              id="peopleInjured"
              name="peopleInjured"
              value={formData.peopleInjured}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="summary">Incident Summary *</label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Provide a detailed description of what happened, including any contributing factors, immediate actions taken, and current status..."
            rows="6"
            required
          />
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={() => navigate('/')} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Submit Report
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReportIncident
