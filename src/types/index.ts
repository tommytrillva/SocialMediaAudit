// User & Authentication Types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  subscription: SubscriptionTier
  teamId?: string
  role: 'owner' | 'admin' | 'member'
  createdAt: Date
}

export type SubscriptionTier = 'free' | 'solopreneur' | 'growth' | 'enterprise'

export interface Team {
  id: string
  name: string
  ownerId: string
  members: TeamMember[]
  createdAt: Date
}

export interface TeamMember {
  userId: string
  role: 'admin' | 'member'
  invitedAt: Date
  acceptedAt?: Date
}

// Vision Board Types
export interface VisionBoardItem {
  id: string
  userId: string
  type: 'image' | 'text' | 'color' | 'mood'
  content: string
  metadata?: Record<string, any>
  embedding?: number[]
  position: { x: number; y: number }
  size: { width: number; height: number }
  createdAt: Date
}

export interface BrandProfile {
  id: string
  userId: string
  name: string
  industry: string
  targetAudience: string
  brandVoice: string[]
  colors: string[]
  keywords: string[]
  competitors: string[]
  visionBoardItems: VisionBoardItem[]
  createdAt: Date
  updatedAt: Date
}

// Media Vault Types
export interface MediaItem {
  id: string
  userId: string
  teamId?: string
  type: 'image' | 'video' | 'document'
  url: string
  thumbnailUrl?: string
  name: string
  size: number
  mimeType: string
  tags: string[]
  status: 'pending' | 'approved' | 'rejected'
  approvedBy?: string
  metadata?: MediaMetadata
  createdAt: Date
  updatedAt: Date
}

export interface MediaMetadata {
  width?: number
  height?: number
  duration?: number
  format?: string
  description?: string
}

export interface MediaFolder {
  id: string
  userId: string
  name: string
  parentId?: string
  color?: string
  itemCount: number
  createdAt: Date
}

// Content & Scheduling Types
export type Platform = 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'linkedin'

export interface ScheduledPost {
  id: string
  userId: string
  teamId?: string
  platforms: Platform[]
  content: PostContent
  mediaIds: string[]
  scheduledFor: Date
  status: 'draft' | 'scheduled' | 'published' | 'failed'
  publishedAt?: Date
  analytics?: PostAnalytics
  repurposedFrom?: string
  createdAt: Date
  updatedAt: Date
}

export interface PostContent {
  caption: string
  hashtags: string[]
  headline?: string
  description?: string
  subtitles?: string
  platformOverrides?: Partial<Record<Platform, Partial<PostContent>>>
}

export interface PostAnalytics {
  impressions: number
  reach: number
  engagement: number
  likes: number
  comments: number
  shares: number
  saves?: number
  clicks?: number
}

// AI Strategy Types
export interface ContentIdea {
  id: string
  userId: string
  title: string
  description: string
  type: 'reel' | 'post' | 'story' | 'carousel' | 'video'
  platforms: Platform[]
  trendScore: number
  brandAlignment: number
  suggestedDate?: Date
  tags: string[]
  status: 'new' | 'saved' | 'used' | 'dismissed'
  createdAt: Date
}

export interface TrendInsight {
  id: string
  platform: Platform
  title: string
  description: string
  category: string
  momentum: 'rising' | 'peak' | 'declining'
  relevanceScore: number
  exampleUrls: string[]
  suggestedApproach: string
  discoveredAt: Date
}

export interface StrategyRecommendation {
  id: string
  userId: string
  type: 'posting_time' | 'content_type' | 'hashtag' | 'engagement' | 'growth'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  effort: 'high' | 'medium' | 'low'
  actionItems: string[]
  metrics?: Record<string, number>
  createdAt: Date
}

// SEO & Optimization Types
export interface SEOAnalysis {
  id: string
  mediaId: string
  platform: Platform
  headline: SEOSuggestion
  caption: SEOSuggestion
  hashtags: HashtagSuggestion[]
  postingStrategy: PostingStrategy
  score: number
  createdAt: Date
}

export interface SEOSuggestion {
  original?: string
  suggested: string
  reasoning: string
  score: number
}

export interface HashtagSuggestion {
  tag: string
  reach: 'high' | 'medium' | 'low'
  competition: 'high' | 'medium' | 'low'
  relevance: number
}

export interface PostingStrategy {
  bestTimes: { day: string; time: string; score: number }[]
  frequency: string
  reasoning: string
}

// Analytics Types
export interface AnalyticsSummary {
  period: 'day' | 'week' | 'month' | 'quarter'
  startDate: Date
  endDate: Date
  totalPosts: number
  totalReach: number
  totalEngagement: number
  engagementRate: number
  followerGrowth: number
  topPerformingPosts: ScheduledPost[]
  platformBreakdown: Record<Platform, PlatformAnalytics>
}

export interface PlatformAnalytics {
  posts: number
  reach: number
  engagement: number
  followers: number
  growth: number
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: 'approval_request' | 'post_published' | 'trend_alert' | 'team_invite' | 'system'
  title: string
  message: string
  actionUrl?: string
  read: boolean
  createdAt: Date
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}
