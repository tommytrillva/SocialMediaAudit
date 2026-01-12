'use client'

import { motion } from 'framer-motion'
import {
  TrendingUp,
  Users,
  Eye,
  Heart,
  Calendar,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Instagram,
  Facebook,
  Youtube,
  Sparkles,
} from 'lucide-react'
import { Header } from '@/components/dashboard/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useSchedulerStore, useIdeasStore, useBrandStore } from '@/store'
import { formatNumber, formatRelativeTime } from '@/lib/utils'
import { cn } from '@/lib/utils'

const stats = [
  {
    label: 'Total Reach',
    value: '124.5K',
    change: '+12.3%',
    trend: 'up',
    icon: Eye,
  },
  {
    label: 'Engagement Rate',
    value: '4.8%',
    change: '+0.8%',
    trend: 'up',
    icon: Heart,
  },
  {
    label: 'Followers',
    value: '28.4K',
    change: '+2.1K',
    trend: 'up',
    icon: Users,
  },
  {
    label: 'Posts This Month',
    value: '23',
    change: '-2',
    trend: 'down',
    icon: Calendar,
  },
]

const platformStats = [
  { platform: 'Instagram', icon: Instagram, followers: '15.2K', engagement: '5.2%', color: 'from-pink-500 to-purple-600' },
  { platform: 'Facebook', icon: Facebook, followers: '8.1K', engagement: '3.1%', color: 'from-blue-500 to-blue-700' },
  { platform: 'YouTube', icon: Youtube, followers: '5.1K', engagement: '6.8%', color: 'from-red-500 to-red-700' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
  const { posts } = useSchedulerStore()
  const { ideas } = useIdeasStore()
  const { profile } = useBrandStore()

  const upcomingPosts = posts
    .filter((p) => p.status === 'scheduled')
    .slice(0, 3)

  const topIdeas = ideas
    .filter((i) => i.status === 'new')
    .sort((a, b) => b.trendScore - a.trendScore)
    .slice(0, 3)

  return (
    <div className="min-h-screen">
      <Header
        title="Dashboard"
        description={`Welcome back! Here's your ${profile?.name || 'brand'} overview.`}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="p-6 space-y-6"
      >
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <Card variant="default" hover>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-foreground-muted">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">
                        {stat.value}
                      </p>
                      <div
                        className={cn(
                          'flex items-center gap-1 mt-2 text-sm font-medium',
                          stat.trend === 'up' ? 'text-success' : 'text-error'
                        )}
                      >
                        {stat.trend === 'up' ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        {stat.change}
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Platform Performance */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle>Platform Performance</CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {platformStats.map((platform) => (
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
                      <p className="font-medium text-foreground">{platform.platform}</p>
                      <p className="text-sm text-foreground-muted">
                        {platform.followers} followers
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{platform.engagement}</p>
                      <p className="text-sm text-foreground-muted">engagement</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="primary" className="w-full justify-start" leftIcon={<Sparkles className="w-4 h-4" />}>
                  Generate Content Ideas
                </Button>
                <Button variant="secondary" className="w-full justify-start" leftIcon={<Calendar className="w-4 h-4" />}>
                  Schedule New Post
                </Button>
                <Button variant="secondary" className="w-full justify-start" leftIcon={<Zap className="w-4 h-4" />}>
                  Analyze Performance
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Content Ideas & Upcoming Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trending Content Ideas */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    AI Content Ideas
                  </CardTitle>
                  <Badge variant="accent">New</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {topIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    className="p-4 rounded-xl bg-background-tertiary hover:bg-background-elevated transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{idea.title}</p>
                        <p className="text-sm text-foreground-muted line-clamp-2 mt-1">
                          {idea.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" size="sm">
                            {idea.type}
                          </Badge>
                          <span className="text-xs text-foreground-subtle">
                            Trend Score: {idea.trendScore}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="text-sm font-medium text-success">
                          {idea.brandAlignment}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full">
                  View All Ideas
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Posts */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent" />
                    Upcoming Posts
                  </CardTitle>
                  <Badge variant="success">{upcomingPosts.length} scheduled</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 rounded-xl bg-background-tertiary hover:bg-background-elevated transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground line-clamp-2">
                          {post.content.caption}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          {post.platforms.map((platform) => (
                            <Badge key={platform} variant="outline" size="sm">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-medium text-foreground">
                          {new Date(post.scheduledFor).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                        <p className="text-xs text-foreground-muted">
                          {new Date(post.scheduledFor).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {upcomingPosts.length === 0 && (
                  <div className="text-center py-8 text-foreground-muted">
                    No posts scheduled. Create one now!
                  </div>
                )}
                <Button variant="ghost" className="w-full">
                  View Calendar
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
