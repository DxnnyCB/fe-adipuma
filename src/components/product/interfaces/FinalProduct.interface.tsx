export interface FinalProduct {
    id?: number;
    descripcion: string;
    observaciones: string;
    idEstadoCompra: { id: number };
    idEstadoVenta: { id: number };
}