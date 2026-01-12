'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import {
  Upload,
  Grid,
  List,
  Search,
  Filter,
  MoreVertical,
  Trash2,
  Download,
  Share2,
  Check,
  X,
  Clock,
  Image as ImageIcon,
  Video,
  FileText,
  FolderPlus,
  Tag,
  CheckCircle,
  XCircle,
  Eye,
} from 'lucide-react'
import { Header } from '@/components/dashboard/header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input, Select } from '@/components/ui/input'
import { useMediaStore } from '@/store'
import { cn, formatRelativeTime } from '@/lib/utils'
import type { MediaItem } from '@/types'
import { v4 as uuidv4 } from 'uuid'

export default function VaultPage() {
  const {
    items,
    selectedItems,
    filter,
    setFilter,
    addItem,
    updateItem,
    deleteItem,
    toggleSelection,
    clearSelection,
  } = useMediaStore()

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isUploading, setIsUploading] = useState(false)
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true)

    for (const file of acceptedFiles) {
      await new Promise(resolve => setTimeout(resolve, 300))

      const url = URL.createObjectURL(file)
      const isVideo = file.type.startsWith('video/')

      const newItem: MediaItem = {
        id: uuidv4(),
        userId: 'user_1',
        type: isVideo ? 'video' : 'image',
        url,
        thumbnailUrl: url,
        name: file.name,
        size: file.size,
        mimeType: file.type,
        tags: [],
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      addItem(newItem)
    }

    setIsUploading(false)
  }, [addItem])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'video/*': ['.mp4', '.mov', '.avi', '.webm'],
    },
    multiple: true,
  })

  // Filter items
  const filteredItems = items.filter((item) => {
    if (filter.type !== 'all' && item.type !== filter.type) return false
    if (filter.status !== 'all' && item.status !== filter.status) return false
    if (filter.search && !item.name.toLowerCase().includes(filter.search.toLowerCase())) return false
    return true
  })

  const handleApprove = (id: string) => {
    updateItem(id, { status: 'approved', approvedBy: 'user_1' })
  }

  const handleReject = (id: string) => {
    updateItem(id, { status: 'rejected' })
  }

  const handleBulkDelete = () => {
    selectedItems.forEach((id) => deleteItem(id))
    clearSelection()
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const getStatusBadge = (status: MediaItem['status']) => {
    const variants = {
      pending: { variant: 'warning' as const, icon: Clock, label: 'Pending' },
      approved: { variant: 'success' as const, icon: CheckCircle, label: 'Approved' },
      rejected: { variant: 'error' as const, icon: XCircle, label: 'Rejected' },
    }
    const config = variants[status]
    return (
      <Badge variant={config.variant}>
        <config.icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Media Vault"
        description="Your centralized content library with team collaboration."
      />

      <div className="p-6 space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 w-full sm:w-auto">
            <Input
              placeholder="Search files..."
              value={filter.search}
              onChange={(e) => setFilter({ search: e.target.value })}
              leftIcon={<Search className="w-4 h-4" />}
              className="max-w-xs"
            />
            <Select
              value={filter.type}
              onChange={(e) => setFilter({ type: e.target.value as any })}
              className="w-32"
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
            </Select>
            <Select
              value={filter.status}
              onChange={(e) => setFilter({ status: e.target.value as any })}
              className="w-32"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            {selectedItems.length > 0 && (
              <Button variant="danger" size="sm" onClick={handleBulkDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete ({selectedItems.length})
              </Button>
            )}
            <div className="flex items-center gap-1 p-1 bg-background-secondary rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2 rounded-md transition-colors',
                  viewMode === 'grid' ? 'bg-accent text-background' : 'text-foreground-muted hover:text-foreground'
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2 rounded-md transition-colors',
                  viewMode === 'list' ? 'bg-accent text-background' : 'text-foreground-muted hover:text-foreground'
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Upload Zone */}
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all',
            isDragActive
              ? 'border-accent bg-accent-muted/20'
              : 'border-border hover:border-accent/50'
          )}
        >
          <input {...getInputProps()} />
          <Upload className="w-10 h-10 mx-auto text-foreground-muted mb-4" />
          <p className="text-foreground font-medium">
            {isDragActive ? 'Drop files here' : 'Drag & drop files or click to browse'}
          </p>
          <p className="text-sm text-foreground-muted mt-1">
            Supports images and videos up to 100MB
          </p>
          {isUploading && (
            <div className="mt-4 flex items-center justify-center gap-2 text-accent">
              <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              Uploading...
            </div>
          )}
        </div>

        {/* Media Grid/List */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={cn(
                    'group relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer',
                    selectedItems.includes(item.id)
                      ? 'border-accent shadow-glow'
                      : 'border-transparent hover:border-border'
                  )}
                  onClick={() => toggleSelection(item.id)}
                >
                  <div className="aspect-square bg-background-tertiary">
                    {item.type === 'image' ? (
                      <img
                        src={item.thumbnailUrl || item.url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Video className="w-12 h-12 text-foreground-muted" />
                      </div>
                    )}
                  </div>

                  {/* Selection Checkbox */}
                  <div
                    className={cn(
                      'absolute top-2 left-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                      selectedItems.includes(item.id)
                        ? 'bg-accent border-accent'
                        : 'bg-background/80 border-foreground-muted opacity-0 group-hover:opacity-100'
                    )}
                  >
                    {selectedItems.includes(item.id) && (
                      <Check className="w-4 h-4 text-background" />
                    )}
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(item.status)}
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-foreground-muted">{formatFileSize(item.size)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setPreviewItem(item)
                          }}
                          className="p-1.5 rounded-lg bg-background-elevated hover:bg-accent hover:text-background transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {item.status === 'pending' && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleApprove(item.id)
                              }}
                              className="p-1.5 rounded-lg bg-success/20 text-success hover:bg-success hover:text-white transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleReject(item.id)
                              }}
                              className="p-1.5 rounded-lg bg-error/20 text-error hover:bg-error hover:text-white transition-colors"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteItem(item.id)
                          }}
                          className="p-1.5 rounded-lg bg-error/20 text-error hover:bg-error hover:text-white transition-colors ml-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer',
                    selectedItems.includes(item.id)
                      ? 'bg-accent-muted/20 border-accent'
                      : 'bg-background-secondary border-transparent hover:border-border'
                  )}
                  onClick={() => toggleSelection(item.id)}
                >
                  <div
                    className={cn(
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                      selectedItems.includes(item.id)
                        ? 'bg-accent border-accent'
                        : 'border-foreground-muted'
                    )}
                  >
                    {selectedItems.includes(item.id) && (
                      <Check className="w-4 h-4 text-background" />
                    )}
                  </div>

                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-background-tertiary flex-shrink-0">
                    {item.type === 'image' ? (
                      <img
                        src={item.thumbnailUrl || item.url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Video className="w-6 h-6 text-foreground-muted" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{item.name}</p>
                    <p className="text-sm text-foreground-muted">
                      {formatFileSize(item.size)} • {formatRelativeTime(item.createdAt)}
                    </p>
                  </div>

                  {getStatusBadge(item.status)}

                  <div className="flex items-center gap-2">
                    {item.status === 'pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleApprove(item.id)
                          }}
                        >
                          <CheckCircle className="w-4 h-4 text-success" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleReject(item.id)
                          }}
                        >
                          <XCircle className="w-4 h-4 text-error" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteItem(item.id)
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <FolderPlus className="w-12 h-12 mx-auto text-foreground-muted mb-4" />
            <p className="text-foreground-muted">No media files found</p>
            <p className="text-sm text-foreground-subtle mt-1">
              Upload some files or adjust your filters
            </p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setPreviewItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden bg-background-secondary"
              onClick={(e) => e.stopPropagation()}
            >
              {previewItem.type === 'image' ? (
                <img
                  src={previewItem.url}
                  alt={previewItem.name}
                  className="max-h-[70vh] w-auto mx-auto"
                />
              ) : (
                <video
                  src={previewItem.url}
                  controls
                  className="max-h-[70vh] w-auto mx-auto"
                />
              )}
              <div className="p-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{previewItem.name}</p>
                    <p className="text-sm text-foreground-muted">
                      {formatFileSize(previewItem.size)} • {previewItem.mimeType}
                    </p>
                  </div>
                  <Button variant="ghost" onClick={() => setPreviewItem(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
