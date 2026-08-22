# Shopify Buy Button — Setup

The site uses Shopify's **Buy Button** (a client-side script) for real cart, checkout,
payments, and customer accounts — all hosted by Shopify. Nothing runs on our server, so
the site stays a static export on Netlify.

Until the two credentials below are filled in, every DIY-kit card falls back to a
**WhatsApp enquiry** button automatically. No code change is needed to go live — just config.

## 1. Create the store & products

1. Sign up at [shopify.com](https://www.shopify.com) (Basic plan is fine to start).
2. Add each DIY kit as a **Product** (title, price, image, inventory, shipping).
3. Note each product's numeric **ID** (in the product URL, or via the Buy Button embed code).

## 2. Enable the Buy Button sales channel

1. Shopify admin → **Settings → Apps and sales channels → Buy Button** (add it if missing).
2. Create a **Product** Buy Button for any product — Shopify generates an embed snippet.
3. From that snippet, copy:
   - `domain` — e.g. `the-artrobe.myshopify.com`
   - `storefrontAccessToken` — the public Storefront API token
   - each product `id`

## 3. Fill in the config

**`src/data/shopify.ts`** — store credentials:

```ts
export const SHOPIFY = {
  domain: 'the-artrobe.myshopify.com',
  storefrontAccessToken: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
};
```

**`src/data/kits.ts`** — add the matching `shopifyProductId` to each kit:

```ts
{ id: 'coastal-easy', name: 'Coastal Leaf', ..., shopifyProductId: '1234567890' },
```

Once both are set, cards render a live **Add to cart** button + Shopify cart; kits without a
`shopifyProductId` keep the WhatsApp fallback.

## Customer login / accounts

Enable in Shopify admin → **Settings → Customer accounts**. Login, order history, and
checkout all happen on Shopify's hosted pages — no auth code lives in this repo.

## What still needs real values (placeholders in the code)

- `src/data/social.ts` → `WHATSAPP_NUMBER` (currently `910000000000`)
- `src/data/social.ts` → `SUBSCRIBE_FORM` action URL + `entry.*` field IDs (from the Google Form)
- `src/data/shopify.ts` → `domain` + `storefrontAccessToken`
- `src/data/kits.ts` → `shopifyProductId` per kit (+ real names/prices/images)
