export interface FinalProductResponse {
    id: number;
    descripcion: string;
    observaciones: string;
    idEstadoCompra: { id: number };
    idEstadoVenta: { id: number };
}