import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';
import { INSTAGRAM_URL } from '@/data/social';
import SubscribePopup from '@/components/SubscribePopup';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import Script from 'next/script';
import { GA_ID } from '@/lib/analytics';

export const metadata: Metadata = {
  title: 'The Artrobe',
  description: 'Original paintings exploring form, stillness, and the quiet language of colour.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'The Artrobe',
  },
  formatDetection: { telephone: false },
  verification: {
    google: 'puxWadlf_42QWxnrY_9_CJIjcowtUGyEff0QJ-gUmDE',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#F7F5EF',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jahnvi',
  url: 'https://theartrobe.in',
  jobTitle: 'Artist',
  sameAs: [INSTAGRAM_URL],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        {children}
        <SubscribePopup />
        <WhatsAppWidget />

        {/* GA4 — afterInteractive so it never blocks first paint */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
