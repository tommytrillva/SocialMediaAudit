import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import PDFReport from './PDFReport'

function AuditReport({ data, onNewAudit }) {
  const [downloading, setDownloading] = useState(false)

  const getGradeClass = (grade) => {
    const letter = grade.charAt(0).toUpperCase()
    return `grade-${letter.toLowerCase()}`
  }

  const handleDownloadPDF = async () => {
    setDownloading(true)
    try {
      const blob = await pdf(<PDFReport data={data} />).toBlob()
      const fileName = `${data.formData.businessName.replace(/[^a-zA-Z0-9]/g, '_')}_Social_Media_Audit.pdf`
      saveAs(blob, fileName)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="report-container">
      <div className="report-header">
        <h2>Social Media Audit Report</h2>
        <p>{data.formData.businessName} | {data.formData.industry}</p>
        <div className={`score-badge ${getGradeClass(data.overallGrade)}`}>
          {data.overallGrade}
        </div>
        <p>Overall Score: {data.overallScore}/100</p>
      </div>

      <div className="report-section">
        <h3>Profile Optimization</h3>
        <p>{data.profileOptimization}</p>
      </div>

      <div className="report-section">
        <h3>Content Review</h3>
        <p>{data.contentReview}</p>
      </div>

      <div className="report-section">
        <h3>Engagement Signals</h3>
        <p>{data.engagementSignals}</p>
      </div>

      <div className="report-section">
        <h3>Competitor Gap Analysis</h3>
        <p>{data.competitorGap}</p>
      </div>

      <div className="report-section quick-wins">
        <h3>Quick Wins - Actionable Recommendations</h3>
        <ul>
          {data.quickWins.map((win, index) => (
            <li key={index}>{win}</li>
          ))}
        </ul>
      </div>

      <div className="action-buttons">
        <button
          className="download-btn"
          onClick={handleDownloadPDF}
          disabled={downloading}
        >
          {downloading ? 'Generating PDF...' : 'Download PDF Report'}
        </button>
        <button className="new-audit-btn" onClick={onNewAudit}>
          Start New Audit
        </button>
      </div>
    </div>
  )
}

export default AuditReport
