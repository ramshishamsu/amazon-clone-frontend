import { createContext, useContext, useState } from "react";
import {
  addToCartApi,
  getCartApi,
  removeFromCartApi,
  increaseQtyApi,
  decreaseQtyApi
} from "../api/cartApi";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // 🔹 Sync cart count from backend
  const syncCartCount = async () => {
    try {
      const res = await getCartApi();
      const count = res.data.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      setCartCount(count);
    } catch (error) {
      console.error("Failed to sync cart count");
    }
  };

  // 🔹 Add to cart (BACKEND)
  const addToCart = async (productId, quantity = 1) => {
    for (let i = 0; i < quantity; i++) {
      await addToCartApi(productId);
    }
    await syncCartCount();
  };

  const removeFromCart = async (productId) => {
    await removeFromCartApi(productId);
    await syncCartCount();
  };

  const increaseQuantity = async (productId) => {
    await increaseQtyApi(productId);
    await syncCartCount();
  };

  const decreaseQuantity = async (productId) => {
    await decreaseQtyApi(productId);
    await syncCartCount();
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        syncCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
