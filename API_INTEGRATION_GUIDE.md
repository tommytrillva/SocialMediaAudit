# Velocity - API Integration Guide

> Complete setup manual for connecting all external services to Velocity.

## Table of Contents
1. [Overview](#overview)
2. [Environment Setup](#environment-setup)
3. [AI Services](#ai-services)
4. [Social Media Platform APIs](#social-media-platform-apis)
5. [Payment Processing](#payment-processing)
6. [Database & Storage](#database--storage)
7. [Authentication](#authentication)
8. [Quick Reference Table](#quick-reference-table)

---

## Overview

Velocity requires integration with multiple external services to provide its full functionality. This guide walks you through obtaining and configuring each API key.

**Important:** All API keys should be stored in your `.env.local` file and NEVER committed to version control.

---

## Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in each variable as you obtain keys from the services below.

3. Restart your development server after adding new keys:
   ```bash
   npm run dev
   ```

---

## AI Services

### Anthropic Claude API

| Field | Value |
|-------|-------|
| **API Name** | Anthropic Claude API |
| **Why Needed** | Powers the "Brain" AI Strategy Engine - generates content ideas, analyzes brand alignment, provides strategic recommendations, and processes vision board context for personalized suggestions. |
| **Environment Variable** | `ANTHROPIC_API_KEY` |

**How to Get the Key:**

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Navigate to **API Keys** in the left sidebar
4. Click **Create Key**
5. Name it "Velocity Production" (or similar)
6. Copy the key immediately (it won't be shown again)
7. Add to `.env.local`:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx
   ```

**Recommended Plan:** Pro ($20/month) for production use with higher rate limits.

---

### OpenAI API (Optional - Embeddings)

| Field | Value |
|-------|-------|
| **API Name** | OpenAI API |
| **Why Needed** | Generates vector embeddings for the Vision Board feature, enabling semantic search and brand alignment matching. Alternative to using Anthropic for embeddings. |
| **Environment Variable** | `OPENAI_API_KEY` |

**How to Get the Key:**

1. Go to [platform.openai.com](https://platform.openai.com/)
2. Sign up or log in
3. Click your profile icon → **View API Keys**
4. Click **Create new secret key**
5. Name it "Velocity Embeddings"
6. Copy and add to `.env.local`:
   ```
   OPENAI_API_KEY=sk-xxxxxxxxxxxxx
   ```

**Note:** Only needed if you prefer OpenAI embeddings over Anthropic. The `text-embedding-3-small` model is cost-effective for vision board vectors.

---

## Social Media Platform APIs

### Meta (Facebook & Instagram)

| Field | Value |
|-------|-------|
| **API Name** | Meta Graph API |
| **Why Needed** | Enables posting to Facebook Pages and Instagram Business accounts, fetching analytics, and managing scheduled content. |
| **Environment Variables** | `META_APP_ID`, `META_APP_SECRET` |

**How to Get the Keys:**

1. Go to [developers.facebook.com](https://developers.facebook.com/)
2. Click **My Apps** → **Create App**
3. Select **Business** type
4. Fill in app details:
   - App Name: "Velocity Social Manager"
   - Contact Email: your business email
5. Once created, go to **Settings** → **Basic**
6. Copy **App ID** and **App Secret**
7. Add to `.env.local`:
   ```
   META_APP_ID=1234567890
   META_APP_SECRET=abcdef123456
   ```

**Required Permissions:**
- `pages_manage_posts`
- `pages_read_engagement`
- `instagram_basic`
- `instagram_content_publish`
- `business_management`

**Important:** You must complete Meta's App Review process for production use.

---

### TikTok for Business

| Field | Value |
|-------|-------|
| **API Name** | TikTok Content Posting API |
| **Why Needed** | Enables video uploading, scheduling, and analytics retrieval for TikTok Business accounts. |
| **Environment Variables** | `TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET` |

**How to Get the Keys:**

1. Go to [developers.tiktok.com](https://developers.tiktok.com/)
2. Click **Manage Apps** → **Create App**
3. Select **Content Posting API**
4. Fill in business details and submit for review
5. Once approved, go to **App Details**
6. Copy **Client Key** and **Client Secret**
7. Add to `.env.local`:
   ```
   TIKTOK_CLIENT_KEY=awxxxxxxxxxxxxx
   TIKTOK_CLIENT_SECRET=xxxxxxxxxxxxx
   ```

**Note:** TikTok requires business verification and can take 2-5 business days.

---

### YouTube Data API

| Field | Value |
|-------|-------|
| **API Name** | YouTube Data API v3 |
| **Why Needed** | Manages video uploads, playlist organization, and retrieves channel analytics for content strategy. |
| **Environment Variables** | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` |

**How to Get the Keys:**

1. Go to [console.cloud.google.com](https://console.cloud.google.com/)
2. Create a new project: "Velocity YouTube Integration"
3. Enable **YouTube Data API v3**:
   - APIs & Services → Library → Search "YouTube Data API v3" → Enable
4. Create OAuth credentials:
   - APIs & Services → Credentials → Create Credentials → OAuth Client ID
   - Application type: Web application
   - Add authorized redirect URI: `https://yourdomain.com/api/auth/callback/google`
5. Copy Client ID and Client Secret
6. Add to `.env.local`:
   ```
   GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxx
   ```

**Quota:** Default quota is 10,000 units/day. Request increase if needed.

---

### LinkedIn Marketing API

| Field | Value |
|-------|-------|
| **API Name** | LinkedIn Marketing API |
| **Why Needed** | Enables posting to LinkedIn company pages and personal profiles, plus retrieves engagement analytics. |
| **Environment Variables** | `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET` |

**How to Get the Keys:**

1. Go to [linkedin.com/developers](https://www.linkedin.com/developers/)
2. Click **Create App**
3. Fill in:
   - App name: "Velocity Social Manager"
   - LinkedIn Page: Your company page
   - App logo: Upload your logo
4. Under **Products**, request access to:
   - Share on LinkedIn
   - Marketing Developer Platform
5. Go to **Auth** tab
6. Copy Client ID and Client Secret
7. Add to `.env.local`:
   ```
   LINKEDIN_CLIENT_ID=77xxxxxxxxxxxxx
   LINKEDIN_CLIENT_SECRET=xxxxxxxxxxxxx
   ```

**Note:** Marketing API access requires company verification.

---

## Payment Processing

### Stripe

| Field | Value |
|-------|-------|
| **API Name** | Stripe Payments API |
| **Why Needed** | Handles subscription billing for all three tiers (Solopreneur $60, Growth $120, Enterprise $250), manages customer payment methods, and processes recurring charges. |
| **Environment Variables** | `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` |

**How to Get the Keys:**

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com/)
2. Sign up or log in
3. For development, toggle to **Test mode** (top right)
4. Go to **Developers** → **API Keys**
5. Copy both keys:
   - Publishable key (pk_test_...)
   - Secret key (sk_test_...)
6. Set up webhooks:
   - Developers → Webhooks → Add endpoint
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid`, `invoice.payment_failed`
7. Copy the webhook signing secret
8. Add to `.env.local`:
   ```
   STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
   STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
   ```

**Creating Products (Required):**

Run these commands in Stripe CLI or create manually in dashboard:

```bash
# Solopreneur Tier
stripe products create --name="Velocity Solopreneur" --description="Basic Strategy + Scheduling"
stripe prices create --product=prod_xxx --unit-amount=6000 --currency=usd --recurring[interval]=month

# Growth Tier
stripe products create --name="Velocity Growth" --description="Advanced Analytics + Repurposing + Vision Board"
stripe prices create --product=prod_xxx --unit-amount=12000 --currency=usd --recurring[interval]=month

# Enterprise Tier
stripe products create --name="Velocity Enterprise" --description="Team seats + Priority SEO + Viral Trend Deep Dives"
stripe prices create --product=prod_xxx --unit-amount=25000 --currency=usd --recurring[interval]=month
```

Add the price IDs to your environment:
```
STRIPE_PRICE_SOLOPRENEUR=price_xxxxxxxxxxxxx
STRIPE_PRICE_GROWTH=price_xxxxxxxxxxxxx
STRIPE_PRICE_ENTERPRISE=price_xxxxxxxxxxxxx
```

---

## Database & Storage

### Supabase (PostgreSQL + Vector + Storage)

| Field | Value |
|-------|-------|
| **API Name** | Supabase |
| **Why Needed** | Primary database (PostgreSQL) for all user data, pgvector extension for Vision Board embeddings, file storage for media vault, and real-time subscriptions for team collaboration. |
| **Environment Variables** | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |

**How to Get the Keys:**

1. Go to [supabase.com](https://supabase.com/)
2. Sign up and create a new project:
   - Name: "velocity-production"
   - Database Password: (save this securely)
   - Region: Choose closest to your users
3. Wait for project to initialize (~2 minutes)
4. Go to **Settings** → **API**
5. Copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key
6. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxxxxxxxxxx
   SUPABASE_SERVICE_ROLE_KEY=eyJxxxxxxxxxxxxx
   ```

**Enable pgvector Extension:**

1. Go to **SQL Editor** in Supabase dashboard
2. Run:
   ```sql
   create extension if not exists vector;
   ```

**Storage Bucket Setup:**

1. Go to **Storage** in Supabase dashboard
2. Create bucket: "media-vault"
3. Set policy to allow authenticated uploads

---

### Upstash Redis (Optional - Queue Management)

| Field | Value |
|-------|-------|
| **API Name** | Upstash Redis |
| **Why Needed** | Manages the scheduling queue for posts, handles rate limiting, and provides fast caching for frequently accessed data. |
| **Environment Variables** | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` |

**How to Get the Keys:**

1. Go to [upstash.com](https://upstash.com/)
2. Sign up and create a new Redis database
3. Choose the region closest to your Supabase project
4. Copy the REST URL and Token from the dashboard
5. Add to `.env.local`:
   ```
   UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
   UPSTASH_REDIS_REST_TOKEN=xxxxxxxxxxxxx
   ```

---

## Authentication

### NextAuth.js Configuration

| Field | Value |
|-------|-------|
| **API Name** | NextAuth.js |
| **Why Needed** | Handles user authentication, session management, OAuth flows for social platform connections, and team member access control. |
| **Environment Variables** | `NEXTAUTH_SECRET`, `NEXTAUTH_URL` |

**How to Configure:**

1. Generate a secure secret:
   ```bash
   openssl rand -base64 32
   ```
2. Add to `.env.local`:
   ```
   NEXTAUTH_SECRET=your-generated-secret-here
   NEXTAUTH_URL=http://localhost:3000
   ```

**Note:** Change `NEXTAUTH_URL` to your production domain when deploying.

---

## Quick Reference Table

| Service | Why Needed | Environment Variable(s) | Get Key URL |
|---------|-----------|------------------------|-------------|
| **Anthropic Claude** | AI Strategy Engine, content analysis, brand alignment | `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com/) |
| **OpenAI** | Vision Board embeddings (optional) | `OPENAI_API_KEY` | [platform.openai.com](https://platform.openai.com/) |
| **Meta Graph API** | Facebook & Instagram posting/analytics | `META_APP_ID`, `META_APP_SECRET` | [developers.facebook.com](https://developers.facebook.com/) |
| **TikTok API** | TikTok video posting/analytics | `TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET` | [developers.tiktok.com](https://developers.tiktok.com/) |
| **YouTube API** | YouTube uploads/analytics | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | [console.cloud.google.com](https://console.cloud.google.com/) |
| **LinkedIn API** | LinkedIn posting/analytics | `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET` | [linkedin.com/developers](https://www.linkedin.com/developers/) |
| **Stripe** | Subscription billing | `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` | [dashboard.stripe.com](https://dashboard.stripe.com/) |
| **Supabase** | Database, vectors, storage | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | [supabase.com](https://supabase.com/) |
| **Upstash Redis** | Queue management, caching | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | [upstash.com](https://upstash.com/) |
| **NextAuth** | Authentication | `NEXTAUTH_SECRET`, `NEXTAUTH_URL` | Generated locally |

---

## Deployment Checklist

Before going to production:

- [ ] All API keys are set in production environment
- [ ] Stripe is switched from test to live mode
- [ ] Meta App Review is completed
- [ ] TikTok business verification is approved
- [ ] LinkedIn Marketing API access is granted
- [ ] Supabase is upgraded to Pro plan for production limits
- [ ] `NEXTAUTH_URL` is set to production domain
- [ ] Stripe webhook endpoint is updated to production URL
- [ ] All OAuth redirect URIs are updated to production domain

---

## Support

If you encounter issues with any integration:

1. Check the service's status page
2. Verify your API keys are correctly copied (no extra spaces)
3. Ensure your account has the required permissions/scopes
4. Check rate limits haven't been exceeded

For Velocity-specific issues, contact support or check our documentation.
