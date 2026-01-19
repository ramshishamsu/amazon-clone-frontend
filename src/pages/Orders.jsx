import { useEffect, useState } from "react";
import { getMyOrdersApi } from "../api/orderApi";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const res = await getMyOrdersApi();
    setOrders(res.data);
  };

  if (orders.length === 0) {
    return (
      <div className="p-6 text-center text-xl text-gray-600">
        No orders found 📦
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

      {orders.map(order => (
        <div
          key={order._id}
          className="border p-4 mb-4 rounded"
        >
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Total:</strong> ₹{order.totalAmount}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Orders;