import axiosInstance from '../../../../interceptor/axiosInstance';
import { SaleStatus } from '../../interfaces/SaleStatus.interface';

export const updateSaleStatus = async (id: number | string, data: SaleStatus) => {
  try {
    const response = await axiosInstance.put(`estado-venta/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el estado de venta:', error);
    throw error;
  }
};