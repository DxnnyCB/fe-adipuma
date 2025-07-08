export interface FinalProductOnSubmit {
  onSubmit: (data: {
    descripcion: string;
    observaciones: string;
    idEstadoCompra?: { id: number } | null;
    idEstadoVenta?: { id: number } | null;
  }) => void;
  idEstadoCompra?: { id: number } | null;
  idEstadoVenta?: { id: number } | null;
}