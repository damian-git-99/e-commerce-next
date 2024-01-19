'use client'

import { SessionProvider } from 'next-auth/react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

interface Props {
  children: React.ReactNode
}

export const Provider = ({ children }: Props) => {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? ''
  return (
    <SessionProvider>
      <PayPalScriptProvider
        options={{ clientId, intent: 'capture', currency: 'USD' }}
      >
        {children}
      </PayPalScriptProvider>
    </SessionProvider>
  )
}
