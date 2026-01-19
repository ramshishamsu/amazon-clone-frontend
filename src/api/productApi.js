import axios from "./axios";

// Check if we should use mock API (for development without backend)
const useMockApi = false; // Use real backend API

// Import mock data only if needed
let mockProducts = [];
if (useMockApi) {
  import("../mockData").then(module => {
    mockProducts = module.mockProducts;
  });
}

export const getProductsApi = async (params = {}) => {
  // Always use real API since backend is ready
  try {
    const response = await axios.get("/products", { params });
    return response;
  } catch (error) {
    // Fallback to mock data if backend fails
    if (useMockApi && mockProducts.length > 0) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredProducts = [...mockProducts];
      
      // Apply filters
      if (params.category) {
        filteredProducts = filteredProducts.filter(p => p.category === params.category);
      }
      
      if (params.minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= parseInt(params.minPrice));
      }
      
      if (params.maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= parseInt(params.maxPrice));
      }
      
      if (params.rating) {
        filteredProducts = filteredProducts.filter(p => p.rating >= parseFloat(params.rating));
      }
      
      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm)
        );
      }
      
      return { data: filteredProducts };
    }
    throw error;
  }
};

export const getProductByIdApi = async (id) => {
  // Always use real API since backend is ready
  try {
    const response = await axios.get(`/products/${id}`);
    return response;
  } catch (error) {
    // Fallback to mock data if backend fails
    if (useMockApi && mockProducts.length > 0) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const product = mockProducts.find(p => p._id === id);
      if (!product) {
        throw new Error('Product not found');
      }
      return { data: product };
    }
    throw error;
  }
};
