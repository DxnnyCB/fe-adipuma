import axios from "axios"; 
import axiosInstance from "../../../interceptor/axiosInstance";

export const login = async (email: string, password: string) => {
  try {
    // Usa axiosInstance en vez de axios
    const response = await axiosInstance.post("auth/login", { email, password });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Credenciales incorrectas");
      }
    }
    throw new Error("Error al iniciar sesión");
  }
};

export const loginWithGoogle = async (googleId: string) => {
  try {
    const response = await axiosInstance.post("auth/login-google", { googleId });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Google ID no registrado");
      }
    }
    throw new Error("Error en el inicio de sesión con Google");
  }
};
