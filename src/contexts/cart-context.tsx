'use client'

import { createContext, ReactNode, useContext, useState } from "react"

interface CartItem {
  productId: string
  quantity: number
}

interface CartContextType {
  itens: CartItem[]
  addToCart: (productId: string) => void
}

const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode}) {
  const [cartItens, setCartItens] = useState<CartItem[]>([])

  function addToCart(productId: string) {
    setCartItens((state) => {
      const productInCart = state.some(item => item.productId === productId) 

      if(productInCart) {
        return state.map(item => {
          if (item.productId === productId) {
            return { ...item, quantity: item.quantity + 1}
          } else {
            return item
          }
        })
      } else {
        return [...state, { productId, quantity: 1}]
      }
    })
  } 

  return (
    <CartContext.Provider value={{ itens: cartItens, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)