export interface SaleStatus {
    precioVenta: number;
    estadoVenta: string;
    comision: number;
    estadoComision: string;
    faltaPagar: number;
    fechaVenta: string | null;
    idMetodoPago: { id: number };
    ganancia: number;
}