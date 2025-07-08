import axiosInstance from '../../../../interceptor/axiosInstance';
import { SaleStatus } from '../../interfaces/SaleStatus.interface';

export const addSaleStatus = async (data: SaleStatus) => {
  try {
    const response = await axiosInstance.post('estado-venta', data);
    return response.data;
  } catch (error) {
    console.error('Error al crear el estado de venta:', error);
    throw error;
  }
};
