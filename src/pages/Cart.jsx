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
    try {
      setLoading(true);
      const res = await getCartApi();
      setCart(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const increaseQty = async (productId) => {
    await increaseQtyApi(productId);
    loadCart();
  };

  const decreaseQty = async (productId) => {
    await decreaseQtyApi(productId);
    loadCart();
  };

  const removeItem = async (productId) => {
    await removeFromCartApi(productId);
    loadCart();
  };

  const totalPrice = cart?.items?.reduce(
    (sum, item) =>
      sum + (item.productId?.price || 0) * item.quantity,
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
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center p-6">
        <p className="text-xl text-gray-600">Your cart is empty 🛒</p>
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 mt-4 hover:underline"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cart.items.map((item) => (
        <div
          key={item.productId._id}
          className="flex justify-between items-center border-b py-4"
        >
          <div>
            <h2 className="font-semibold text-sm">
              {item.productId.name}
            </h2>
            <p className="text-gray-600">
              ₹{item.productId.price}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => decreaseQty(item.productId._id)}>–</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQty(item.productId._id)}>+</button>
          </div>

          <button
            onClick={() => removeItem(item.productId._id)}
            className="text-red-600"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <h2 className="text-xl font-bold">Subtotal: ₹{totalPrice}</h2>
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
