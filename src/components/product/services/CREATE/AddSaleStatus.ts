import axios from 'axios';
import { StatusPurchase } from '../../interfaces/PurchaseStatus.interface';

const API_URL = import.meta.env.VITE_API_URL;

export const addPurchaseStatus = async (data: StatusPurchase) => {
  try {
    const response = await axios.post(API_URL + 'estado-compra', data);
    return response.data;
  } catch (error) {
    console.error('Error al crear el estado de compra:', error);
    throw error;
  }
};