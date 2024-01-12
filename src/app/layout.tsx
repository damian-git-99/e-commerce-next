import type { Metadata } from 'next'
import { inter } from '@/config/fonts'
import './globals.css'
import { Provider } from '@/components'

export const metadata: Metadata = {
  title: {
    template: '%s - Tes | Shop',
    default: 'Home - Tes | Shop'
  },
  description: 'An e-commerce'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
