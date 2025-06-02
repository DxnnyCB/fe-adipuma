import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getAllProducts = async () => {
    try {
        const response = await axios.get(API_URL + 'producto');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw error;
    }
};