// api/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // your API base URL
});

// Add token automatically from localStorage or context
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or from a React context/store
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
