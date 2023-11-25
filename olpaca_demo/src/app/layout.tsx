import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { Footer } from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Olpaca Demo',
  description: 'Weather-based clothing recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          className={
            "mx-auto max-w-[1000px] px-6 pb-8 pt-8 md:px-6 md:pb-12 md:pt-12 bg-primary text-primary"
          }
        >
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
