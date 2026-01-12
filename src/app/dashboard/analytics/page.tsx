'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  Calendar,
  Instagram,
  Facebook,
  Video,
  BarChart2,
} from 'lucide-react'
import { Header } from '@/components/dashboard/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/input'
import { cn, formatNumber } from '@/lib/utils'

const stats = [
  { label: 'Total Reach', value: 124500, change: 12.3, icon: Eye },
  { label: 'Engagement Rate', value: 4.8, change: 0.8, icon: Heart, suffix: '%' },
  { label: 'Total Followers', value: 28400, change: 2100, icon: Users },
  { label: 'Comments', value: 892, change: -5.2, icon: MessageSquare },
]

const topPosts = [
  {
    id: 1,
    thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200',
    caption: 'Start your morning right with our signature blend...',
    platform: 'instagram',
    reach: 15200,
    engagement: 1420,
    date: '2024-07-10',
  },
  {
    id: 2,
    thumbnail: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200',
    caption: 'Behind the scenes at our roastery...',
    platform: 'tiktok',
    reach: 28900,
    engagement: 3200,
    date: '2024-07-08',
  },
  {
    id: 3,
    thumbnail: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=200',
    caption: 'New seasonal menu dropping this weekend!',
    platform: 'instagram',
    reach: 12100,
    engagement: 980,
    date: '2024-07-05',
  },
]

const platformData = [
  { platform: 'Instagram', icon: Instagram, followers: 15200, growth: 8.2, posts: 12, color: 'from-pink-500 to-purple-600' },
  { platform: 'Facebook', icon: Facebook, followers: 8100, growth: 3.1, posts: 8, color: 'from-blue-500 to-blue-700' },
  { platform: 'TikTok', icon: Video, followers: 5100, growth: 15.4, posts: 6, color: 'from-gray-800 to-black' },
]

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('7d')

  return (
    <div className="min-h-screen">
      <Header
        title="Analytics"
        description="Track your social media performance across all platforms."
        actions={
          <Select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-40"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </Select>
        }
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-foreground-muted">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">
                        {typeof stat.value === 'number' && stat.value > 1000
                          ? formatNumber(stat.value)
                          : stat.value}
                        {stat.suffix}
                      </p>
                      <div
                        className={cn(
                          'flex items-center gap-1 mt-2 text-sm font-medium',
                          stat.change > 0 ? 'text-success' : 'text-error'
                        )}
                      >
                        {stat.change > 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {stat.change > 0 ? '+' : ''}{stat.change}
                        {typeof stat.change === 'number' && !stat.suffix ? '%' : ''}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-accent-muted flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-background-tertiary rounded-xl flex items-center justify-center">
              <div className="text-center text-foreground-muted">
                <BarChart2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Chart visualization would go here</p>
                <p className="text-sm mt-1">Integrate with a charting library like Recharts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Platform Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {platformData.map((platform) => (
                <div
                  key={platform.platform}
                  className="flex items-center gap-4 p-4 rounded-xl bg-background-tertiary"
                >
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center',
                      platform.color
                    )}
                  >
                    <platform.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground">{platform.platform}</p>
                      <Badge variant={platform.growth > 10 ? 'success' : 'accent'}>
                        +{platform.growth}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-foreground-muted">
                      <span>{formatNumber(platform.followers)} followers</span>
                      <span>•</span>
                      <span>{platform.posts} posts</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Performing Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Posts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-background-tertiary"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-muted text-accent font-bold">
                    {index + 1}
                  </div>
                  <img
                    src={post.thumbnail}
                    alt=""
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{post.caption}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-foreground-muted">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {formatNumber(post.reach)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {formatNumber(post.engagement)}
                      </span>
                      <Badge variant="outline" size="sm">
                        {post.platform}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Best Times to Post */}
        <Card>
          <CardHeader>
            <CardTitle>Best Times to Post</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-center">
                  <p className="text-sm font-medium text-foreground-muted mb-2">{day}</p>
                  <div className="space-y-1">
                    {[9, 12, 15, 18, 21].map((hour) => {
                      const intensity = Math.random()
                      return (
                        <div
                          key={hour}
                          className={cn(
                            'h-8 rounded-md flex items-center justify-center text-2xs',
                            intensity > 0.7
                              ? 'bg-success text-white'
                              : intensity > 0.4
                              ? 'bg-accent-muted text-accent'
                              : 'bg-background-tertiary text-foreground-muted'
                          )}
                        >
                          {hour}:00
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-success" />
                <span className="text-foreground-muted">High engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-accent-muted" />
                <span className="text-foreground-muted">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-background-tertiary" />
                <span className="text-foreground-muted">Low</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
