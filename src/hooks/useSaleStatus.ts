import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { addSaleStatus } from "../components/product/services/CREATE/AddSaleStatus";
import { SaleStatusResponse } from "../components/product/interfaces/SaleStatusResponse.interface";
import { validateSaleStatusFields } from "../components/product/view-product/utils/PurchaseStatusFunctions";
import { toastStyles } from "../styles/toastStyles";

export const estadoVentaOptions = [{ value: "Vendido", label: "Vendido" }];

export const estadoComisionOptions = [
  { value: "Pagada", label: "Pagada" },
  { value: "Sin pagar", label: "Sin pagar" },
];

export const metodoPagoOptions = [
  { value: "Nequi", label: "Nequi", id: 1 },
  { value: "Efectivo", label: "Efectivo", id: 2 },
  { value: "Sin pago", label: "Sin pago", id: 3 },
  { value: "Nequi y Efectivo", label: "Nequi y Efectivo", id: 4 },
];

const ESTADO_VENTA_SUCCESS = "Estado de venta agregado satisfactoriamente";
const ESTADO_VENTA_ERROR = "Error al guardar el estado de venta: ";

interface MetodoPagoOption {
  value: string;
  label: string;
  id: number;
}

interface UseSaleStatusProps {
  precioCompra: number | null;
  onSubmit: (data: SaleStatusResponse) => void;
}

export function useSaleStatus({ precioCompra, onSubmit }: UseSaleStatusProps) {
  const [precioVenta, setPrecioVenta] = useState("");
  const [estadoVenta, setEstadoVenta] = useState("Sin vender");
  const [comision, setComision] = useState("0");
  const [estadoComision, setEstadoComision] = useState("");
  const [faltaPagar, setFaltaPagar] = useState("");
  const [fechaVenta, setFechaVenta] = useState<Date | null>(null);
  const [metodoPago, setMetodoPago] = useState<MetodoPagoOption | null>(null);
  const [ganancia, setGanancia] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vendido, setVendido] = useState(false);
  const [comisionActiva, setComisionActiva] = useState(true);

  const handleCheckboxChange = useCallback((checked: boolean) => {
    setVendido(checked);
    if (checked) {
      setEstadoVenta("Vendido");
    } else {
      setEstadoVenta("Sin vender");
      setPrecioVenta("");
      setComision("0");
      setEstadoComision("");
      setFaltaPagar("0");
      setFechaVenta(null);
      setMetodoPago(metodoPagoOptions.find((opt) => opt.id === 3) || null);
      setGanancia("");
      setError(null);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const errorMsg = validateSaleStatusFields({
        vendido,
        precioVenta,
        estadoVenta,
        comision,
        estadoComision,
        faltaPagar,
        fechaVenta,
        metodoPago,
        ganancia,
      });
      if (errorMsg) {
        setError(errorMsg);
        return;
      }
      setError(null);
      setLoading(true);

      let fechaFormateada: string | null = null;
      if (fechaVenta instanceof Date && !isNaN(fechaVenta.getTime())) {
        const year = fechaVenta.getFullYear();
        const month = String(fechaVenta.getMonth() + 1).padStart(2, "0");
        const day = String(fechaVenta.getDate()).padStart(2, "0");
        fechaFormateada = `${year}-${month}-${day}`;
      }

      const precioVentaNumber = Number(precioVenta.replace(/\D/g, ""));
      const comisionNumber = Number(comision.replace(/\D/g, ""));
      const gananciaNumber = Number(ganancia.replace(/\D/g, ""));

      const data = {
        precioVenta: vendido ? precioVentaNumber : 0,
        estadoVenta,
        comision: vendido ? comisionNumber : 0,
        estadoComision: vendido ? estadoComision : "Sin pagar",
        faltaPagar:  0,
        fechaVenta: vendido ? fechaFormateada : null,
        idMetodoPago: vendido && metodoPago ? { id: metodoPago.id } : { id: 3 },
        ganancia: vendido ? gananciaNumber : 0,
      };

      try {
        const response = (await addSaleStatus(data)) as SaleStatusResponse;
        toast.success(ESTADO_VENTA_SUCCESS, {
          style: toastStyles.success,
        });
        onSubmit(response);
      } catch (err) {
        setError(
          ESTADO_VENTA_ERROR +
            (err instanceof Error ? err.message : String(err))
        );
        toast.error(
          ESTADO_VENTA_ERROR +
            (err instanceof Error ? err.message : String(err)), {
              style: toastStyles.error,
            });
      } finally {
        setLoading(false);
      }
    },
    [
      vendido,
      precioVenta,
      estadoVenta,
      comision,
      estadoComision,
      faltaPagar,
      fechaVenta,
      metodoPago,
      ganancia,
      onSubmit,
    ]
  );

  useEffect(() => {
    if (vendido && precioCompra !== null && precioVenta.trim() !== "") {
      const ventaStr = precioVenta.replace(/[^0-9]/g, "");
      const compra = Number(precioCompra);
      if (ventaStr.length > 0 && !isNaN(compra)) {
        const venta = Number(ventaStr);
        const diff = venta - compra;
        setGanancia(diff >= 0 ? diff.toString() : "0");
      } else {
        setGanancia("");
      }
    } else {
      setGanancia("");
    }
  }, [precioVenta, precioCompra, vendido]);

  useEffect(() => {
    if (comisionActiva && vendido && ganancia && !isNaN(Number(ganancia))) {
      const gananciaNum = Number(ganancia);
      let comisionNum = 0;
      if (gananciaNum < 100000) {
        comisionNum = Math.round(gananciaNum * 0.35);
      } else {
        comisionNum = Math.round(gananciaNum * 0.5);
      }
      setComision(comisionNum > 0 ? comisionNum.toString() : "0");
    } else {
      setComision("0");
    }
  }, [ganancia, vendido, comisionActiva]);

  const calcularComision = useCallback(
    (ganancia: number): number => {
      if (!comisionActiva) {
        setComision("0");
        return 0;
      }
      return ganancia < 100000
        ? Math.round(ganancia * 0.35)
        : Math.round(ganancia * 0.5);
    },
    [comisionActiva]
  );

  const actualizarComisionActiva = useCallback((activa: boolean) => {
    setComisionActiva(activa);
    if (!activa) {
      setComision("0");
    }
  }, []);

  return {
    vendido,
    setVendido,
    precioVenta,
    setPrecioVenta,
    estadoVenta,
    setEstadoVenta,
    comision,
    setComision, // Asegurando que setComision esté incluido en la exportación
    estadoComision,
    setEstadoComision,
    faltaPagar,
    setFaltaPagar,
    fechaVenta,
    setFechaVenta,
    metodoPago,
    setMetodoPago,
    ganancia,
    loading,
    error,
    handleCheckboxChange,
    handleSubmit,
    comisionActiva,
    setComisionActiva,
    actualizarComisionActiva,
    calcularComision,
  };
}
