'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Zap,
  Brain,
  Palette,
  FolderOpen,
  Calendar,
  Search,
  ArrowRight,
  Check,
  Sparkles,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: Brain,
    title: 'The Brain',
    description: 'AI-powered strategy engine that analyzes trends and suggests content ideas aligned with your brand.',
  },
  {
    icon: Palette,
    title: 'Vision Board',
    description: 'Upload your brand assets, mood boards, and style guides. AI references them for every decision.',
  },
  {
    icon: FolderOpen,
    title: 'Media Vault',
    description: 'Centralized content library with team collaboration, approval workflows, and bulk uploads.',
  },
  {
    icon: Calendar,
    title: 'Smart Scheduler',
    description: 'Multi-platform scheduling with optimal timing suggestions and content repurposing tracking.',
  },
  {
    icon: Search,
    title: 'SEO Studio',
    description: 'AI-generated headlines, captions, hashtags, and posting strategies for maximum reach.',
  },
  {
    icon: Sparkles,
    title: 'Trend Alerts',
    description: 'Real-time viral trend detection with actionable suggestions for your niche.',
  },
]

const tiers = [
  {
    name: 'Solopreneur',
    price: 60,
    description: 'Perfect for independent creators and small businesses.',
    features: [
      'Basic AI Strategy',
      '2 Social Platforms',
      '50 Scheduled Posts/mo',
      'Basic Analytics',
      'Email Support',
    ],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: 120,
    description: 'For growing brands ready to scale their presence.',
    features: [
      'Advanced AI Strategy',
      '5 Social Platforms',
      'Unlimited Scheduled Posts',
      'Vision Board Access',
      'Content Repurposing',
      'Advanced Analytics',
      'Priority Support',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 250,
    description: 'For agencies and teams managing multiple brands.',
    features: [
      'Everything in Growth',
      'Unlimited Platforms',
      'Team Collaboration (5 seats)',
      'Priority SEO Analysis',
      'Viral Trend Deep Dives',
      'Custom Integrations',
      'Dedicated Account Manager',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

const platforms = [
  { icon: Instagram, name: 'Instagram' },
  { icon: Facebook, name: 'Facebook' },
  { icon: Youtube, name: 'YouTube' },
  { icon: Linkedin, name: 'LinkedIn' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-luxury flex items-center justify-center">
              <Zap className="w-5 h-5 text-background" />
            </div>
            <span className="font-display text-xl font-bold gradient-text">Velocity</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-foreground-muted hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-muted text-accent text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Social Media Management
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight">
              Social Media
              <br />
              <span className="gradient-text">Without the Stress</span>
            </h1>
            <p className="mt-6 text-xl text-foreground-muted max-w-2xl mx-auto">
              Velocity is your AI-powered command center for social media. Strategy, scheduling,
              analytics, and SEO — all in one premium platform.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Start Free Trial
              </Button>
              <Button variant="secondary" size="lg">
                Watch Demo
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6">
              {platforms.map((platform) => (
                <div
                  key={platform.name}
                  className="w-12 h-12 rounded-xl bg-background-secondary border border-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:border-accent transition-colors"
                >
                  <platform.icon className="w-6 h-6" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-background-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              Everything You Need
            </h2>
            <p className="mt-4 text-lg text-foreground-muted">
              One platform to manage your entire social media presence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-background border border-border hover:border-accent/50 hover:shadow-glow transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-muted flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground-muted">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-foreground-muted">
              Choose the plan that fits your needs. Cancel anytime.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-2xl border ${
                  tier.highlighted
                    ? 'bg-gradient-to-b from-accent-muted/20 to-background border-accent shadow-glow'
                    : 'bg-background-secondary border-border'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-gradient-luxury text-background text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground">{tier.name}</h3>
                  <p className="text-foreground-muted text-sm mt-1">{tier.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">${tier.price}</span>
                  <span className="text-foreground-muted">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-foreground-muted">
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={tier.highlighted ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-background-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              Ready to Transform Your
              <br />
              <span className="gradient-text">Social Media Strategy?</span>
            </h2>
            <p className="mt-6 text-lg text-foreground-muted">
              Join thousands of businesses using Velocity to grow their online presence.
            </p>
            <div className="mt-10">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Start Your Free Trial
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-luxury flex items-center justify-center">
              <Zap className="w-4 h-4 text-background" />
            </div>
            <span className="font-display font-bold text-foreground">Velocity</span>
          </div>
          <p className="text-foreground-muted text-sm">
            © 2024 Velocity. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
