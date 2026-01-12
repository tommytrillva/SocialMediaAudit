'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bell, Plus, Command, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNotificationStore, useAppStore } from '@/store'
import { cn } from '@/lib/utils'

interface HeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
}

export function Header({ title, description, actions }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { notifications, unreadCount, markAsRead } = useNotificationStore()
  const { sidebarCollapsed } = useAppStore()
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Title Section */}
        <div>
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          {description && (
            <p className="text-sm text-foreground-muted">{description}</p>
          )}
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-background-secondary border border-border rounded-xl text-foreground-muted hover:border-border-accent transition-colors"
          >
            <Search className="w-4 h-4" />
            <span className="text-sm">Search...</span>
            <kbd className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 bg-background-tertiary rounded text-2xs text-foreground-subtle">
              <Command className="w-3 h-3" />K
            </kbd>
          </button>

          {/* Quick Create */}
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Create
          </Button>

          {/* AI Assistant */}
          <button className="w-10 h-10 rounded-xl bg-gradient-luxury flex items-center justify-center hover:shadow-glow transition-shadow">
            <Sparkles className="w-5 h-5 text-background" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative w-10 h-10 rounded-xl bg-background-secondary border border-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:border-border-accent transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-2xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {notificationsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setNotificationsOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-background-secondary border border-border rounded-2xl shadow-xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-border">
                      <h3 className="font-semibold text-foreground">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-foreground-muted">
                          No notifications yet
                        </div>
                      ) : (
                        notifications.slice(0, 5).map((notification) => (
                          <div
                            key={notification.id}
                            className={cn(
                              'p-4 border-b border-border last:border-0 cursor-pointer hover:bg-background-tertiary transition-colors',
                              !notification.read && 'bg-accent-muted/20'
                            )}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={cn(
                                  'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                                  notification.read ? 'bg-transparent' : 'bg-accent'
                                )}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-foreground-muted line-clamp-2 mt-1">
                                  {notification.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="p-3 border-t border-border">
                        <button className="w-full text-sm text-accent hover:text-accent-hover text-center font-medium">
                          View all notifications
                        </button>
                      </div>
                    )}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Custom Actions */}
          {actions}
        </div>
      </div>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-start justify-center pt-[20vh]"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-xl bg-background-secondary border border-border rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <Search className="w-5 h-5 text-foreground-muted" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-foreground placeholder:text-foreground-subtle focus:outline-none"
                  autoFocus
                />
                <kbd className="px-2 py-1 bg-background-tertiary rounded text-xs text-foreground-subtle">
                  ESC
                </kbd>
              </div>
              <div className="p-2">
                <p className="px-3 py-2 text-xs text-foreground-subtle uppercase tracking-wider">
                  Quick Actions
                </p>
                {[
                  { label: 'Create new post', icon: Plus },
                  { label: 'Generate content ideas', icon: Sparkles },
                  { label: 'Open scheduler', icon: Search },
                ].map((action, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-foreground-muted hover:bg-background-tertiary hover:text-foreground transition-colors"
                  >
                    <action.icon className="w-4 h-4" />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
