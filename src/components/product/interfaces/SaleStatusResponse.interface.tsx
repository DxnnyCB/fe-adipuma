export interface SaleStatusResponse {
    id: number; // Optional for new entries
    precioVenta: number;
    estadoVenta: string;
    comision: number;
    estadoComision: string;
    faltaPagar: number;
    fechaVenta: string | null;
    idMetodoPago: { id: number };
    ganancia: number;
}