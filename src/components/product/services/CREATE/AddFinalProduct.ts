import axiosInstance from '../../../../interceptor/axiosInstance';
import { FinalProduct } from '../../interfaces/FinalProduct.interface';

export const addFinalProduct = async (data: FinalProduct) => {
  try {
    const response = await axiosInstance.post('producto', data);
    return response.data;
  } catch (error) {
    console.error('Error al crear el producto:', error);
    throw error;
  }
};