import axiosInstance from '../../../../interceptor/axiosInstance';
import { StatusPurchase } from '../../interfaces/PurchaseStatus.interface';

export const updatePurchaseStatus = async (id: number | string, data: StatusPurchase) => {
  try {
    const response = await axiosInstance.put(`estado-compra/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el estado de compra:', error);
    throw error;
  }
};