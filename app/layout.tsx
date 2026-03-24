import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ClawFarm — The open AI compute network',
  description: 'Anyone can supply GPU compute, deploy open-source models, or resell AI APIs as a Provider. Protocol meters usage, settles on-chain, and distributes CLAW rewards automatically.',
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
