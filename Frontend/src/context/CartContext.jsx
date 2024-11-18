import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await axios.get("http://localhost:3000/api/cart", {
        withCredentials: true,
      });
      setCartItems(response.data);
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      await axios.post(
        "http://localhost:3000/api/cart/add",
        { productId, quantity },
        { withCredentials: true }
      );
      await loadCart();
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      await axios.put(
        `http://localhost:3000/api/cart/update/${productId}`,
        { quantity },
        { withCredentials: true }
      );
      await loadCart();
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/remove/${productId}`, {
        withCredentials: true,
      });
      await loadCart();
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/cart/clear",
        {},
        { withCredentials: true }
      );
      setCartItems([]);
    } catch (error) {
      console.error("Error al limpiar el carrito:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    }
  }, [isAuthenticated]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
