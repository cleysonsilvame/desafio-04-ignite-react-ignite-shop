import React, { ReactNode } from 'react'
import { CartProvider as Provider } from 'use-shopping-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  return (
    <Provider
      cartMode='checkout-session'
      stripe={process.env.NEXT_PUBLIC_STRIPE_API_KEY as string}
      currency='BRL'
      shouldPersist={true}
    >
      {children}
    </Provider>
  )
}
