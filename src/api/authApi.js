import axios from "./axios";

// Check if we should use mock API (for development without backend)
const useMockApi = false; // Use real backend API

// Mock user data for development
const mockUsers = [
  {
    _id: 'user123',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  }
];

export const loginApi = async (data) => {
  // Always use real API since backend is ready
  try {
    const response = await axios.post("/auth/login", data);
    return response;
  } catch (error) {
    // Fallback to mock data if backend fails
    if (useMockApi) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const user = mockUsers.find(u => u.email === data.email && u.password === data.password);
      
      if (user) {
        return {
          data: {
            token: 'mock-jwt-token',
            user: {
              _id: user._id,
              name: user.name,
              email: user.email
            }
          }
        };
      } else {
        throw new Error('Invalid email or password');
      }
    }
    throw error;
  }
};

export const signupApi = async (data) => {
  // Always use real API since backend is ready
  try {
    const response = await axios.post("/auth/signup", data);
    return response;
  } catch (error) {
    // Fallback to mock data if backend fails
    if (useMockApi) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const existingUser = mockUsers.find(u => u.email === data.email);
      if (existingUser) {
        throw new Error('User already exists');
      }
      
      const newUser = {
        _id: 'user' + Date.now(),
        name: data.name,
        email: data.email,
        password: data.password
      };
      
      mockUsers.push(newUser);
      
      return {
        data: {
          message: 'User registered successfully',
          user: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email
          }
        }
      };
    }
    throw error;
  }
};

export const googleAuthApi = async (data) => {
  // Always use real API since backend is ready
  try {
    const response = await axios.post("/auth/google", data);
    return response;
  } catch (error) {
    // Fallback to mock data if backend fails
    if (useMockApi) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        data: {
          token: 'mock-google-jwt-token',
          user: {
            _id: 'google' + Date.now(),
            name: data.name || 'Google User',
            email: data.email || 'user@gmail.com',
            googleId: data.googleId || 'google123'
          }
        }
      };
    }
    throw error;
  }
};