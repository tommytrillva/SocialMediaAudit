import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 30,
    borderBottom: '2 solid #667eea',
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  scoreBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  scoreText: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: 'white',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#374151',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#f9fafb',
    padding: 15,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#374151',
    marginBottom: 10,
    borderLeft: '3 solid #667eea',
    paddingLeft: 10,
  },
  sectionContent: {
    fontSize: 11,
    color: '#4b5563',
    lineHeight: 1.6,
  },
  quickWinItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    width: 15,
    fontSize: 11,
    color: '#667eea',
  },
  quickWinText: {
    flex: 1,
    fontSize: 11,
    color: '#4b5563',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: '1 solid #e5e7eb',
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 9,
    color: '#9ca3af',
  },
  footerBrand: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#667eea',
  },
  generatedDate: {
    fontSize: 9,
    color: '#9ca3af',
    marginTop: 5,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 40,
    fontSize: 9,
    color: '#9ca3af',
  },
})

const getGradeColor = (grade) => {
  const colors = {
    A: '#10b981',
    B: '#3b82f6',
    C: '#f59e0b',
    D: '#f97316',
    F: '#ef4444',
  }
  return colors[grade.charAt(0).toUpperCase()] || '#667eea'
}

function PDFReport({ data }) {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const hasAgencyInfo = data.formData.agencyName || data.formData.agencyEmail

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Social Media Audit Report</Text>
          <Text style={styles.subtitle}>{data.formData.businessName}</Text>
          <Text style={styles.subtitle}>{data.formData.industry}</Text>

          <View style={styles.scoreContainer}>
            <View style={[styles.scoreBadge, { backgroundColor: getGradeColor(data.overallGrade) }]}>
              <Text style={styles.scoreText}>{data.overallGrade}</Text>
            </View>
            <View>
              <Text style={styles.scoreLabel}>Overall Score: {data.overallScore}/100</Text>
              <Text style={styles.generatedDate}>Generated on {today}</Text>
            </View>
          </View>
        </View>

        {/* Profile Optimization */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Optimization</Text>
          <Text style={styles.sectionContent}>{data.profileOptimization}</Text>
        </View>

        {/* Content Review */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Content Review</Text>
          <Text style={styles.sectionContent}>{data.contentReview}</Text>
        </View>

        {/* Engagement Signals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Engagement Signals</Text>
          <Text style={styles.sectionContent}>{data.engagementSignals}</Text>
        </View>

        {/* Competitor Gap */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Competitor Gap Analysis</Text>
          <Text style={styles.sectionContent}>{data.competitorGap}</Text>
        </View>

        {/* Quick Wins */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Wins - Actionable Recommendations</Text>
          {data.quickWins.map((win, index) => (
            <View key={index} style={styles.quickWinItem}>
              <Text style={styles.bullet}>{index + 1}.</Text>
              <Text style={styles.quickWinText}>{win}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <View>
            {hasAgencyInfo && (
              <>
                <Text style={styles.footerBrand}>{data.formData.agencyName}</Text>
                <Text style={styles.footerText}>
                  {data.formData.agencyEmail}
                  {data.formData.agencyPhone && ` | ${data.formData.agencyPhone}`}
                </Text>
              </>
            )}
          </View>
          <Text style={styles.footerText}>Confidential Report</Text>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  )
}

export default PDFReport
