# Social Media Audit Generator

Generate professional PDF audit reports for businesses' social media presence. Perfect for marketing agencies and consultants who want to provide value to prospects.

## Features

- **Input Form**: Collect business name, social media URLs (Instagram, Facebook, TikTok), and industry
- **AI-Powered Analysis**: Uses Claude API to generate professional audit insights
- **Comprehensive Report Sections**:
  - Profile Optimization (bio, profile pic, links, CTAs, highlights)
  - Content Review (posting frequency, content mix, visual consistency)
  - Engagement Signals (comments/likes patterns, response habits)
  - Competitor Gap Analysis (industry-specific insights)
  - Quick Wins (5 actionable recommendations)
  - Overall Score (A-F grade and 0-100 score)
- **PDF Export**: Download branded PDF reports with your agency info
- **Professional Design**: Clean, modern UI ready for client presentations

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **PDF Generation**: @react-pdf/renderer
- **AI Layer**: Claude API (Anthropic)

## Quick Start

### Prerequisites

- Node.js 18+ installed
- Anthropic API key ([get one here](https://console.anthropic.com/))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/SocialMediaAudit.git
   cd SocialMediaAudit
   ```

2. Install all dependencies:
   ```bash
   npm run install:all
   ```

3. Set up your environment:
   ```bash
   cp server/.env.example server/.env
   ```
   Then edit `server/.env` and add your Anthropic API key.

4. Start the development servers:
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your browser

## Project Structure

```
SocialMediaAudit/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuditForm.jsx      # Input form
│   │   │   ├── AuditReport.jsx    # Report display
│   │   │   └── PDFReport.jsx      # PDF template
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── vite.config.js
├── server/                 # Express backend
│   ├── index.js           # API server + Claude integration
│   └── .env.example
├── package.json           # Root package with scripts
└── README.md
```

## API Endpoints

### POST /api/audit
Generate a social media audit report.

**Request Body:**
```json
{
  "businessName": "Joe's Coffee Shop",
  "instagramUrl": "https://instagram.com/joescoffee",
  "facebookUrl": "https://facebook.com/joescoffee",
  "tiktokUrl": "https://tiktok.com/@joescoffee",
  "industry": "Restaurant / Food Service",
  "additionalNotes": "Looking to increase foot traffic",
  "agencyName": "Your Agency",
  "agencyEmail": "hello@agency.com",
  "agencyPhone": "(555) 123-4567"
}
```

**Response:**
```json
{
  "overallScore": 68,
  "overallGrade": "C",
  "profileOptimization": "...",
  "contentReview": "...",
  "engagementSignals": "...",
  "competitorGap": "...",
  "quickWins": ["...", "...", "...", "...", "..."]
}
```

### GET /api/health
Health check endpoint.

## Customization

### Adding Industries
Edit the `INDUSTRIES` array in `client/src/components/AuditForm.jsx` to add or modify industry options.

### Styling
Modify `client/src/index.css` to customize colors and branding. The gradient theme uses `#667eea` and `#764ba2`.

### PDF Template
Edit `client/src/components/PDFReport.jsx` to customize the PDF layout, add your logo, or modify sections.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | Yes |
| `PORT` | Server port (default: 3001) | No |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend in dev mode |
| `npm run dev:client` | Start only the frontend |
| `npm run dev:server` | Start only the backend |
| `npm run build` | Build the frontend for production |
| `npm run start` | Start the production server |
| `npm run install:all` | Install all dependencies |

## How It Works

1. User fills out the audit form with business details and social media URLs
2. Frontend sends data to the Express backend
3. Backend constructs a prompt and calls Claude API
4. Claude analyzes based on industry best practices and returns structured JSON
5. Frontend displays the results and allows PDF download
6. User downloads branded PDF to send to prospects

## Notes

- This tool uses AI analysis based on industry best practices, not actual profile scraping
- The analysis is meant to provide valuable insights and conversation starters
- Always verify recommendations before presenting to clients
- API calls consume Anthropic credits

## License

MIT
