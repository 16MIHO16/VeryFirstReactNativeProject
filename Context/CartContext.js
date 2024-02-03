import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedItems = await AsyncStorage.getItem("cartItems");
        if (storedItems) {
          const parsedItems = JSON.parse(storedItems);
          setCartItems(parsedItems);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchData();
  }, []);

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem("cartItems");
      setCartItems([]);
      alert("Cart cleared!");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.original_price),
    0
  );

  const contextValue = {
    cartItems,
    setCartItems,
    clearCart,
    totalPrice,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
