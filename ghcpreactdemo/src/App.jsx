import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import ReportIncident from './components/ReportIncident'
import ViewIncidents from './components/ViewIncidents'
import Analytics from './components/Analytics'
import './App.css'

function App() {
  const [incidents, setIncidents] = useState([])

  const addIncident = (incident) => {
    setIncidents(prev => [...prev, incident])
    console.log('Incident added:', incident)
    console.log('Total incidents:', incidents.length + 1)
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage incidentsCount={incidents.length} />} />
          <Route path="/report-incident" element={<ReportIncident onAddIncident={addIncident} />} />
          <Route path="/view-incidents" element={<ViewIncidents incidents={incidents} />} />
          <Route path="/analytics" element={<Analytics incidents={incidents} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
