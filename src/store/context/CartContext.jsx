import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const voidCart = () => {
    setCart([]);
  }
  const handleAddToCart = (product) => {
    let temporalCart = [...cart];
    let isCurrent = false;
    for(let element of temporalCart){
      if(element.product_id == product.product_id){
        isCurrent = true;
        element.quantity = element.quantity + product.quantity;
      }
    }
    if(!isCurrent) {
      temporalCart.push(product);
    }
    setCart(temporalCart);
  };

  return (
    <CartContext.Provider value={{ cart, handleAddToCart, voidCart }}>
      {children}
    </CartContext.Provider>
  );
}
