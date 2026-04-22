# EcoCleanPath — Headless WooCommerce Store

A blazing-fast, deployable-to-Cloudflare Pages headless e-commerce frontend for [www.ecocleanpath.com](https://www.ecocleanpath.com).

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (cart state with localStorage persistence)
- **WooCommerce REST API** (backend)
- **Cloudflare Pages** (deployment target)

## Features

- ✅ Full product catalog (2046 products, 9 brand categories)
- ✅ Product search, category filter, sorting, pagination
- ✅ Product detail pages with image gallery
- ✅ Shopping cart (persistent across sessions)
- ✅ Checkout with order creation via WooCommerce API
- ✅ Wishlist, My Account, Order Tracking
- ✅ Static pages (About Us, Contact, Blog, Policies)
- ✅ Mobile-first responsive design
- ✅ Sticky header with mini cart dropdown
- ✅ Newsletter signup

## Setup

```bash
npm install
```

Copy and configure environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
WOO_URL=https://www.ecocleanpath.com/wp-json/wc/v3
WC_CONSUMER_KEY=ck_your_key_here
WC_CONSUMER_SECRET=cs_your_secret_here
WORDPRESS_USERNAME=admin
WORDPRESS_APP_PASSWORD=xxxx_xxxx_xxxx_xxxx_xxxx
NEXT_PUBLIC_SITE_URL=https://www.ecocleanpath.com
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
```

Output goes to `.next/`. For full static export, configure `output: 'export'` in `next.config.js`.

## Deploy to Cloudflare Pages

1. Push to a GitHub repository
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages
3. Create a project, connect your GitHub repo
4. Set build command: `npm run build`
5. Set output directory: `.next`
6. Add environment variables in Cloudflare Pages settings
7. Deploy

Or use Wrangler:

```bash
npx wrangler pages deploy .next
```

## Pages

| Route | Description |
|------|-------------|
| `/` | Homepage — hero, brands, featured products |
| `/shop` | Product listing with filters |
| `/shop/[category]` | Category filtered products |
| `/product/[slug]` | Product detail page |
| `/cart` | Shopping cart |
| `/checkout` | Multi-step checkout |
| `/wishlist` | Saved products |
| `/my-account` | Login / account |
| `/order-tracking` | Track order by ID |
| `/about-us`, `/contact`, `/blog` | Content pages |
| `/shipping-policy`, `/refund-policy`, `/privacy-policy`, `/terms-and-conditions` | Policy pages |

## API Data

- **2046 products** across 9 brand categories
- Categories: For Bissell (282), For Ecovacs (1238), For Eufy (56), For Karcher (28), For Qihoo (36), For Roborock (178), For Shark (10), For Tineco (218)
- Data fetched from WooCommerce REST API with 5-minute cache