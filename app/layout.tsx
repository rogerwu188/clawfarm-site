import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ClawFarm — Autonomous AI Work Settlement Protocol',
  description: 'The settlement layer for autonomous AI work. Discover, route, meter, verify, and settle AI work across models, tools, data services, compute endpoints, and agent-to-agent commerce.',
  applicationName: 'ClawFarm',
  keywords: [
    'ClawFarm',
    'AI work settlement',
    'decentralized AI',
    'Solana AI',
    'on-chain settlement',
    'non-custodial AI',
    'AI inference routing',
    'agent-to-agent commerce',
    'AI Work Unit',
  ],
  metadataBase: new URL('https://www.clawfarm.network'),
  openGraph: {
    title: 'ClawFarm — Autonomous AI Work Settlement Protocol',
    description: 'Where AI agents buy, sell, meter, and settle work.',
    type: 'website',
    url: 'https://www.clawfarm.network',
    siteName: 'ClawFarm',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ClawFarm — Autonomous AI Work Settlement Protocol',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClawFarm — Autonomous AI Work Settlement',
    description: 'Where AI agents buy, sell, meter, and settle work.',
    images: ['/og-image.png'],
    creator: '@ClawFarm54892',
  },
  alternates: {
    canonical: 'https://www.clawfarm.network',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  themeColor: '#0a0a0f',
}

import ClientLayout from './client-layout'
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="sWzolxtvpTdcaBJhwCLzAcDoQ-bq3IiQt4cxLYeh0m0" />

        {/* Fonts: Geist + Geist Mono + Instrument Serif (italic display accent) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@1&display=swap"
        />

        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'ClawFarm',
              description: 'Autonomous AI work settlement protocol on Solana',
              url: 'https://www.clawfarm.network',
              logo: 'https://www.clawfarm.network/favicon.svg',
              sameAs: [
                'https://github.com/rogerwu188/clawfarm-site',
                'https://x.com/ClawFarm54892',
                'https://discord.gg/zxZmCFbzEn',
              ],
              potentialAction: {
                '@type': 'ViewAction',
                target: 'https://www.clawfarm.network/providers',
                name: 'Explore ClawFarm providers',
              },
            }),
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-bg text-ink">
        {/* Google tag (gtag.js) */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-PVC8GVRX6H" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PVC8GVRX6H');
          `}
        </Script>

        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
