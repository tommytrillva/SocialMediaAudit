import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  User,
  BrandProfile,
  MediaItem,
  ScheduledPost,
  ContentIdea,
  Notification,
  Platform,
} from '@/types'

// Mock user for development
const mockUser: User = {
  id: 'user_1',
  email: 'demo@velocity.app',
  name: 'Alex Morgan',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  subscription: 'growth',
  role: 'owner',
  createdAt: new Date('2024-01-01'),
}

// App Store
interface AppState {
  user: User | null
  isLoading: boolean
  sidebarCollapsed: boolean
  activeWorkspace: string

  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  toggleSidebar: () => void
  setActiveWorkspace: (workspace: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: mockUser,
      isLoading: false,
      sidebarCollapsed: false,
      activeWorkspace: 'dashboard',

      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setActiveWorkspace: (activeWorkspace) => set({ activeWorkspace }),
    }),
    {
      name: 'velocity-app',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
)

// Brand Store
interface BrandState {
  profile: BrandProfile | null
  isLoading: boolean

  setProfile: (profile: BrandProfile | null) => void
  updateProfile: (updates: Partial<BrandProfile>) => void
}

const mockBrandProfile: BrandProfile = {
  id: 'brand_1',
  userId: 'user_1',
  name: 'Artisan Coffee Co.',
  industry: 'Food & Beverage',
  targetAudience: 'Coffee enthusiasts, remote workers, millennials',
  brandVoice: ['Warm', 'Sophisticated', 'Authentic', 'Playful'],
  colors: ['#2C1810', '#D4A574', '#F5E6D3', '#8B4513'],
  keywords: ['artisan', 'specialty coffee', 'sustainable', 'local roasters'],
  competitors: ['Blue Bottle', 'Stumptown', 'Intelligentsia'],
  visionBoardItems: [],
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-06-01'),
}

export const useBrandStore = create<BrandState>()((set) => ({
  profile: mockBrandProfile,
  isLoading: false,

  setProfile: (profile) => set({ profile }),
  updateProfile: (updates) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...updates, updatedAt: new Date() } : null,
    })),
}))

// Media Store
interface MediaState {
  items: MediaItem[]
  selectedItems: string[]
  isLoading: boolean
  filter: {
    type: 'all' | 'image' | 'video' | 'document'
    status: 'all' | 'pending' | 'approved' | 'rejected'
    search: string
  }

  setItems: (items: MediaItem[]) => void
  addItem: (item: MediaItem) => void
  updateItem: (id: string, updates: Partial<MediaItem>) => void
  deleteItem: (id: string) => void
  toggleSelection: (id: string) => void
  clearSelection: () => void
  setFilter: (filter: Partial<MediaState['filter']>) => void
}

const mockMediaItems: MediaItem[] = [
  {
    id: 'media_1',
    userId: 'user_1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200',
    name: 'Coffee Pour Over.jpg',
    size: 2500000,
    mimeType: 'image/jpeg',
    tags: ['coffee', 'product', 'lifestyle'],
    status: 'approved',
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date('2024-06-01'),
  },
  {
    id: 'media_2',
    userId: 'user_1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200',
    name: 'Cafe Interior.jpg',
    size: 3200000,
    mimeType: 'image/jpeg',
    tags: ['cafe', 'interior', 'ambiance'],
    status: 'pending',
    createdAt: new Date('2024-06-10'),
    updatedAt: new Date('2024-06-10'),
  },
  {
    id: 'media_3',
    userId: 'user_1',
    type: 'video',
    url: 'https://example.com/video.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=200',
    name: 'Latte Art Tutorial.mp4',
    size: 45000000,
    mimeType: 'video/mp4',
    tags: ['tutorial', 'latte art', 'skills'],
    status: 'approved',
    metadata: { duration: 120, width: 1920, height: 1080 },
    createdAt: new Date('2024-06-05'),
    updatedAt: new Date('2024-06-05'),
  },
]

export const useMediaStore = create<MediaState>()((set) => ({
  items: mockMediaItems,
  selectedItems: [],
  isLoading: false,
  filter: { type: 'all', status: 'all', search: '' },

  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({ items: [item, ...state.items] })),
  updateItem: (id, updates) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updates, updatedAt: new Date() } : item
      ),
    })),
  deleteItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
      selectedItems: state.selectedItems.filter((itemId) => itemId !== id),
    })),
  toggleSelection: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.includes(id)
        ? state.selectedItems.filter((itemId) => itemId !== id)
        : [...state.selectedItems, id],
    })),
  clearSelection: () => set({ selectedItems: [] }),
  setFilter: (filter) =>
    set((state) => ({ filter: { ...state.filter, ...filter } })),
}))

// Scheduler Store
interface SchedulerState {
  posts: ScheduledPost[]
  selectedDate: Date
  view: 'calendar' | 'list' | 'queue'
  isLoading: boolean

  setPosts: (posts: ScheduledPost[]) => void
  addPost: (post: ScheduledPost) => void
  updatePost: (id: string, updates: Partial<ScheduledPost>) => void
  deletePost: (id: string) => void
  setSelectedDate: (date: Date) => void
  setView: (view: SchedulerState['view']) => void
}

