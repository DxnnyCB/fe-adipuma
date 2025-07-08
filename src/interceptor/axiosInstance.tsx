// src/services/axiosInstance.ts
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Interceptor de request: agrega el token y verifica expiración
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const exp = localStorage.getItem("exp"); // tiempo en segundos

    // ✅ Si hay expiración y ya pasó, redirige
    if (exp && parseInt(exp) * 1000 < Date.now()) {
      localStorage.clear();
      toast.error("Tu sesión ha expirado.");
      window.location.href = "/";
      return Promise.reject("Token expirado");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response: maneja errores 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      toast.error("Tu sesión ha expirado. Por favor inicia sesión.");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;