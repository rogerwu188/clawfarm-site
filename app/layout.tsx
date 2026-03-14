import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ClawFarm — The settlement protocol for autonomous agent work',
  description: 'Install a Skill, execute useful work, meter billed usage, and settle rewards on-chain.',
}

import ClientLayout from './client-layout'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
