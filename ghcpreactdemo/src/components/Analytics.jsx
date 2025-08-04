import { Link } from 'react-router-dom'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Scatter, Bar } from 'react-chartjs-2'
import './Analytics.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

function Analytics({ incidents }) {
  // Prepare data for scatter plot (People Involved vs People Injured)
  const scatterData = {
    datasets: [
      {
        label: 'Incidents',
        data: incidents.map((incident, index) => ({
          x: incident.peopleInvolved,
          y: incident.peopleInjured,
          incidentId: incident.id,
          location: incident.location,
          date: incident.date
        })),
        backgroundColor: 'rgba(231, 76, 60, 0.6)',
        borderColor: 'rgba(231, 76, 60, 1)',
        borderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  }

  const scatterOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'People Involved vs People Injured',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        callbacks: {
          title: function(context) {
            const dataPoint = context[0].raw
            return `Incident #${dataPoint.incidentId}`
          },
          label: function(context) {
            const dataPoint = context.raw
            return [
              `Location: ${dataPoint.location}`,
              `Date: ${dataPoint.date}`,
              `People Involved: ${dataPoint.x}`,
              `People Injured: ${dataPoint.y}`
            ]
          }
        }
      }
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Number of People Involved',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        min: 0,
        ticks: {
          stepSize: 1
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of People Injured',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        min: 0,
        ticks: {
          stepSize: 1
        }
      },
    },
  }

  // Prepare data for bar chart showing injury rate by location
  const locationStats = incidents.reduce((acc, incident) => {
    if (!acc[incident.location]) {
      acc[incident.location] = {
        totalIncidents: 0,
        totalInvolved: 0,
        totalInjured: 0
      }
    }
    acc[incident.location].totalIncidents += 1
    acc[incident.location].totalInvolved += incident.peopleInvolved
    acc[incident.location].totalInjured += incident.peopleInjured
    return acc
  }, {})

  const locationLabels = Object.keys(locationStats)
  const injuryRates = locationLabels.map(location => {
    const stats = locationStats[location]
    return stats.totalInvolved > 0 ? (stats.totalInjured / stats.totalInvolved * 100) : 0
  })

  const barData = {
    labels: locationLabels,
    datasets: [
      {
        label: 'Injury Rate (%)',
        data: injuryRates,
        backgroundColor: 'rgba(52, 152, 219, 0.6)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 2,
      },
    ],
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Injury Rate by Location',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const location = context.label
            const stats = locationStats[location]
            return [
              `Injury Rate: ${context.parsed.y.toFixed(1)}%`,
              `Total Incidents: ${stats.totalIncidents}`,
              `Total Involved: ${stats.totalInvolved}`,
              `Total Injured: ${stats.totalInjured}`
            ]
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Location',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Injury Rate (%)',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        min: 0,
        max: 100
      },
    },
  }

  if (incidents.length === 0) {
    return (
      <div className="analytics">
        <div className="header">
          <Link to="/" className="back-button">← Back to Home</Link>
          <h1>Safety Analytics</h1>
        </div>
        <div className="no-data">
          <p>No incident data available for analysis.</p>
          <Link to="/report-incident" className="report-button">
            Report First Incident
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="analytics">
      <div className="header">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h1>Safety Analytics</h1>
        <p>Analyzing {incidents.length} incident{incidents.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="analytics-grid">
        <div className="chart-container">
          <div className="chart-wrapper">
            <Scatter data={scatterData} options={scatterOptions} />
          </div>
          <div className="chart-description">
            <h3>Correlation Analysis</h3>
            <p>
              This scatter plot shows the relationship between the number of people involved 
              in incidents and the number of people injured. Each point represents one incident.
              Hover over points to see incident details.
            </p>
          </div>
        </div>

        {locationLabels.length > 0 && (
          <div className="chart-container">
            <div className="chart-wrapper">
              <Bar data={barData} options={barOptions} />
            </div>
            <div className="chart-description">
              <h3>Location Risk Analysis</h3>
              <p>
                This bar chart shows the injury rate (percentage of involved people who were injured) 
                by location. Higher percentages indicate locations with higher injury rates.
              </p>
            </div>
          </div>
        )}

        <div className="stats-summary">
          <h3>Summary Statistics</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="stat-card">
              <div className="stat-number">{incidents.length}</div>
              <div className="stat-label">Total Incidents</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {incidents.reduce((sum, inc) => sum + inc.peopleInvolved, 0)}
              </div>
              <div className="stat-label">Total People Involved</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {incidents.reduce((sum, inc) => sum + inc.peopleInjured, 0)}
              </div>
              <div className="stat-label">Total People Injured</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {incidents.length > 0 
                  ? ((incidents.reduce((sum, inc) => sum + inc.peopleInjured, 0) / 
                      incidents.reduce((sum, inc) => sum + inc.peopleInvolved, 0)) * 100).toFixed(1)
                  : 0}%
              </div>
              <div className="stat-label">Overall Injury Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
