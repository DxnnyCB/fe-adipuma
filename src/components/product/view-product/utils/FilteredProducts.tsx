import { Product } from "../../interfaces/Product.interface";

export function FilteredProducts(
    products: Product[],
    selectedYear: number | null,
    selectedMonth: number | null,
    search: string,
    selectedYearSale: number | null,
    selectedMonthSale: number | null,
    metodoPago?: string | null,
    estadoVenta?: string | null,
    estadoCompra?: string | null
) {
    return products.filter(product => {
        const searchLower = search.toLowerCase();

        // Filtro por búsqueda extendido
        const matchesSearch =
            product.descripcion.toLowerCase().includes(searchLower) ||
            product.idEstadoVenta.idMetodoPago.tipoPago.toLowerCase().includes(searchLower) ||
            product.idEstadoVenta.estadoVenta.toLowerCase().includes(searchLower) ||
            product.idEstadoCompra.estadoCompra.toLowerCase().includes(searchLower);

        // Filtro por fecha de compra
        let matchesDateCompra = true;
        if (selectedYear || selectedMonth) {
            const fecha = product.idEstadoCompra.fechaCompra;
            if (fecha) {
                const dateObj = new Date(fecha);
                const year = dateObj.getFullYear();
                const month = dateObj.getMonth() + 1;
                if (selectedYear && year !== selectedYear) matchesDateCompra = false;
                if (selectedMonth && month !== selectedMonth) matchesDateCompra = false;
            } else {
                matchesDateCompra = false;
            }
        }

        // Filtro por fecha de venta
        let matchesDateVenta = true;
        if (selectedYearSale || selectedMonthSale) {
            const fechaVenta = product.idEstadoVenta.fechaVenta;
            if (fechaVenta) {
                const dateObj = new Date(fechaVenta);
                const year = dateObj.getFullYear();
                const month = dateObj.getMonth() + 1;
                if (selectedYearSale && year !== selectedYearSale) matchesDateVenta = false;
                if (selectedMonthSale && month !== selectedMonthSale) matchesDateVenta = false;
            } else {
                matchesDateVenta = false;
            }
        }

        // Filtro por método de pago
        let matchesMetodoPago = true;
        if (metodoPago && metodoPago !== "Todos") {
            matchesMetodoPago = product.idEstadoVenta.idMetodoPago.tipoPago === metodoPago;
        }

        // Filtro por estado de venta
        let matchesEstadoVenta = true;
        if (estadoVenta && estadoVenta !== "Todos") {
            matchesEstadoVenta = product.idEstadoVenta.estadoVenta === estadoVenta;
        }

        // Filtro por estado de compra
        let matchesEstadoCompra = true;
        if (estadoCompra && estadoCompra !== "Todos") {
            matchesEstadoCompra = product.idEstadoCompra.estadoCompra === estadoCompra;
        }

        return (
            matchesSearch &&
            matchesDateCompra &&
            matchesDateVenta &&
            matchesMetodoPago &&
            matchesEstadoVenta &&
            matchesEstadoCompra
        );
    });
}