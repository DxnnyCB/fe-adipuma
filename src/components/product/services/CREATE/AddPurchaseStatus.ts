import axiosInstance from '../../../../interceptor/axiosInstance';
import { StatusPurchase } from '../../interfaces/PurchaseStatus.interface';

export const addPurchaseStatus = async (data: StatusPurchase) => {
  try {
    const response = await axiosInstance.post('estado-compra', data);
    return response.data;
  } catch (error) {
    console.error('Error al crear el estado de compra:', error);
    throw error;
  }
};
