// api/axiosInstance.ts
import axios, { AxiosError } from "axios";

let logoutFn: (() => void) | null = null;

export const setLogoutHandler = (fn: () => void) => {
  logoutFn = fn;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Token expired or invalid");
      if (logoutFn) {
        logoutFn(); // call context logout
      } else {
        // fallback if no context yet
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
