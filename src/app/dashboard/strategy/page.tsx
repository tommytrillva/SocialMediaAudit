'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Sparkles,
  TrendingUp,
  Lightbulb,
  Target,
  Zap,
  RefreshCw,
  Save,
  Trash2,
  Calendar,
  ChevronRight,
  Star,
  Flame,
  BarChart2,
  Instagram,
  Video,
  MessageSquare,
} from 'lucide-react'
import { Header } from '@/components/dashboard/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useIdeasStore, useBrandStore } from '@/store'
import { cn } from '@/lib/utils'
import type { ContentIdea, TrendInsight } from '@/types'

// Mock trending data
const mockTrends: TrendInsight[] = [
  {
    id: 'trend_1',
    platform: 'tiktok',
    title: 'Day in the Life Format',
    description: 'Behind-the-scenes content showing daily operations is gaining massive traction in F&B sector.',
    category: 'Content Format',
    momentum: 'rising',
    relevanceScore: 94,
    exampleUrls: [],
    suggestedApproach: 'Film a "day in the life" of your barista team, showing the morning prep, customer interactions, and closing routine.',
    discoveredAt: new Date(),
  },
  {
    id: 'trend_2',
    platform: 'instagram',
    title: 'Aesthetic Flat Lays',
    description: 'Minimalist product photography with earthy tones performing well for coffee brands.',
    category: 'Visual Style',
    momentum: 'peak',
    relevanceScore: 88,
    exampleUrls: [],
    suggestedApproach: 'Create a series of flat lay shots featuring your signature drinks with seasonal props.',
    discoveredAt: new Date(),
  },
  {
    id: 'trend_3',
    platform: 'instagram',
    title: 'Customer Testimonial Reels',
    description: 'Short-form video testimonials are outperforming static posts by 3x in engagement.',
    category: 'Social Proof',
    momentum: 'rising',
    relevanceScore: 91,
    exampleUrls: [],
    suggestedApproach: 'Ask regulars to share 15-second clips about their favorite drinks or experience.',
    discoveredAt: new Date(),
  },
]

