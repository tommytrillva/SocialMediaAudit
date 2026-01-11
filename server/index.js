import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Anthropic from '@anthropic-ai/sdk'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Generate audit analysis using Claude
async function generateAuditAnalysis(formData) {
  const prompt = buildAnalysisPrompt(formData)

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const responseText = message.content[0].text
  return parseAuditResponse(responseText)
}

function buildAnalysisPrompt(formData) {
  const platforms = []
  if (formData.instagramUrl) platforms.push(`Instagram: ${formData.instagramUrl}`)
  if (formData.facebookUrl) platforms.push(`Facebook: ${formData.facebookUrl}`)
  if (formData.tiktokUrl) platforms.push(`TikTok: ${formData.tiktokUrl}`)

  return `You are an expert social media marketing consultant conducting a professional audit for a business. Analyze the following business's social media presence and provide a comprehensive audit report.

BUSINESS INFORMATION:
- Business Name: ${formData.businessName}
- Industry: ${formData.industry}
- Social Media Profiles:
${platforms.join('\n')}
${formData.additionalNotes ? `- Additional Notes: ${formData.additionalNotes}` : ''}

Based on best practices for the ${formData.industry} industry and general social media marketing principles, provide a detailed audit. Since you cannot access the actual profiles, base your analysis on:
1. Industry benchmarks and best practices
2. Common issues businesses in this industry face
3. Platform-specific optimization strategies
4. What successful competitors typically do

Provide your response in the following JSON format (and ONLY the JSON, no other text):

{
  "overallScore": <number 0-100>,
  "overallGrade": "<A, B, C, D, or F>",
  "profileOptimization": "<2-3 paragraph analysis of profile optimization opportunities including bio, profile picture, links, CTAs, and highlights. Be specific to the industry.>",
  "contentReview": "<2-3 paragraph analysis of content strategy recommendations including posting frequency, content mix, visual consistency, and content types. Be specific to the industry.>",
  "engagementSignals": "<2-3 paragraph analysis of engagement best practices including comment/like patterns, response habits, community building, and engagement tactics. Be specific to the industry.>",
  "competitorGap": "<2-3 paragraph analysis of what competitors in this industry typically do well that this business should implement. Include specific examples relevant to the industry.>",
  "quickWins": [
    "<actionable recommendation 1>",
    "<actionable recommendation 2>",
    "<actionable recommendation 3>",
    "<actionable recommendation 4>",
    "<actionable recommendation 5>"
  ]
}

Important guidelines:
- Make the analysis sound professional and insightful
- Be specific to the ${formData.industry} industry
- Provide actionable, practical recommendations
- Use a helpful, consultative tone
- The quick wins should be things they can implement immediately
- Score should reflect realistic room for improvement (most businesses score 50-75)
- Grade mapping: A=90-100, B=80-89, C=70-79, D=60-69, F=below 60`
}

function parseAuditResponse(responseText) {
  try {
    // Try to extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])

      // Validate required fields
      const requiredFields = [
        'overallScore',
        'overallGrade',
        'profileOptimization',
        'contentReview',
        'engagementSignals',
        'competitorGap',
        'quickWins',
      ]

      for (const field of requiredFields) {
        if (!(field in parsed)) {
          throw new Error(`Missing required field: ${field}`)
        }
      }

      // Ensure quickWins is an array
      if (!Array.isArray(parsed.quickWins)) {
        parsed.quickWins = [parsed.quickWins]
      }

      // Ensure score is a number
      parsed.overallScore = Number(parsed.overallScore)

      return parsed
    }

    throw new Error('No JSON found in response')
  } catch (error) {
    console.error('Error parsing audit response:', error)
    // Return a default structure if parsing fails
    return {
      overallScore: 65,
      overallGrade: 'C',
      profileOptimization:
        'Unable to generate detailed profile analysis. Please ensure your social media URLs are correct and try again.',
      contentReview:
        'Unable to generate content review. Please check your inputs and try again.',
      engagementSignals:
        'Unable to analyze engagement signals. Please verify the provided information.',
      competitorGap:
        'Unable to perform competitor analysis. Please try again.',
      quickWins: [
        'Ensure your profile bio clearly describes what you do',
        'Add a call-to-action in your bio',
        'Post consistently at least 3-4 times per week',
        'Respond to comments within 24 hours',
        'Use relevant hashtags for your industry',
      ],
    }
  }
}

// API Routes
app.post('/api/audit', async (req, res) => {
  try {
    const formData = req.body

    // Validate required fields
    if (!formData.businessName || !formData.instagramUrl || !formData.industry) {
      return res.status(400).json({
        error: 'Missing required fields: businessName, instagramUrl, and industry are required',
      })
    }

    // Generate audit using Claude
    const auditResult = await generateAuditAnalysis(formData)

    res.json(auditResult)
  } catch (error) {
    console.error('Error generating audit:', error)
    res.status(500).json({
      error: 'Failed to generate audit. Please check your API key and try again.',
    })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('Warning: ANTHROPIC_API_KEY not set. API calls will fail.')
  }
})
