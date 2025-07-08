import axiosInstance from "../../../../interceptor/axiosInstance";

export const deleteProduct = async (productId: string): Promise<void> => {
  await axiosInstance.delete(`producto/${productId}`);
};