
export interface StatusPurchase {
  id?: number;
  idProducto?: number;
  precioCompra: number;
  estadoCompra: string;
  fechaCompra: string;
  linkAmazon: string;
  linkUrlImagen: string;
  ganancia?: number; // Add ganancia property
  comision?: number; // Add comision property
}