const mockScheduledPosts: ScheduledPost[] = [
  {
    id: 'post_1',
    userId: 'user_1',
    platforms: ['instagram', 'facebook'],
    content: {
      caption: 'Start your morning right with our signature house blend ☕ Crafted with beans from sustainable farms in Colombia. #ArtisanCoffee #MorningRitual',
      hashtags: ['artisancoffee', 'morningritual', 'coffeelover', 'specialtycoffee'],
      headline: 'Start Your Morning Right',
    },
    mediaIds: ['media_1'],
    scheduledFor: new Date(Date.now() + 86400000),
    status: 'scheduled',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'post_2',
    userId: 'user_1',
    platforms: ['tiktok', 'instagram'],
    content: {
      caption: 'Learn the art of the perfect pour over in 60 seconds! 🎯 Drop a ☕ if you want more tutorials!',
      hashtags: ['coffeeTok', 'pourover', 'tutorial', 'barista'],
    },
    mediaIds: ['media_3'],
    scheduledFor: new Date(Date.now() + 172800000),
    status: 'scheduled',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const useSchedulerStore = create<SchedulerState>()((set) => ({
  posts: mockScheduledPosts,
  selectedDate: new Date(),
  view: 'calendar',
  isLoading: false,

  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  updatePost: (id, updates) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, ...updates, updatedAt: new Date() } : post
      ),
    })),
  deletePost: (id) =>
    set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
  setSelectedDate: (selectedDate) => set({ selectedDate }),
  setView: (view) => set({ view }),
}))

// Content Ideas Store
interface IdeasState {
  ideas: ContentIdea[]
  isLoading: boolean
  isGenerating: boolean

  setIdeas: (ideas: ContentIdea[]) => void
  addIdea: (idea: ContentIdea) => void
  updateIdea: (id: string, updates: Partial<ContentIdea>) => void
  setGenerating: (isGenerating: boolean) => void
}

const mockContentIdeas: ContentIdea[] = [
  {
    id: 'idea_1',
    userId: 'user_1',
    title: 'Behind the Scenes: Roasting Day',
    description: 'Show the coffee roasting process from green beans to final product. Highlight the craftsmanship and attention to detail.',
    type: 'reel',
    platforms: ['instagram', 'tiktok'],
    trendScore: 92,
    brandAlignment: 95,
    tags: ['behindthescenes', 'roasting', 'process'],
    status: 'new',
    createdAt: new Date(),
  },
  {
    id: 'idea_2',
    userId: 'user_1',
    title: 'Customer Spotlight Series',
    description: 'Feature regular customers sharing their favorite drinks and why they choose your cafe. Build community and social proof.',
    type: 'carousel',
    platforms: ['instagram', 'facebook', 'linkedin'],
    trendScore: 78,
    brandAlignment: 88,
    tags: ['community', 'testimonial', 'spotlight'],
    status: 'new',
    createdAt: new Date(),
  },
  {
    id: 'idea_3',
    userId: 'user_1',
    title: 'Coffee x Music Pairing',
    description: 'Trending format: Match different coffee drinks with music genres/songs. Highly shareable and engaging format.',
    type: 'reel',
    platforms: ['tiktok', 'instagram'],
    trendScore: 96,
    brandAlignment: 72,
    suggestedDate: new Date(Date.now() + 259200000),
    tags: ['trending', 'music', 'pairing'],
    status: 'new',
    createdAt: new Date(),
  },
]

export const useIdeasStore = create<IdeasState>()((set) => ({
  ideas: mockContentIdeas,
  isLoading: false,
  isGenerating: false,

  setIdeas: (ideas) => set({ ideas }),
  addIdea: (idea) => set((state) => ({ ideas: [idea, ...state.ideas] })),
  updateIdea: (id, updates) =>
    set((state) => ({
      ideas: state.ideas.map((idea) =>
        idea.id === id ? { ...idea, ...updates } : idea
      ),
    })),
  setGenerating: (isGenerating) => set({ isGenerating }),
}))

// Notifications Store
interface NotificationState {
  notifications: Notification[]
  unreadCount: number

  setNotifications: (notifications: Notification[]) => void
  addNotification: (notification: Notification) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
}

const mockNotifications: Notification[] = [
  {
    id: 'notif_1',
    userId: 'user_1',
    type: 'trend_alert',
    title: 'Trending Sound Alert',
    message: 'A new sound is trending in your niche! "Cozy Coffee Shop Ambiance" has 2.3M uses.',
    actionUrl: '/strategy',
    read: false,
    createdAt: new Date(),
  },
  {
    id: 'notif_2',
    userId: 'user_1',
    type: 'post_published',
    title: 'Post Published',
    message: 'Your scheduled post "Morning Ritual" was published to Instagram and Facebook.',
    actionUrl: '/scheduler',
    read: false,
    createdAt: new Date(Date.now() - 3600000),
  },
]

export const useNotificationStore = create<NotificationState>()((set, get) => ({
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter((n) => !n.read).length,

  setNotifications: (notifications) =>
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
    }),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),
  markAsRead: (id) =>
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read).length,
      }
    }),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  deleteNotification: (id) =>
    set((state) => {
      const notification = state.notifications.find((n) => n.id === id)
      return {
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: notification && !notification.read
          ? state.unreadCount - 1
          : state.unreadCount,
      }
    }),
}))
