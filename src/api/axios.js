import axios from "axios";

const instance = axios.create({
  baseURL: "https://amazon-clone-backend-1-ty84.onrender.com/api"
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors gracefully
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ERR_NETWORK' || error.message.includes('Connection refused')) {
      console.log('Backend not available, using mock data');
    }
    return Promise.reject(error);
  }
);

export default instance;
