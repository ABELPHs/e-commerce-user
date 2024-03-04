import React from 'react'
import { AppRouter } from './router/AppRouter'
import { AuthProvider, CartProvider } from './store/context'

export const EcommerceApp = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRouter/>
      </CartProvider>
    </AuthProvider>
  )
}
