import axios from "./axios";
import { mockOrders } from "../mockData";

// Check if we should use mock API (for development without backend)
const useMockApi = false; // Use real backend API
let mockOrdersList = [...mockOrders];

export const placeOrderApi = async (orderData) => {
  // Always use real API since backend is ready
  try {
    const response = await axios.post("/orders", orderData);
    return response;
  } catch (error) {
    // Fallback to mock data if backend fails
    if (useMockApi) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newOrder = {
        _id: 'ORD' + Date.now(),
        status: 'Processing',
        totalAmount: orderData.items.reduce((total, item) => {
          return total + (item.productId.price * item.quantity);
        }, 0),
        paymentMethod: orderData.paymentMethod,
        shippingAddress: orderData.shippingAddress,
        items: orderData.items,
        createdAt: new Date().toISOString()
      };
      
      mockOrdersList.push(newOrder);
      
      return {
        data: {
          message: 'Order placed successfully',
          order: newOrder
        }
      };
    }
    throw error;
  }
};

export const getMyOrdersApi = async () => {
  // Always use real API since backend is ready
  try {
    const response = await axios.get("/orders/my-orders");
    return response;
  } catch (error) {
    // Fallback to mock data if backend fails
    if (useMockApi) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { data: mockOrdersList };
    }
    throw error;
  }
};
