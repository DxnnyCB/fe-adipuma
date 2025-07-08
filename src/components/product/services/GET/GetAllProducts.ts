import axiosInstance from "../../../../interceptor/axiosInstance";

export interface PageableParams {
  page?: number;
  size?: number;
  sort?: string;
  yearCompra?: number;
  monthCompra?: number;
  yearVenta?: number;
  monthVenta?: number;
  metodoPago?: string;
  estadoVenta?: string;
  estadoCompra?: string;
  search?: string;
}

export const getAllProducts = async (params: PageableParams = {}, signal?: AbortSignal) => {
  try {
    const response = await axiosInstance.get("producto/page-query-advanced", {
      params,
      signal,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};