export default function StrategyPage() {
  const { ideas, isGenerating, setGenerating, addIdea, updateIdea } = useIdeasStore()
  const { profile } = useBrandStore()
  const [selectedIdea, setSelectedIdea] = useState<ContentIdea | null>(null)
  const [activeTab, setActiveTab] = useState<'ideas' | 'trends' | 'analysis'>('ideas')

  const handleGenerateIdeas = async () => {
    setGenerating(true)

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Add mock generated ideas
    const newIdeas: Omit<ContentIdea, 'id'>[] = [
      {
        userId: 'user_1',
        title: 'Coffee Origin Story Series',
        description: `Share the journey of your beans from farm to cup. Feature ${profile?.name || 'your brand'}'s partnerships with sustainable farmers.`,
        type: 'carousel',
        platforms: ['instagram', 'linkedin'],
        trendScore: 85,
        brandAlignment: 92,
        tags: ['storytelling', 'sustainability', 'education'],
        status: 'new',
        createdAt: new Date(),
      },
      {
        userId: 'user_1',
        title: 'Morning Ritual Challenge',
        description: 'Launch a UGC campaign encouraging followers to share their morning coffee rituals with a branded hashtag.',
        type: 'reel',
        platforms: ['instagram', 'tiktok'],
        trendScore: 91,
        brandAlignment: 78,
        tags: ['ugc', 'challenge', 'community'],
        status: 'new',
        createdAt: new Date(),
      },
    ]

    newIdeas.forEach((idea) => {
      addIdea({
        ...idea,
        id: `idea_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      } as ContentIdea)
    })

    setGenerating(false)
  }

  const tabs = [
    { id: 'ideas', label: 'Content Ideas', icon: Lightbulb },
    { id: 'trends', label: 'Trending Now', icon: TrendingUp },
    { id: 'analysis', label: 'Performance Analysis', icon: BarChart2 },
  ]

  const getMomentumBadge = (momentum: TrendInsight['momentum']) => {
    const config = {
      rising: { variant: 'success' as const, icon: TrendingUp, label: 'Rising' },
      peak: { variant: 'accent' as const, icon: Flame, label: 'Peak' },
      declining: { variant: 'warning' as const, icon: TrendingUp, label: 'Declining' },
    }
    const { variant, icon: Icon, label } = config[momentum]
    return (
      <Badge variant={variant}>
        <Icon className="w-3 h-3 mr-1" />
        {label}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen">
      <Header
        title="The Brain"
        description="AI-powered strategy engine for content ideas and trend analysis."
        actions={
          <Button variant="primary" onClick={handleGenerateIdeas} isLoading={isGenerating}>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Ideas
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Brand Context Card */}
        <Card variant="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-luxury flex items-center justify-center">
                <Brain className="w-6 h-6 text-background" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">AI Context Loaded</h3>
                <p className="text-sm text-foreground-muted">
                  Using {profile?.name || 'your brand'} vision board with{' '}
                  {profile?.brandVoice?.length || 0} voice attributes and{' '}
                  {profile?.keywords?.length || 0} keywords
                </p>
              </div>
              <Badge variant="success">
                <Zap className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 p-1 bg-background-secondary rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-accent text-background'
                  : 'text-foreground-muted hover:text-foreground'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Ideas Tab */}
          {activeTab === 'ideas' && (
            <motion.div
              key="ideas"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Ideas List */}
              <div className="lg:col-span-2 space-y-4">
                {isGenerating && (
                  <Card className="border-accent border-dashed">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                      <div>
                        <p className="font-medium text-foreground">Generating content ideas...</p>
                        <p className="text-sm text-foreground-muted">
                          Analyzing trends and brand alignment
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {ideas.map((idea) => (
                  <motion.div
                    key={idea.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Card
                      hover
                      className={cn(
                        'cursor-pointer transition-all',
                        selectedIdea?.id === idea.id && 'border-accent'
                      )}
                      onClick={() => setSelectedIdea(idea)}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{idea.type}</Badge>
                              {idea.status === 'new' && (
                                <Badge variant="accent">New</Badge>
                              )}
                            </div>
                            <h3 className="font-semibold text-foreground mb-1">{idea.title}</h3>
                            <p className="text-sm text-foreground-muted line-clamp-2">
                              {idea.description}
                            </p>
                            <div className="flex items-center gap-4 mt-3">
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4 text-success" />
                                <span className="text-sm text-foreground-muted">
                                  {idea.trendScore}% trending
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Target className="w-4 h-4 text-accent" />
                                <span className="text-sm text-foreground-muted">
                                  {idea.brandAlignment}% aligned
                                </span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-foreground-muted flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Idea Detail Panel */}
              <div className="space-y-4">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Idea Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedIdea ? (
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-foreground-muted">Title</p>
                          <p className="font-medium text-foreground">{selectedIdea.title}</p>
                        </div>
                        <div>
                          <p className="text-sm text-foreground-muted">Description</p>
                          <p className="text-foreground">{selectedIdea.description}</p>
                        </div>
                        <div>
                          <p className="text-sm text-foreground-muted mb-2">Platforms</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedIdea.platforms.map((platform) => (
                              <Badge key={platform} variant="outline">
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-foreground-muted mb-2">Tags</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedIdea.tags.map((tag) => (
                              <Badge key={tag} variant="accent" size="sm">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 rounded-lg bg-background-tertiary text-center">
                            <p className="text-2xl font-bold text-success">
                              {selectedIdea.trendScore}%
                            </p>
                            <p className="text-xs text-foreground-muted">Trend Score</p>
                          </div>
                          <div className="p-3 rounded-lg bg-background-tertiary text-center">
                            <p className="text-2xl font-bold text-accent">
                              {selectedIdea.brandAlignment}%
                            </p>
                            <p className="text-xs text-foreground-muted">Brand Fit</p>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button variant="primary" className="flex-1">
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() =>
                              updateIdea(selectedIdea.id, { status: 'saved' })
                            }
                          >
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() =>
                              updateIdea(selectedIdea.id, { status: 'dismissed' })
                            }
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-foreground-muted">
                        <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Select an idea to view details</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Trends Tab */}
          {activeTab === 'trends' && (
            <motion.div
              key="trends"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {mockTrends.map((trend) => (
                <Card key={trend.id} hover>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent-muted flex items-center justify-center flex-shrink-0">
                        {trend.platform === 'tiktok' ? (
                          <Video className="w-6 h-6 text-accent" />
                        ) : (
                          <Instagram className="w-6 h-6 text-accent" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">{trend.title}</h3>
                          {getMomentumBadge(trend.momentum)}
                        </div>
                        <p className="text-sm text-foreground-muted mb-3">
                          {trend.description}
                        </p>
                        <div className="p-3 rounded-lg bg-background-tertiary">
                          <p className="text-xs text-foreground-subtle mb-1">
                            Suggested Approach:
                          </p>
                          <p className="text-sm text-foreground">{trend.suggestedApproach}</p>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{trend.category}</Badge>
                            <Badge variant="outline">{trend.platform}</Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-accent" />
                            <span className="text-sm font-medium text-foreground">
                              {trend.relevanceScore}% relevant
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}

          {/* Analysis Tab */}
          {activeTab === 'analysis' && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-background-tertiary">
                      <p className="text-sm text-foreground-muted">Best Performing Content</p>
                      <p className="text-xl font-bold text-foreground mt-1">Reels</p>
                      <p className="text-sm text-success mt-1">+45% higher engagement</p>
                    </div>
                    <div className="p-4 rounded-xl bg-background-tertiary">
                      <p className="text-sm text-foreground-muted">Optimal Posting Time</p>
                      <p className="text-xl font-bold text-foreground mt-1">9:00 AM</p>
                      <p className="text-sm text-foreground-subtle mt-1">Weekdays</p>
                    </div>
                    <div className="p-4 rounded-xl bg-background-tertiary">
                      <p className="text-sm text-foreground-muted">Top Hashtag</p>
                      <p className="text-xl font-bold text-foreground mt-1">#coffeelover</p>
                      <p className="text-sm text-foreground-subtle mt-1">2.3M reach</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-3">AI Recommendations</h4>
                    <div className="space-y-3">
                      {[
                        {
                          title: 'Increase video content',
                          description: 'Your video posts receive 3x more engagement than static images.',
                          impact: 'high',
                        },
                        {
                          title: 'Post more consistently',
                          description: 'Accounts posting 5+ times per week see 40% higher growth.',
                          impact: 'medium',
                        },
                        {
                          title: 'Engage with comments',
                          description: 'Responding within 1 hour increases follower loyalty by 25%.',
                          impact: 'high',
                        },
                      ].map((rec, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-lg bg-background-tertiary"
                        >
                          <MessageSquare className="w-5 h-5 text-accent mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-foreground">{rec.title}</p>
                              <Badge
                                variant={rec.impact === 'high' ? 'success' : 'warning'}
                                size="sm"
                              >
                                {rec.impact} impact
                              </Badge>
                            </div>
                            <p className="text-sm text-foreground-muted mt-1">{rec.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
