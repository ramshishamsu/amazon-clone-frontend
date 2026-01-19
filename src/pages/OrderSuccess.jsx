import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  // 🔐 Safety: if user refreshes page or opens directly
  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">
          No order information found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="amazon-btn"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* ✅ SUCCESS ICON */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Order Placed Successfully!
          </h1>

          <p className="text-gray-600">
            Thank you for shopping with Amazon Clone
          </p>
        </div>

        {/* 📦 ORDER DETAILS */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Order Details
          </h2>

          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Order ID:</strong>{" "}
              <span className="font-mono">{order._id}</span>
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="text-green-600 font-semibold">
                {order.status || "Placed"}
              </span>
            </p>
            <p>
              <strong>Total Amount:</strong>{" "}
              <span className="font-bold text-lg">
                ₹{order.totalAmount}
              </span>
            </p>
          </div>

          {/* 🛒 ITEMS */}
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold mb-3">
              Items
            </h3>

            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between border-b py-2"
              >
                <div>
                  <p className="font-medium">
                    {item.productId?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹{item.productId?.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 🔘 ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="amazon-btn px-8 py-3 text-lg"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="border-2 border-gray-900 px-8 py-3 rounded hover:bg-gray-900 hover:text-white transition"
          >
            View Your Orders
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;
