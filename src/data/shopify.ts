// Shopify Buy Button config. Fill these after creating a Shopify store + Buy Button
// sales channel. Until `domain` and `storefrontAccessToken` are set, all kit cards
// gracefully fall back to WhatsApp enquiry (see ShopifyBuyButton.tsx).
//
// Where to find these:
//   Shopify admin → Sales channels → Buy Button → (create) → the generated embed code
//   contains `domain`, `storefrontAccessToken`, and each product `id`.
export const SHOPIFY = {
  domain: '', // e.g. 'the-artrobe.myshopify.com'
  storefrontAccessToken: '', // public Storefront API token from the Buy Button channel
};

export const shopifyConfigured = () =>
  Boolean(SHOPIFY.domain && SHOPIFY.storefrontAccessToken);
