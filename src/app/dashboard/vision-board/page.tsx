'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/header'
import { VisionBoard } from '@/components/vision-board/vision-board'
import type { VisionBoardItem } from '@/types'
import { v4 as uuidv4 } from 'uuid'

// Mock initial items
const initialItems: VisionBoardItem[] = [
  {
    id: 'vb_1',
    userId: 'user_1',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    embedding: Array.from({ length: 1536 }, () => Math.random() * 2 - 1),
    position: { x: 0, y: 0 },
    size: { width: 200, height: 200 },
    createdAt: new Date(),
  },
  {
    id: 'vb_2',
    userId: 'user_1',
    type: 'text',
    content: 'Warm, authentic, premium quality. We believe in sustainable sourcing and community connection.',
    embedding: Array.from({ length: 1536 }, () => Math.random() * 2 - 1),
    position: { x: 220, y: 0 },
    size: { width: 250, height: 100 },
    createdAt: new Date(),
  },
  {
    id: 'vb_3',
    userId: 'user_1',
    type: 'color',
    content: JSON.stringify(['#2C1810', '#D4A574', '#F5E6D3', '#8B4513']),
    metadata: { colors: ['#2C1810', '#D4A574', '#F5E6D3', '#8B4513'] },
    embedding: Array.from({ length: 1536 }, () => Math.random() * 2 - 1),
    position: { x: 0, y: 220 },
    size: { width: 300, height: 80 },
    createdAt: new Date(),
  },
]

export default function VisionBoardPage() {
  const [items, setItems] = useState<VisionBoardItem[]>(initialItems)

  const handleAddItem = (item: Omit<VisionBoardItem, 'id' | 'createdAt'>) => {
    const newItem: VisionBoardItem = {
      ...item,
      id: uuidv4(),
      createdAt: new Date(),
    }
    setItems((prev) => [...prev, newItem])
  }

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleUpdateItem = (id: string, updates: Partial<VisionBoardItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    )
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Vision Board"
        description="Define your brand identity. The AI will reference this for all content decisions."
      />
      <div className="p-6">
        <VisionBoard
          items={items}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
          onUpdateItem={handleUpdateItem}
        />
      </div>
    </div>
  )
}
