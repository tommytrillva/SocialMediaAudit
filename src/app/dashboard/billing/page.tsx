'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CreditCard,
  Check,
  Zap,
  Users,
  BarChart2,
  Sparkles,
  Shield,
  Crown,
  ArrowRight,
  Download,
  Calendar,
  AlertCircle,
} from 'lucide-react'
import { Header } from '@/components/dashboard/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/store'
import { cn, formatCurrency } from '@/lib/utils'
import type { SubscriptionTier } from '@/types'

const tiers = [
  {
    id: 'solopreneur' as SubscriptionTier,
    name: 'Solopreneur',
    price: 60,
    description: 'Perfect for independent creators and small businesses.',
    features: [
      { text: 'Basic AI Strategy', included: true },
      { text: '2 Social Platforms', included: true },
      { text: '50 Scheduled Posts/mo', included: true },
      { text: 'Basic Analytics', included: true },
      { text: 'Email Support', included: true },
      { text: 'Vision Board', included: false },
      { text: 'Team Collaboration', included: false },
      { text: 'Priority SEO', included: false },
    ],
    icon: Zap,
    popular: false,
    priceId: 'price_solopreneur', // Placeholder Stripe Price ID
  },
  {
    id: 'growth' as SubscriptionTier,
    name: 'Growth',
    price: 120,
    description: 'For growing brands ready to scale their presence.',
    features: [
      { text: 'Advanced AI Strategy', included: true },
      { text: '5 Social Platforms', included: true },
      { text: 'Unlimited Scheduled Posts', included: true },
      { text: 'Vision Board Access', included: true },
      { text: 'Content Repurposing', included: true },
      { text: 'Advanced Analytics', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Team Collaboration', included: false },
    ],
    icon: BarChart2,
    popular: true,
    priceId: 'price_growth',
  },
  {
    id: 'enterprise' as SubscriptionTier,
    name: 'Enterprise',
    price: 250,
    description: 'For agencies and teams managing multiple brands.',
    features: [
      { text: 'Everything in Growth', included: true },
      { text: 'Unlimited Platforms', included: true },
      { text: 'Team Collaboration (5 seats)', included: true },
      { text: 'Priority SEO Analysis', included: true },
      { text: 'Viral Trend Deep Dives', included: true },
      { text: 'Custom Integrations', included: true },
      { text: 'Dedicated Account Manager', included: true },
      { text: 'White-label Reports', included: true },
    ],
    icon: Crown,
    popular: false,
    priceId: 'price_enterprise',
  },
]

const invoices = [
  { id: 'inv_001', date: '2024-07-01', amount: 120, status: 'paid' },
  { id: 'inv_002', date: '2024-06-01', amount: 120, status: 'paid' },
  { id: 'inv_003', date: '2024-05-01', amount: 120, status: 'paid' },
  { id: 'inv_004', date: '2024-04-01', amount: 60, status: 'paid' },
]

export default function BillingPage() {
  const { user } = useAppStore()
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const currentTier = user?.subscription || 'growth'

  // Mock function to simulate Stripe checkout
  const handleSubscribe = async (priceId: string, tierId: string) => {
    setIsLoading(tierId)

    // In production, this would:
    // 1. Call your API endpoint
    // 2. Create a Stripe Checkout Session
    // 3. Redirect to Stripe Checkout

    // Simulated API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock redirect (in production: window.location.href = session.url)
    alert(`Would redirect to Stripe Checkout for ${tierId} plan (Price ID: ${priceId})`)

    setIsLoading(null)
  }

  // Mock function to manage subscription
  const handleManageSubscription = async () => {
    setIsLoading('manage')

    // In production, this would create a Stripe Customer Portal session
    await new Promise((resolve) => setTimeout(resolve, 1000))

    alert('Would redirect to Stripe Customer Portal')
    setIsLoading(null)
  }

  const currentPlan = tiers.find((t) => t.id === currentTier)

  return (
    <div className="min-h-screen">
      <Header
        title="Billing"
        description="Manage your subscription and payment methods."
      />

      <div className="p-6 space-y-8">
        {/* Current Plan */}
        <Card className="border-accent">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-luxury flex items-center justify-center">
                  {currentPlan && <currentPlan.icon className="w-7 h-7 text-background" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {currentPlan?.name} Plan
                    </h3>
                    <Badge variant="accent">Current</Badge>
                  </div>
                  <p className="text-foreground-muted mt-1">
                    {formatCurrency(currentPlan?.price || 0)}/month
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-foreground-muted">Next billing date</p>
                <p className="font-medium text-foreground">August 1, 2024</p>
              </div>
            </div>

            <div className="divider my-6" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-foreground-muted">
                <Shield className="w-4 h-4 text-success" />
                Your subscription renews automatically
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="secondary"
                  onClick={handleManageSubscription}
                  isLoading={isLoading === 'manage'}
                >
                  Manage Subscription
                </Button>
                <Button variant="ghost">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Update Payment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Comparison */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-6">Compare Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => {
              const isCurrentPlan = tier.id === currentTier
              const TierIcon = tier.icon

              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card
                    className={cn(
                      'relative h-full',
                      tier.popular && 'border-accent shadow-glow',
                      isCurrentPlan && 'bg-accent-muted/10'
                    )}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge variant="accent" className="shadow-lg">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={cn(
                            'w-10 h-10 rounded-xl flex items-center justify-center',
                            tier.popular
                              ? 'bg-gradient-luxury'
                              : 'bg-background-tertiary'
                          )}
                        >
                          <TierIcon
                            className={cn(
                              'w-5 h-5',
                              tier.popular ? 'text-background' : 'text-accent'
                            )}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{tier.name}</h3>
                          <p className="text-sm text-foreground-muted">{tier.description}</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <span className="text-3xl font-bold text-foreground">
                          {formatCurrency(tier.price)}
                        </span>
                        <span className="text-foreground-muted">/month</span>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {tier.features.map((feature, i) => (
                          <li
                            key={i}
                            className={cn(
                              'flex items-center gap-2 text-sm',
                              feature.included
                                ? 'text-foreground'
                                : 'text-foreground-subtle line-through'
                            )}
                          >
                            <Check
                              className={cn(
                                'w-4 h-4 flex-shrink-0',
                                feature.included ? 'text-success' : 'text-foreground-subtle'
                              )}
                            />
                            {feature.text}
                          </li>
                        ))}
                      </ul>

                      {isCurrentPlan ? (
                        <Button variant="secondary" className="w-full" disabled>
                          Current Plan
                        </Button>
                      ) : (
                        <Button
                          variant={tier.popular ? 'primary' : 'secondary'}
                          className="w-full"
                          onClick={() => handleSubscribe(tier.priceId, tier.id)}
                          isLoading={isLoading === tier.id}
                        >
                          {tier.price > (currentPlan?.price || 0) ? 'Upgrade' : 'Switch'}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-background-tertiary"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-background-elevated flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-foreground-muted" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {new Date(invoice.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-foreground-muted">Invoice {invoice.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-foreground">
                      {formatCurrency(invoice.amount)}
                    </span>
                    <Badge variant="success">Paid</Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage Info */}
        <Card>
          <CardHeader>
            <CardTitle>Current Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground-muted">Scheduled Posts</span>
                  <span className="text-sm font-medium text-foreground">23 / Unlimited</span>
                </div>
                <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: '23%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground-muted">Team Members</span>
                  <span className="text-sm font-medium text-foreground">1 / 1</span>
                </div>
                <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground-muted">AI Credits</span>
                  <span className="text-sm font-medium text-foreground">847 / 1000</span>
                </div>
                <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: '84.7%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enterprise CTA */}
        <Card className="bg-gradient-to-br from-accent-muted/20 to-background-secondary border-accent/30">
          <CardContent className="p-8 text-center">
            <Crown className="w-12 h-12 mx-auto text-accent mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Need a Custom Solution?
            </h3>
            <p className="text-foreground-muted max-w-lg mx-auto mb-6">
              For agencies managing 10+ brands or enterprises with specific requirements,
              we offer custom pricing and dedicated support.
            </p>
            <Button variant="primary">
              Contact Sales
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
