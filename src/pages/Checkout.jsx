import { useEffect, useState } from "react";
import { getCartApi } from "../api/cartApi";
import { placeOrderApi } from "../api/orderApi";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const res = await getCartApi();
    setCart(res.data);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const required = ['fullName', 'address', 'city', 'state', 'pincode', 'phone'];
    for (let field of required) {
      if (!formData[field]) {
        alert(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    return true;
  };

  const placeOrder = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const res = await placeOrderApi({
        shippingAddress: formData,
        paymentMethod
      });
      navigate("/success", {
        state: { order: res.data.order }
      });
    } catch (error) {
      alert(error.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = cart?.items?.reduce(
    (sum, item) =>
      sum + item.productId.price * item.quantity,
    0
  );

  if (!cart) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT - Delivery Address & Payment */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Delivery Address */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="border p-3 rounded w-full"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="border p-3 rounded w-full"
              />
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleInputChange}
                className="border p-3 rounded w-full md:col-span-2"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="border p-3 rounded w-full"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                className="border p-3 rounded w-full"
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="border p-3 rounded w-full"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            
            <div className="space-y-3">
              <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-semibold">Cash on Delivery</div>
                  <div className="text-sm text-gray-600">Pay when you receive your order</div>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-semibold">Credit/Debit Card</div>
                  <div className="text-sm text-gray-600">Secure online payment</div>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-semibold">UPI</div>
                  <div className="text-sm text-gray-600">Pay using UPI apps</div>
                </div>
              </label>
            </div>

            {paymentMethod === "card" && (
              <div className="mt-4 p-4 bg-gray-50 rounded">
                <div className="text-sm text-gray-600">
                  <p>Card payment is for demo purposes only.</p>
                  <p>No actual payment will be processed.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT - Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              {cart.items.map((item) => (
                <div key={item.productId._id} className="flex justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.productId.name}</div>
                    <div className="text-gray-600 text-xs">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-semibold">
                    ₹{item.productId.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <hr className="my-4" />
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>₹0</span>
              </div>
            </div>

            <hr className="my-4" />
            
            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span className="text-green-600">₹{totalPrice}</span>
            </div>

            <button
              onClick={placeOrder}
              disabled={loading || cart.items.length === 0}
              className="w-full amazon-btn text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
            
            <div className="mt-4 text-xs text-gray-500 text-center">
              By placing this order, you agree to our Terms & Conditions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
