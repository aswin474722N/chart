import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import {
  getCart,
  addToCart as addToCartAPI,
  updateCartItem as updateCartItemAPI,
  removeFromCart as removeFromCartAPI,
  clearCart as clearCartAPI
} from '../services/cartService';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      // Load from localStorage for non-authenticated users
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        setCart(JSON.parse(localCart));
      }
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      const { cart: cartData } = await getCart();
      setCart(cartData || []);
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      if (isAuthenticated) {
        const { cart: updatedCart } = await addToCartAPI(productId, quantity);
        setCart(updatedCart);
      } else {
        // Handle local cart for non-authenticated users
        // Need to fetch product details first
        try {
          const { getProductById } = await import('../services/productService');
          const { product } = await getProductById(productId);
          
          const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
          const existingItem = localCart.find(item => item.productId === productId);
          
          if (existingItem) {
            existingItem.quantity += quantity;
          } else {
            localCart.push({
              productId: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: quantity
            });
          }
          
          localStorage.setItem('cart', JSON.stringify(localCart));
          setCart(localCart);
        } catch (err) {
          return {
            success: false,
            message: 'Failed to load product details'
          };
        }
      }
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to add to cart'
      };
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      if (isAuthenticated) {
        const { cart: updatedCart } = await updateCartItemAPI(productId, quantity);
        setCart(updatedCart);
      } else {
        const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const item = localCart.find(item => item.productId === productId);
        if (item) {
          item.quantity = quantity;
          localStorage.setItem('cart', JSON.stringify(localCart));
          setCart(localCart);
        }
      }
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update cart'
      };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      if (isAuthenticated) {
        const { cart: updatedCart } = await removeFromCartAPI(productId);
        setCart(updatedCart);
      } else {
        const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const filtered = localCart.filter(item => item.productId !== productId);
        localStorage.setItem('cart', JSON.stringify(filtered));
        setCart(filtered);
      }
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to remove from cart'
      };
    }
  };

  const clearCart = async () => {
    try {
      if (isAuthenticated) {
        await clearCartAPI();
      }
      setCart([]);
      localStorage.removeItem('cart');
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to clear cart'
      };
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    loadCart,
    getCartTotal,
    getCartItemCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

