'use client'

import { useState } from 'react'
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Key,
  Save,
  Camera,
} from 'lucide-react'
import { Header } from '@/components/dashboard/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Label, Select, Textarea } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useAppStore, useBrandStore } from '@/store'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
  const { user } = useAppStore()
  const { profile, updateProfile } = useBrandStore()
  const [activeTab, setActiveTab] = useState('profile')
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    brandName: profile?.name || '',
    industry: profile?.industry || '',
    targetAudience: profile?.targetAudience || '',
  })

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    updateProfile({
      name: formData.brandName,
      industry: formData.industry,
      targetAudience: formData.targetAudience,
    })
    setIsSaving(false)
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'brand', label: 'Brand Settings', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Globe },
  ]

  return (
    <div className="min-h-screen">
      <Header title="Settings" description="Manage your account and preferences." />

      <div className="p-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all',
                  activeTab === tab.id
                    ? 'bg-accent-muted text-accent'
                    : 'text-foreground-muted hover:bg-background-elevated hover:text-foreground'
                )}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6">
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-luxury flex items-center justify-center">
                        {user?.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-10 h-10 text-background" />
                        )}
                      </div>
                      <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-accent text-background flex items-center justify-center">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{user?.name}</h3>
                      <p className="text-sm text-foreground-muted">{user?.email}</p>
                      <Badge variant="accent" className="mt-2">
                        {user?.subscription} Plan
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled
                      />
                    </div>
                  </div>

                  <Button variant="primary" onClick={handleSave} isLoading={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'brand' && (
              <Card>
                <CardHeader>
                  <CardTitle>Brand Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Brand Name</Label>
                    <Input
                      value={formData.brandName}
                      onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                      placeholder="Your brand name"
                    />
                  </div>

                  <div>
                    <Label>Industry</Label>
                    <Select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    >
                      <option value="">Select industry</option>
                      <option value="Food & Beverage">Food & Beverage</option>
                      <option value="Retail">Retail</option>
                      <option value="Technology">Technology</option>
                      <option value="Health & Wellness">Health & Wellness</option>
                      <option value="Professional Services">Professional Services</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Other">Other</option>
                    </Select>
                  </div>

                  <div>
                    <Label>Target Audience</Label>
                    <Textarea
                      value={formData.targetAudience}
                      onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                      placeholder="Describe your target audience..."
                      rows={3}
                    />
                  </div>

                  <Button variant="primary" onClick={handleSave} isLoading={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: 'Post Published', description: 'Get notified when your scheduled posts go live' },
                    { label: 'Trend Alerts', description: 'Receive alerts about trending content in your niche' },
                    { label: 'Team Activity', description: 'Notifications about team member actions' },
                    { label: 'Weekly Reports', description: 'Receive weekly performance summaries' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-background-tertiary">
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-sm text-foreground-muted">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-background-elevated peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-foreground-muted after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent peer-checked:after:bg-background"></div>
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Change Password</Label>
                    <div className="space-y-3 mt-2">
                      <Input type="password" placeholder="Current password" />
                      <Input type="password" placeholder="New password" />
                      <Input type="password" placeholder="Confirm new password" />
                    </div>
                  </div>
                  <Button variant="secondary">
                    <Key className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>

                  <div className="divider" />

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Two-Factor Authentication</h4>
                    <p className="text-sm text-foreground-muted mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="secondary">Enable 2FA</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'integrations' && (
              <Card>
                <CardHeader>
                  <CardTitle>Connected Platforms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: 'Instagram', connected: true },
                    { name: 'Facebook', connected: true },
                    { name: 'TikTok', connected: false },
                    { name: 'YouTube', connected: false },
                    { name: 'LinkedIn', connected: false },
                  ].map((platform) => (
                    <div key={platform.name} className="flex items-center justify-between p-4 rounded-xl bg-background-tertiary">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-background-elevated flex items-center justify-center">
                          <Globe className="w-5 h-5 text-foreground-muted" />
                        </div>
                        <span className="font-medium text-foreground">{platform.name}</span>
                      </div>
                      {platform.connected ? (
                        <Badge variant="success">Connected</Badge>
                      ) : (
                        <Button variant="secondary" size="sm">Connect</Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
