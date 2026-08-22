'use client';
import { useEffect, useRef } from 'react';
import { SHOPIFY, shopifyConfigured } from '@/data/shopify';

const SDK_URL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

declare global {
  interface Window {
    ShopifyBuy?: any;
  }
}

let sdkPromise: Promise<void> | null = null;
function loadSdk(): Promise<void> {
  if (window.ShopifyBuy?.UI) return Promise.resolve();
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.async = true;
    s.src = SDK_URL;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Shopify SDK failed to load'));
    document.head.appendChild(s);
  });
  return sdkPromise;
}

export default function ShopifyBuyButton({ productId }: { productId: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shopifyConfigured() || !ref.current) return;
    let cancelled = false;

    loadSdk()
      .then(() => {
        if (cancelled || !ref.current) return;
        const client = window.ShopifyBuy.buildClient({
          domain: SHOPIFY.domain,
          storefrontAccessToken: SHOPIFY.storefrontAccessToken,
        });
        window.ShopifyBuy.UI.onReady(client).then((ui: any) => {
          if (cancelled || !ref.current) return;
          ui.createComponent('product', {
            id: productId,
            node: ref.current,
            moneyFormat: '%E2%82%B9%7B%7Bamount%7D%7D',
            options: {
              product: {
                contents: { img: false, title: false, price: true },
                text: { button: 'Add to cart' },
                styles: {
                  button: {
                    'background-color': '#6E9E66',
                    'border-radius': '8px',
                    ':hover': { 'background-color': '#5c8656' },
                  },
                },
              },
              cart: {
                styles: { button: { 'background-color': '#6E9E66' } },
              },
            },
          });
        });
      })
      .catch(() => {
        /* leave the container empty; caller shows enquiry fallback */
      });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (!shopifyConfigured()) return null;
  return <div ref={ref} />;
}
