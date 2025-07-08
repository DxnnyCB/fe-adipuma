export interface Product {
    id: string | number;
    descripcion: string;
    observaciones: string;
    idEstadoCompra: {
        id: string | number;
        precioCompra: number,
        estadoCompra: string
        fechaCompra: string;
        linkAmazon: string;
        linkUrlImagen: string;
    };
    idEstadoVenta: {
        id: string | number;
        precioVenta: number;
        estadoVenta: string;
        comision: number;
        estadoComision: string;
        faltaPagar: number;
        fechaVenta: string;
        ganancia: number;
        idMetodoPago: {
            id: number;
            tipoPago: string;
        };
    };
}