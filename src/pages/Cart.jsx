import { useEffect, useState } from "react";
import {
  getCartApi,
  increaseQtyApi,
  decreaseQtyApi,
  removeFromCartApi
} from "../api/cartApi";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCartApi();
      console.log("Cart response:", res.data);
      setCart(res.data);
    } catch (error) {
      console.error("Failed to load cart:", error);
      setError(error.message || "Failed to load cart");
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const increaseQty = async (id) => {
    try {
      await increaseQtyApi(id);
      loadCart();
    } catch (error) {
      console.error("Failed to increase quantity:", error);
      alert("Failed to update quantity");
    }
  };

  const decreaseQty = async (id) => {
    try {
      await decreaseQtyApi(id);
      loadCart();
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
      alert("Failed to update quantity");
    }
  };

  const removeItem = async (id) => {
    try {
      await removeFromCartApi(id);
      loadCart();
    } catch (error) {
      console.error("Failed to remove item:", error);
      alert("Failed to remove item");
    }
  };

  const totalPrice = cart?.items?.reduce(
    (sum, item) =>
      sum + item.productId.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 text-lg mb-4">Error loading cart: {error}</p>
        <button 
          onClick={loadCart}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="p-6 text-center text-xl text-gray-600">
        Your cart is empty 🛒
        <div className="mt-4">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Shopping Cart
      </h1>

      {cart.items.map((item) => (
        <div
          key={item.productId._id}
          className="flex justify-between items-center border-b py-4"
        >
          {/* Product Info */}
          <div>
            <h2 className="font-semibold text-sm">
              {item.productId.name}
            </h2>
            <p className="text-gray-600">
              ₹{item.productId.price}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => decreaseQty(item.productId._id)}
              className="px-3 py-1 border rounded hover:bg-gray-100 transition"
            >
              –
            </button>

            <span className="font-semibold">
              {item.quantity}
            </span>

            <button
              onClick={() => increaseQty(item.productId._id)}
              className="px-3 py-1 border rounded hover:bg-gray-100 transition"
            >
              +
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeItem(item.productId._id)}
            className="text-red-600 text-sm hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

      {/* Footer */}
      <div className="flex justify-between items-center mt-8">
        <h2 className="text-xl font-bold">
          Subtotal: ₹{totalPrice}
        </h2>

        <button
          onClick={() => navigate("/checkout")}
          className="amazon-btn"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
