'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  List,
  Clock,
  Plus,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Send,
  Image as ImageIcon,
  Video,
  Check,
} from 'lucide-react'
import { format, addDays, startOfWeek, addWeeks, isSameDay, isToday } from 'date-fns'
import { Header } from '@/components/dashboard/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input, Textarea, Label } from '@/components/ui/input'
import { useSchedulerStore, useMediaStore } from '@/store'
import { cn } from '@/lib/utils'
import type { Platform, ScheduledPost } from '@/types'
import { v4 as uuidv4 } from 'uuid'

const platformIcons: Record<Platform, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  tiktok: Video, // Using Video as TikTok placeholder
}

const platformColors: Record<Platform, string> = {
  instagram: 'from-pink-500 to-purple-600',
  facebook: 'from-blue-500 to-blue-700',
  youtube: 'from-red-500 to-red-700',
  linkedin: 'from-blue-600 to-blue-800',
  tiktok: 'from-gray-800 to-black',
}

export default function SchedulerPage() {
  const { posts, view, setView, selectedDate, setSelectedDate, addPost, updatePost, deletePost } = useSchedulerStore()
  const { items: mediaItems } = useMediaStore()
  const [isCreating, setIsCreating] = useState(false)
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date()))

  // New post form state
  const [newPost, setNewPost] = useState({
    caption: '',
    platforms: [] as Platform[],
    scheduledDate: '',
    scheduledTime: '',
    mediaId: '',
  })

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i))

  const getPostsForDate = (date: Date) => {
    return posts.filter((post) => isSameDay(new Date(post.scheduledFor), date))
  }

  const handleCreatePost = () => {
    if (!newPost.caption || newPost.platforms.length === 0 || !newPost.scheduledDate) return

    const scheduledFor = new Date(`${newPost.scheduledDate}T${newPost.scheduledTime || '09:00'}`)

    const post: ScheduledPost = {
      id: uuidv4(),
      userId: 'user_1',
      platforms: newPost.platforms,
      content: {
        caption: newPost.caption,
        hashtags: [],
      },
      mediaIds: newPost.mediaId ? [newPost.mediaId] : [],
      scheduledFor,
      status: 'scheduled',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    addPost(post)
    setIsCreating(false)
    setNewPost({
      caption: '',
      platforms: [],
      scheduledDate: '',
      scheduledTime: '',
      mediaId: '',
    })
  }

  const togglePlatform = (platform: Platform) => {
    setNewPost((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }))
  }

  const viewTabs = [
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'list', label: 'List', icon: List },
    { id: 'queue', label: 'Queue', icon: Clock },
  ]

  return (
    <div className="min-h-screen">
      <Header
        title="Scheduler"
        description="Plan and schedule your content across all platforms."
        actions={
          <Button variant="primary" onClick={() => setIsCreating(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 p-1 bg-background-secondary rounded-xl">
            {viewTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setView(tab.id as typeof view)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  view === tab.id
                    ? 'bg-accent text-background'
                    : 'text-foreground-muted hover:text-foreground'
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {view === 'calendar' && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentWeekStart(addWeeks(currentWeekStart, -1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium text-foreground">
                {format(currentWeekStart, 'MMM d')} - {format(addDays(currentWeekStart, 6), 'MMM d, yyyy')}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentWeekStart(addWeeks(currentWeekStart, 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Calendar View */}
        <AnimatePresence mode="wait">
          {view === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-7 gap-4"
            >
              {weekDays.map((day) => {
                const dayPosts = getPostsForDate(day)
                const isCurrentDay = isToday(day)

                return (
                  <div
                    key={day.toISOString()}
                    className={cn(
                      'min-h-[200px] rounded-xl border p-3 transition-all',
                      isCurrentDay
                        ? 'bg-accent-muted/20 border-accent'
                        : 'bg-background-secondary border-border'
                    )}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={cn(
                          'text-xs font-medium uppercase',
                          isCurrentDay ? 'text-accent' : 'text-foreground-muted'
                        )}
                      >
                        {format(day, 'EEE')}
                      </span>
                      <span
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                          isCurrentDay ? 'bg-accent text-background' : 'text-foreground'
                        )}
                      >
                        {format(day, 'd')}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {dayPosts.slice(0, 3).map((post) => (
                        <div
                          key={post.id}
                          className="p-2 rounded-lg bg-background-tertiary text-xs cursor-pointer hover:bg-background-elevated transition-colors"
                          onClick={() => setSelectedDate(day)}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            {post.platforms.slice(0, 2).map((platform) => {
                              const Icon = platformIcons[platform]
                              return (
                                <Icon
                                  key={platform}
                                  className="w-3 h-3 text-foreground-muted"
                                />
                              )
                            })}
                            {post.platforms.length > 2 && (
                              <span className="text-foreground-subtle">
                                +{post.platforms.length - 2}
                              </span>
                            )}
                          </div>
                          <p className="text-foreground-muted line-clamp-2">
                            {post.content.caption}
                          </p>
                          <p className="text-foreground-subtle mt-1">
                            {format(new Date(post.scheduledFor), 'h:mm a')}
                          </p>
                        </div>
                      ))}
                      {dayPosts.length > 3 && (
                        <p className="text-xs text-foreground-subtle text-center">
                          +{dayPosts.length - 3} more
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </motion.div>
          )}

          {view === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {posts
                .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime())
                .map((post) => (
                  <Card key={post.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {post.mediaIds.length > 0 ? (
                          <div className="w-20 h-20 rounded-lg bg-background-tertiary overflow-hidden flex-shrink-0">
                            <img
                              src={mediaItems.find((m) => m.id === post.mediaIds[0])?.thumbnailUrl || ''}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-20 rounded-lg bg-background-tertiary flex items-center justify-center flex-shrink-0">
                            <ImageIcon className="w-8 h-8 text-foreground-muted" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            {post.platforms.map((platform) => {
                              const Icon = platformIcons[platform]
                              return (
                                <div
                                  key={platform}
                                  className={cn(
                                    'w-6 h-6 rounded-md bg-gradient-to-br flex items-center justify-center',
                                    platformColors[platform]
                                  )}
                                >
                                  <Icon className="w-3 h-3 text-white" />
                                </div>
                              )
                            })}
                            <Badge
                              variant={post.status === 'scheduled' ? 'accent' : post.status === 'published' ? 'success' : 'error'}
                            >
                              {post.status}
                            </Badge>
                          </div>
                          <p className="text-foreground line-clamp-2">{post.content.caption}</p>
                          <p className="text-sm text-foreground-muted mt-2">
                            {format(new Date(post.scheduledFor), 'MMM d, yyyy')} at{' '}
                            {format(new Date(post.scheduledFor), 'h:mm a')}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deletePost(post.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </motion.div>
          )}

          {view === 'queue' && (
            <motion.div
              key="queue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Publishing Queue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {posts
                      .filter((p) => p.status === 'scheduled')
                      .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime())
                      .map((post, index) => (
                        <div
                          key={post.id}
                          className="flex items-center gap-4 p-4 rounded-xl bg-background-tertiary"
                        >
                          <div className="w-8 h-8 rounded-full bg-accent-muted flex items-center justify-center text-accent font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-foreground line-clamp-1">{post.content.caption}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {post.platforms.map((platform) => {
                                const Icon = platformIcons[platform]
                                return <Icon key={platform} className="w-4 h-4 text-foreground-muted" />
                              })}
                              <span className="text-sm text-foreground-muted">
                                • {format(new Date(post.scheduledFor), 'MMM d, h:mm a')}
                              </span>
                            </div>
                          </div>
                          <Button variant="secondary" size="sm">
                            <Send className="w-4 h-4 mr-2" />
                            Publish Now
                          </Button>
                        </div>
                      ))}

                    {posts.filter((p) => p.status === 'scheduled').length === 0 && (
                      <div className="text-center py-8 text-foreground-muted">
                        <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No posts in queue</p>
                        <p className="text-sm mt-1">Schedule some content to get started</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setIsCreating(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl bg-background-secondary border border-border rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">Create New Post</h2>
                <p className="text-sm text-foreground-muted mt-1">
                  Schedule content for your social platforms
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Platform Selection */}
                <div>
                  <Label>Select Platforms</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(['instagram', 'facebook', 'tiktok', 'youtube', 'linkedin'] as Platform[]).map(
                      (platform) => {
                        const Icon = platformIcons[platform]
                        const isSelected = newPost.platforms.includes(platform)
                        return (
                          <button
                            key={platform}
                            onClick={() => togglePlatform(platform)}
                            className={cn(
                              'flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all',
                              isSelected
                                ? 'border-accent bg-accent-muted text-accent'
                                : 'border-border text-foreground-muted hover:border-foreground-muted'
                            )}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="capitalize">{platform}</span>
                            {isSelected && <Check className="w-4 h-4" />}
                          </button>
                        )
                      }
                    )}
                  </div>
                </div>

                {/* Caption */}
                <div>
                  <Label>Caption</Label>
                  <Textarea
                    value={newPost.caption}
                    onChange={(e) => setNewPost((prev) => ({ ...prev, caption: e.target.value }))}
                    placeholder="Write your caption here..."
                    rows={4}
                  />
                </div>

                {/* Schedule */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={newPost.scheduledDate}
                      onChange={(e) => setNewPost((prev) => ({ ...prev, scheduledDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Time</Label>
                    <Input
                      type="time"
                      value={newPost.scheduledTime}
                      onChange={(e) => setNewPost((prev) => ({ ...prev, scheduledTime: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Media Selection */}
                <div>
                  <Label>Attach Media (Optional)</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {mediaItems
                      .filter((m) => m.status === 'approved')
                      .slice(0, 8)
                      .map((media) => (
                        <button
                          key={media.id}
                          onClick={() =>
                            setNewPost((prev) => ({
                              ...prev,
                              mediaId: prev.mediaId === media.id ? '' : media.id,
                            }))
                          }
                          className={cn(
                            'aspect-square rounded-lg overflow-hidden border-2 transition-all',
                            newPost.mediaId === media.id
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
              </div>

              <div className="p-6 border-t border-border flex items-center justify-end gap-3">
                <Button variant="ghost" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleCreatePost}
                  disabled={!newPost.caption || newPost.platforms.length === 0 || !newPost.scheduledDate}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Post
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
