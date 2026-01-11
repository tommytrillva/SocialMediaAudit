import { useState } from 'react'
import AuditForm from './components/AuditForm'
import AuditReport from './components/AuditReport'

function App() {
  const [auditData, setAuditData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (formData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate audit')
      }

      const data = await response.json()
      setAuditData({ ...data, formData })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleNewAudit = () => {
    setAuditData(null)
    setError(null)
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>Social Media Audit Generator</h1>
        <p>Generate professional audit reports for your prospects in seconds</p>
      </header>

      <main className="main-card">
        {!auditData ? (
          <AuditForm
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        ) : (
          <AuditReport
            data={auditData}
            onNewAudit={handleNewAudit}
          />
        )}
      </main>
    </div>
  )
}

export default App
