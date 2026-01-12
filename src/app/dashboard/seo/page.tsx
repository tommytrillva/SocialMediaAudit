'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Sparkles,
  Hash,
  Type,
  AlignLeft,
  Clock,
  RefreshCw,
  Copy,
  Check,
  ChevronDown,
  TrendingUp,
  Eye,
  Target,
  Zap,
  Instagram,
  Video,
} from 'lucide-react'
import { Header } from '@/components/dashboard/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input, Textarea, Label, Select } from '@/components/ui/input'
import { useMediaStore } from '@/store'
import { cn } from '@/lib/utils'
import type { Platform, SEOAnalysis, HashtagSuggestion } from '@/types'

// Mock SEO analysis generator
const generateMockSEOAnalysis = (content: string, platform: Platform): Partial<SEOAnalysis> => {
  const headlines = [
    'This will change your morning routine',
    'The secret to perfect coffee at home',
    'You\'ve been making coffee wrong',
    'Why baristas swear by this method',
  ]

  const captions = [
    `Transform your daily ritual with our signature blend. ☕ Each cup tells a story of sustainable sourcing and artisan craftsmanship. What's your morning ritual? 👇`,
    `From bean to cup, quality you can taste. ✨ Our roasters spend 15 years perfecting this exact profile. Double tap if you appreciate the craft! 🙌`,
    `Cozy vibes only. ☁️ There's something magical about that first sip of the day. Share this with someone who needs their coffee fix! ☕`,
  ]

  return {
    headline: {
      original: content.substring(0, 50),
      suggested: headlines[Math.floor(Math.random() * headlines.length)],
      reasoning: 'Hook-style headlines perform 2.4x better on this platform. Questions and bold statements drive more saves.',
      score: Math.floor(Math.random() * 20) + 80,
    },
    caption: {
      original: content,
      suggested: captions[Math.floor(Math.random() * captions.length)],
      reasoning: 'Emojis increase engagement by 48%. The call-to-action encourages comments, boosting algorithmic reach.',
      score: Math.floor(Math.random() * 20) + 75,
    },
    hashtags: [
      { tag: '#coffeelover', reach: 'high', competition: 'high', relevance: 95 },
      { tag: '#morningritual', reach: 'medium', competition: 'medium', relevance: 92 },
      { tag: '#artisancoffee', reach: 'medium', competition: 'low', relevance: 98 },
      { tag: '#coffeetime', reach: 'high', competition: 'high', relevance: 85 },
      { tag: '#specialtycoffee', reach: 'medium', competition: 'medium', relevance: 90 },
      { tag: '#coffeeaddict', reach: 'high', competition: 'high', relevance: 80 },
      { tag: '#baristaskills', reach: 'low', competition: 'low', relevance: 75 },
      { tag: '#coffeeshop', reach: 'high', competition: 'high', relevance: 88 },
    ],
    postingStrategy: {
      bestTimes: [
        { day: 'Monday', time: '9:00 AM', score: 95 },
        { day: 'Wednesday', time: '12:00 PM', score: 88 },
        { day: 'Friday', time: '5:00 PM', score: 82 },
      ],
      frequency: '5-7 posts per week for optimal growth',
      reasoning: 'Your audience is most active during morning commute and lunch hours. Weekend engagement peaks around 10 AM.',
    },
    score: Math.floor(Math.random() * 15) + 85,
  }
}

