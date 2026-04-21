import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ClawFarm — Decentralized AI Compute Marketplace',
  description: 'Non-custodial AI compute marketplace on Solana. Deposit USDC, choose eco/auto/premium routing, consume AI inference from permissionless Providers. On-chain settlement. No platform holds your funds.',
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
