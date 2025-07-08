import axiosInstance from '../../../../interceptor/axiosInstance';
import { FinalProduct } from '../../interfaces/FinalProduct.interface';

export const updateFinalProduct = async (id: number | string, data: FinalProduct) => {
  try {
    const response = await axiosInstance.put(`producto/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    throw error;
  }
};