export default function SEOPage() {
  const { items: mediaItems } = useMediaStore()
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null)
  const [platform, setPlatform] = useState<Platform>('instagram')
  const [inputContent, setInputContent] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<Partial<SEOAnalysis> | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!inputContent.trim()) return

    setIsAnalyzing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const result = generateMockSEOAnalysis(inputContent, platform)
    setAnalysis(result)
    setIsAnalyzing(false)
  }

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const getReachBadge = (reach: HashtagSuggestion['reach']) => {
    const config = {
      high: { variant: 'success' as const, label: 'High Reach' },
      medium: { variant: 'warning' as const, label: 'Medium' },
      low: { variant: 'error' as const, label: 'Niche' },
    }
    return <Badge variant={config[reach].variant} size="sm">{config[reach].label}</Badge>
  }

  return (
    <div className="min-h-screen">
      <Header
        title="SEO Studio"
        description="Optimize your content for maximum reach and engagement."
      />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-accent" />
                  Content Input
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Target Platform</Label>
                  <Select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as Platform)}
                  >
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="facebook">Facebook</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="youtube">YouTube</option>
                  </Select>
                </div>

                <div>
                  <Label>Select Media (Optional)</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {mediaItems.slice(0, 8).map((media) => (
                      <button
                        key={media.id}
                        onClick={() => setSelectedMedia(media.id === selectedMedia ? null : media.id)}
                        className={cn(
                          'aspect-square rounded-lg overflow-hidden border-2 transition-all',
                          selectedMedia === media.id
                            ? 'border-accent'
                            : 'border-transparent hover:border-border'
                        )}
                      >
                        <img
                          src={media.thumbnailUrl || media.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Your Draft Caption</Label>
                  <Textarea
                    value={inputContent}
                    onChange={(e) => setInputContent(e.target.value)}
                    placeholder="Paste your draft caption or describe your content..."
                    rows={5}
                  />
                </div>

                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleAnalyze}
                  isLoading={isAnalyzing}
                  disabled={!inputContent.trim()}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze & Optimize
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { label: 'Optimal Caption Length', value: '125-150 characters', platform: 'instagram' },
                    { label: 'Hashtag Sweet Spot', value: '8-15 hashtags', platform: 'instagram' },
                    { label: 'Best Posting Time', value: '9 AM - 11 AM EST', platform: 'instagram' },
                    { label: 'Trending Audio', value: 'Increases reach by 50%', platform: 'tiktok' },
                  ]
                    .filter((item) => item.platform === platform || item.platform === 'all')
                    .map((stat, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background-tertiary">
                        <span className="text-sm text-foreground-muted">{stat.label}</span>
                        <span className="text-sm font-medium text-foreground">{stat.value}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {analysis ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Overall Score */}
                  <Card className="border-accent">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-gradient-luxury flex items-center justify-center">
                          <span className="text-3xl font-bold text-background">{analysis.score}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">SEO Score</h3>
                          <p className="text-foreground-muted">
                            Your content is optimized for {platform}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="success">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              High Engagement Potential
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Headline Suggestion */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Type className="w-5 h-5 text-accent" />
                          Headline
                        </CardTitle>
                        <Badge variant="accent">{analysis.headline?.score}% optimized</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-lg bg-accent-muted/20 border border-accent/30">
                        <p className="font-medium text-foreground">{analysis.headline?.suggested}</p>
                      </div>
                      <p className="text-sm text-foreground-muted">
                        <Zap className="w-4 h-4 inline mr-1 text-accent" />
                        {analysis.headline?.reasoning}
                      </p>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleCopy(analysis.headline?.suggested || '', 'headline')}
                      >
                        {copiedField === 'headline' ? (
                          <Check className="w-4 h-4 mr-2" />
                        ) : (
                          <Copy className="w-4 h-4 mr-2" />
                        )}
                        Copy Headline
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Caption Suggestion */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <AlignLeft className="w-5 h-5 text-accent" />
                          Optimized Caption
                        </CardTitle>
                        <Badge variant="accent">{analysis.caption?.score}% optimized</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-lg bg-background-tertiary">
                        <p className="text-foreground whitespace-pre-line">{analysis.caption?.suggested}</p>
                      </div>
                      <p className="text-sm text-foreground-muted">
                        <Zap className="w-4 h-4 inline mr-1 text-accent" />
                        {analysis.caption?.reasoning}
                      </p>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleCopy(analysis.caption?.suggested || '', 'caption')}
                      >
                        {copiedField === 'caption' ? (
                          <Check className="w-4 h-4 mr-2" />
                        ) : (
                          <Copy className="w-4 h-4 mr-2" />
                        )}
                        Copy Caption
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Hashtags */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Hash className="w-5 h-5 text-accent" />
                        Recommended Hashtags
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {analysis.hashtags?.map((hashtag) => (
                          <div
                            key={hashtag.tag}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-tertiary"
                          >
                            <span className="text-foreground font-medium">{hashtag.tag}</span>
                            {getReachBadge(hashtag.reach)}
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                          handleCopy(
                            analysis.hashtags?.map((h) => h.tag).join(' ') || '',
                            'hashtags'
                          )
                        }
                      >
                        {copiedField === 'hashtags' ? (
                          <Check className="w-4 h-4 mr-2" />
                        ) : (
                          <Copy className="w-4 h-4 mr-2" />
                        )}
                        Copy All Hashtags
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Posting Strategy */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-accent" />
                        Best Times to Post
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        {analysis.postingStrategy?.bestTimes.map((time, i) => (
                          <div
                            key={i}
                            className={cn(
                              'p-3 rounded-lg text-center',
                              i === 0 ? 'bg-accent-muted border border-accent' : 'bg-background-tertiary'
                            )}
                          >
                            <p className="text-sm text-foreground-muted">{time.day}</p>
                            <p className="text-lg font-bold text-foreground">{time.time}</p>
                            <p className="text-xs text-foreground-subtle">{time.score}% engagement</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-foreground-muted">
                        <Target className="w-4 h-4 inline mr-1 text-accent" />
                        {analysis.postingStrategy?.reasoning}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className="h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <Search className="w-16 h-16 mx-auto text-foreground-muted mb-4 opacity-50" />
                      <h3 className="text-lg font-medium text-foreground">Ready to Optimize</h3>
                      <p className="text-foreground-muted mt-1 max-w-sm">
                        Enter your draft content and select a platform to get AI-powered SEO suggestions
                      </p>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
