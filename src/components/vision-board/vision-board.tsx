'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import {
  Upload,
  Image as ImageIcon,
  Type,
  Palette,
  Sparkles,
  X,
  Plus,
  Trash2,
  Move,
  ZoomIn,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input, Textarea, Label } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useBrandStore } from '@/store'
import type { VisionBoardItem } from '@/types'

// Mock function to simulate embedding generation
const generateMockEmbedding = (): number[] => {
  return Array.from({ length: 1536 }, () => Math.random() * 2 - 1)
}

// Mock vector similarity search
const calculateCosineSimilarity = (a: number[], b: number[]): number => {
  if (a.length !== b.length) return 0
  let dotProduct = 0
  let normA = 0
  let normB = 0
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

interface VisionBoardProps {
  items: VisionBoardItem[]
  onAddItem: (item: Omit<VisionBoardItem, 'id' | 'createdAt'>) => void
  onRemoveItem: (id: string) => void
  onUpdateItem: (id: string, updates: Partial<VisionBoardItem>) => void
}

export function VisionBoard({ items, onAddItem, onRemoveItem, onUpdateItem }: VisionBoardProps) {
  const [activeTab, setActiveTab] = useState<'board' | 'text' | 'colors'>('board')
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [newText, setNewText] = useState('')
  const [newColors, setNewColors] = useState<string[]>([])
  const [colorInput, setColorInput] = useState('#c9a962')
  const { profile, updateProfile } = useBrandStore()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsProcessing(true)

    for (const file of acceptedFiles) {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 500))

      // Create a mock URL for the image
      const url = URL.createObjectURL(file)

      // Generate mock embedding (in production, this would call an embedding API)
      const embedding = generateMockEmbedding()

      const newItem: Omit<VisionBoardItem, 'id' | 'createdAt'> = {
        userId: 'user_1',
        type: 'image',
        content: url,
        metadata: {
          filename: file.name,
          size: file.size,
          mimeType: file.type,
        },
        embedding,
        position: {
          x: Math.random() * 60,
          y: Math.random() * 60,
        },
        size: {
          width: 200,
          height: 200,
        },
      }

      onAddItem(newItem)
    }

    setIsProcessing(false)
  }, [onAddItem])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    multiple: true,
  })

  const handleAddText = () => {
    if (!newText.trim()) return

    const embedding = generateMockEmbedding()

    onAddItem({
      userId: 'user_1',
      type: 'text',
      content: newText,
      embedding,
      position: {
        x: Math.random() * 60,
        y: Math.random() * 60,
      },
      size: {
        width: 250,
        height: 100,
      },
    })

    setNewText('')
  }

  const handleAddColor = () => {
    if (newColors.length >= 6) return
    setNewColors([...newColors, colorInput])
  }

  const handleSaveColors = () => {
    const embedding = generateMockEmbedding()

    onAddItem({
      userId: 'user_1',
      type: 'color',
      content: JSON.stringify(newColors),
      metadata: { colors: newColors },
      embedding,
      position: {
        x: Math.random() * 60,
        y: Math.random() * 60,
      },
      size: {
        width: 300,
        height: 80,
      },
    })

    // Also update brand profile colors
    updateProfile({ colors: [...(profile?.colors || []), ...newColors] })
    setNewColors([])
  }

  const tabs = [
    { id: 'board', label: 'Board', icon: ImageIcon },
    { id: 'text', label: 'Add Text', icon: Type },
    { id: 'colors', label: 'Colors', icon: Palette },
  ]

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Board Area */}
        <div className="lg:col-span-2">
          <Card className="min-h-[600px]">
            <CardContent className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'board' && (
                  <motion.div
                    key="board"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {/* Dropzone */}
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
                        {isDragActive ? 'Drop files here' : 'Drag & drop images or click to browse'}
                      </p>
                      <p className="text-sm text-foreground-muted mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>

                    {/* Vision Board Grid */}
                    <div className="relative min-h-[400px] bg-background-tertiary rounded-xl p-4 overflow-hidden">
                      {items.length === 0 ? (
                        <div className="absolute inset-0 flex items-center justify-center text-foreground-muted">
                          <div className="text-center">
                            <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>Your vision board is empty</p>
                            <p className="text-sm mt-1">Upload images, add text, or colors to get started</p>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-4">
                          {items.map((item) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className={cn(
                                'relative group rounded-xl overflow-hidden border-2 transition-all cursor-pointer',
                                selectedItem === item.id
                                  ? 'border-accent shadow-glow'
                                  : 'border-transparent hover:border-border'
                              )}
                              onClick={() => setSelectedItem(item.id === selectedItem ? null : item.id)}
                            >
                              {item.type === 'image' && (
                                <img
                                  src={item.content}
                                  alt="Vision board item"
                                  className="w-full h-40 object-cover"
                                />
                              )}
                              {item.type === 'text' && (
                                <div className="p-4 bg-background-elevated h-40 flex items-center justify-center">
                                  <p className="text-foreground text-center line-clamp-4">
                                    {item.content}
                                  </p>
                                </div>
                              )}
                              {item.type === 'color' && (
                                <div className="h-40 flex">
                                  {(item.metadata?.colors as string[] || []).map((color, i) => (
                                    <div
                                      key={i}
                                      className="flex-1"
                                      style={{ backgroundColor: color }}
                                    />
                                  ))}
                                </div>
                              )}

                              {/* Hover Actions */}
                              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    onRemoveItem(item.id)
                                  }}
                                  className="p-2 rounded-lg bg-error text-white hover:bg-error/80 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Embedding Indicator */}
                              {item.embedding && (
                                <div className="absolute top-2 right-2">
                                  <Badge variant="accent" size="sm">
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    Embedded
                                  </Badge>
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>

                    {isProcessing && (
                      <div className="flex items-center justify-center gap-2 text-foreground-muted">
                        <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                        <span>Processing and generating embeddings...</span>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'text' && (
                  <motion.div
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <Label>Brand Voice & Keywords</Label>
                      <Textarea
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        placeholder="Add brand voice descriptions, key messages, taglines, or any text that represents your brand identity..."
                        rows={6}
                      />
                    </div>
                    <Button onClick={handleAddText} disabled={!newText.trim()}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Vision Board
                    </Button>
                  </motion.div>
                )}

                {activeTab === 'colors' && (
                  <motion.div
                    key="colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <Label>Brand Color Palette</Label>
                      <p className="text-sm text-foreground-muted mb-4">
                        Add up to 6 colors that represent your brand
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={colorInput}
                            onChange={(e) => setColorInput(e.target.value)}
                            className="w-12 h-12 rounded-lg cursor-pointer border-0"
                          />
                          <Input
                            value={colorInput}
                            onChange={(e) => setColorInput(e.target.value)}
                            className="w-28"
                          />
                        </div>
                        <Button
                          variant="secondary"
                          onClick={handleAddColor}
                          disabled={newColors.length >= 6}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Color
                        </Button>
                      </div>
                    </div>

                    {newColors.length > 0 && (
                      <div className="space-y-4">
                        <Label>Selected Colors</Label>
                        <div className="flex gap-3">
                          {newColors.map((color, index) => (
                            <div key={index} className="relative group">
                              <div
                                className="w-16 h-16 rounded-xl shadow-lg"
                                style={{ backgroundColor: color }}
                              />
                              <button
                                onClick={() => setNewColors(newColors.filter((_, i) => i !== index))}
                                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-error text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                              >
                                <X className="w-3 h-3" />
                              </button>
                              <p className="text-xs text-foreground-muted mt-1 text-center">
                                {color}
                              </p>
                            </div>
                          ))}
                        </div>
                        <Button onClick={handleSaveColors}>
                          <Check className="w-4 h-4 mr-2" />
                          Save Palette to Vision Board
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* Brand Profile Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Brand Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-foreground-muted">Brand Name</p>
                <p className="font-medium text-foreground">{profile?.name || 'Not set'}</p>
              </div>
              <div>
                <p className="text-sm text-foreground-muted">Industry</p>
                <p className="font-medium text-foreground">{profile?.industry || 'Not set'}</p>
              </div>
              <div>
                <p className="text-sm text-foreground-muted">Target Audience</p>
                <p className="font-medium text-foreground">{profile?.targetAudience || 'Not set'}</p>
              </div>
              <div>
                <p className="text-sm text-foreground-muted mb-2">Brand Voice</p>
                <div className="flex flex-wrap gap-2">
                  {profile?.brandVoice?.map((voice) => (
                    <Badge key={voice} variant="accent">{voice}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-foreground-muted mb-2">Colors</p>
                <div className="flex gap-2">
                  {profile?.colors?.map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-lg border border-border"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vector Context</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground-muted">Total Embeddings</span>
                  <Badge variant="accent">{items.filter(i => i.embedding).length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground-muted">Images</span>
                  <span className="text-foreground">{items.filter(i => i.type === 'image').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground-muted">Text Elements</span>
                  <span className="text-foreground">{items.filter(i => i.type === 'text').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground-muted">Color Palettes</span>
                  <span className="text-foreground">{items.filter(i => i.type === 'color').length}</span>
                </div>
                <div className="divider my-4" />
                <p className="text-xs text-foreground-subtle">
                  All vision board items are converted to vector embeddings for AI context.
                  The AI references this data when generating content suggestions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
