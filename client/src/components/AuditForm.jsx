import { useState } from 'react'

const INDUSTRIES = [
  'Restaurant / Food Service',
  'Retail / E-commerce',
  'Health & Wellness',
  'Real Estate',
  'Professional Services (Law, Accounting, Consulting)',
  'Beauty & Personal Care',
  'Fitness & Gym',
  'Home Services (Plumbing, HVAC, Cleaning)',
  'Automotive',
  'Travel & Hospitality',
  'Education & Training',
  'Technology / SaaS',
  'Entertainment & Events',
  'Non-Profit',
  'Other',
]

function AuditForm({ onSubmit, loading, error }) {
  const [formData, setFormData] = useState({
    businessName: '',
    instagramUrl: '',
    facebookUrl: '',
    tiktokUrl: '',
    industry: '',
    additionalNotes: '',
    agencyName: '',
    agencyEmail: '',
    agencyPhone: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const isValid = formData.businessName && formData.instagramUrl && formData.industry

  return (
    <form className="form-section" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}

      <h3 className="section-title">Business Information</h3>

      <div className="form-group">
        <label htmlFor="businessName">Business Name *</label>
        <input
          type="text"
          id="businessName"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          placeholder="e.g., Joe's Coffee Shop"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="industry">Industry / Niche *</label>
        <select
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          required
        >
          <option value="">Select an industry...</option>
          {INDUSTRIES.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      </div>

      <h3 className="section-title">Social Media Profiles</h3>

      <div className="form-group">
        <label htmlFor="instagramUrl">Instagram URL *</label>
        <input
          type="url"
          id="instagramUrl"
          name="instagramUrl"
          value={formData.instagramUrl}
          onChange={handleChange}
          placeholder="https://instagram.com/username"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="facebookUrl">
            Facebook URL <span className="optional-tag">(optional)</span>
          </label>
          <input
            type="url"
            id="facebookUrl"
            name="facebookUrl"
            value={formData.facebookUrl}
            onChange={handleChange}
            placeholder="https://facebook.com/pagename"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tiktokUrl">
            TikTok URL <span className="optional-tag">(optional)</span>
          </label>
          <input
            type="url"
            id="tiktokUrl"
            name="tiktokUrl"
            value={formData.tiktokUrl}
            onChange={handleChange}
            placeholder="https://tiktok.com/@username"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="additionalNotes">
          Additional Notes <span className="optional-tag">(optional)</span>
        </label>
        <textarea
          id="additionalNotes"
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          placeholder="Any specific concerns or goals you'd like us to address..."
          rows={3}
        />
      </div>

      <div className="branding-section">
        <h4>Your Agency Branding (for PDF footer)</h4>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="agencyName">Agency Name</label>
            <input
              type="text"
              id="agencyName"
              name="agencyName"
              value={formData.agencyName}
              onChange={handleChange}
              placeholder="Your Marketing Agency"
            />
          </div>
          <div className="form-group">
            <label htmlFor="agencyEmail">Contact Email</label>
            <input
              type="email"
              id="agencyEmail"
              name="agencyEmail"
              value={formData.agencyEmail}
              onChange={handleChange}
              placeholder="hello@youragency.com"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="agencyPhone">Phone Number</label>
          <input
            type="tel"
            id="agencyPhone"
            name="agencyPhone"
            value={formData.agencyPhone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <button type="submit" className="submit-btn" disabled={!isValid || loading}>
        {loading ? (
          <>
            <span className="loading-spinner"></span>
            Analyzing Social Media...
          </>
        ) : (
          'Generate Audit Report'
        )}
      </button>
    </form>
  )
}

export default AuditForm
