export function validatePurchaseFields(fields: {
  precioCompra: string;
  estadoCompra: string;
  fechaCompra: Date | null;
  linkAmazon: string;
  linkUrlImagen: string;
}) {
  if (
    !fields.precioCompra.trim() ||
    !fields.estadoCompra ||
    !fields.fechaCompra ||
    !fields.linkAmazon.trim() ||
    !fields.linkUrlImagen.trim()
  ) {
    return "Todos los campos son obligatorios.";
  }
  return null;
}

export function formatDate(date: Date | null): string {
  if (date instanceof Date && !isNaN(date.getTime())) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return "";
}

export function validateSaleStatusFields(fields: {
  vendido: boolean;
  precioVenta: string;
  estadoVenta: string;
  comision: string;
  estadoComision: string;
  faltaPagar: string;
  fechaVenta: Date | null;
  metodoPago: { value: string; label: string; id: number } | null;
  ganancia: string;
}) {
  if (!fields.vendido) return null;
  if (
    !fields.precioVenta.trim() ||
    !fields.estadoVenta ||
    !fields.comision.trim() ||
    !fields.estadoComision ||
    !fields.faltaPagar.trim() ||
    !fields.fechaVenta ||
    !fields.metodoPago ||
    !fields.ganancia.trim()
  ) {
    return "Todos los campos son obligatorios.";
  }
  return null;
}

export function validateFinalProductFields(fields: {
  descripcion: string;
  observaciones: string;
  idEstadoCompra: number | null | undefined;
  idEstadoVenta: number | null | undefined;
}) {
  if (
    !fields.descripcion.trim() ||
    !fields.idEstadoCompra ||
    !fields.idEstadoVenta
  ) {
    return "Todos los campos son obligatorios.";
  }
  return null;
}