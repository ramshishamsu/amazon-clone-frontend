import axios from "./axios";
import { mockProducts } from "../mockData";

// Check if we should use mock API (for development without backend)
const useMockApi = false; // Use real backend API

// Mock cart storage
let mockCart = {
  items: [],
  totalAmount: 0
};

export const getCartApi = async () => {
  console.log("Getting cart from backend...");
  console.log("Current user token:", localStorage.getItem("token"));
  
  // Always use real API since backend is ready
  try {
    const response = await axios.get("/cart");
    console.log("Cart API response:", response.data);
    return response;
  } catch (error) {
    console.error("Cart API error:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    
    // Fallback to mock data if backend fails
    if (useMockApi) {
      console.log("Using mock cart data");
      await new Promise(resolve => setTimeout(resolve, 300));
      return { data: mockCart };
    }
    throw error;
  }
};

export const addToCartApi = async (productId) => {
  console.log("Adding product to cart:", productId);
  console.log("Current user token:", localStorage.getItem("token"));
  
  // Always use real API since backend is ready
  try {
    const response = await axios.post("/cart/add", { productId });
    console.log("Add to cart response:", response.data);
    return response;
  } catch (error) {
    console.error("Add to cart error:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    
    // Fallback to mock data if backend fails
    if (useMockApi) {
      console.log("Using mock add to cart");
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const product = mockProducts.find(p => p._id === productId);
      if (!product) {
        throw new Error('Product not found');
      }
      
      const existingItem = mockCart.items.find(item => item.productId._id === productId);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        mockCart.items.push({
          productId: product, // Store the full product object
          quantity: 1
        });
      }
      
      // Recalculate total
      mockCart.totalAmount = mockCart.items.reduce((total, item) => {
        return total + (item.productId.price * item.quantity);
      }, 0);
      
      console.log("Mock cart after adding:", mockCart);
      return { 
        data: { 
          message: 'Product added to cart successfully',
          cart: mockCart
        }
      };
    }
    throw error;
  }
};

export const increaseQtyApi = async (productId) => {
  // Always use real API since backend is ready
  try {
    const response = await axios.put("/cart/increase", { productId });
    return response;
  } catch (error) {
    // Fallback to mock data if backend fails
    if (useMockApi) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const item = mockCart.items.find(item => item.productId._id === productId);
      if (item) {
        item.quantity += 1;
        mockCart.totalAmount = mockCart.items.reduce((total, item) => {
          return total + (item.productId.price * item.quantity);
        }, 0);
      }
      
      return { data: { message: 'Quantity increased', cart: mockCart } };
    }
    throw error;
  }
};

export const decreaseQtyApi = async (productId) => {
  // Always use real API since backend is ready
  try {
    const response = await axios.put("/cart/decrease", { productId });
    return response;
  } catch (error) {
    // Fallback to mock data if backend fails
    if (useMockApi) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const item = mockCart.items.find(item => item.productId._id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        mockCart.totalAmount = mockCart.items.reduce((total, item) => {
          return total + (item.productId.price * item.quantity);
        }, 0);
      }
      
      return { data: { message: 'Quantity decreased', cart: mockCart } };
    }
    throw error;
  }
};

export const removeFromCartApi = async (productId) => {
  // Always use real API since backend is ready
  try {
    const response = await axios.delete(`/cart/remove/${productId}`);
    return response;
  } catch (error) {
    // Fallback to mock data if backend fails
    if (useMockApi) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      mockCart.items = mockCart.items.filter(item => item.productId._id !== productId);
      mockCart.totalAmount = mockCart.items.reduce((total, item) => {
        return total + (item.productId.price * item.quantity);
      }, 0);
      
      return { data: { message: 'Item removed from cart', cart: mockCart } };
    }
    throw error;
  }
};
