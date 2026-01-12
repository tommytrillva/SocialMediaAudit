import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Velocity | Premium Social Media Management',
  description: 'High-touch, low-stress social media strategy, management, and analytics platform.',
  keywords: ['social media', 'management', 'marketing', 'analytics', 'scheduling', 'AI'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans">
        {/* Subtle noise texture overlay */}
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  )
}
