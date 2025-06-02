import React, { useState } from "react";
import ComponentCard from "../../../common/ComponentCard.tsx";
import Label from "../../../form/Label.tsx";
import InputPrices from "../../../form/input/InputPrices.tsx";
import Select from "../../../form/Select.tsx";
import DatePicker from "../../../form/date-picker.tsx";
import Button from "../../../ui/button/Button.tsx";
import Checkbox from "../../../form/input/Checkbox.tsx";
import { PaperPlaneIcon } from "../../../../icons/index.ts";
import Alert from "../../../ui/alert/Alert.tsx";
//import { toast } from "react-toastify";

interface SaleStatusProps {
  onSubmit: (data: {
    precioVenta: string;
    estadoVenta: string;
    comision: string;
    estadoComision: string;
    faltaPagar: string;
    fechaVenta: string | null;
    metodoPago: string;
    ganancia: string;
  }) => void;
}

export default function SaleStatus({ onSubmit }: SaleStatusProps) {
  const [precioVenta, setPrecioVenta] = useState("");
  const [estadoVenta, setEstadoVenta] = useState("Sin vender");
  const [comision, setComision] = useState("");
  const [estadoComision, setEstadoComision] = useState("");
  const [faltaPagar, setFaltaPagar] = useState("");
  const [fechaVenta, setFechaVenta] = useState<Date | null>(null);
  const [metodoPago, setMetodoPago] = useState("");
  const [ganancia, setGanancia] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vendido, setVendido] = useState(false);

  const estadoVentaOptions = [
    { value: "Vendido", label: "Vendido" },
    { value: "Sin vender", label: "Sin vender" },
  ];

  const estadoComisionOptions = [
    { value: "Pagada", label: "Pagada" },
    { value: "Pendiente", label: "Pendiente" },
  ];

  const metodoPagoOptions = [
    { value: "Efectivo", label: "Efectivo" },
    { value: "Nequi", label: "Nequi" },
    { value: "Nequi y Efectivo", label: "Nequi y Efectivo" },
  ];

  // Cuando cambia el checkbox, actualiza el estadoVenta y resetea campos si es necesario
  const handleCheckboxChange = (checked: boolean) => {
    setVendido(checked);
    if (checked) {
      setEstadoVenta("Vendido");
    } else {
      setEstadoVenta("Sin vender");
      setPrecioVenta("");
      setComision("");
      setEstadoComision("");
      setFaltaPagar("");
      setFechaVenta(null);
      setMetodoPago("");
      setGanancia("");
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de campos obligatorios solo si está vendido
    if (vendido) {
      if (
        !precioVenta.trim() ||
        !estadoVenta ||
        !comision.trim() ||
        !estadoComision ||
        !faltaPagar.trim() ||
        !fechaVenta ||
        !metodoPago ||
        !ganancia.trim()
      ) {
        setError("Todos los campos son obligatorios.");
        return;
      }
    }
    setError(null);
    setLoading(true);

    setTimeout(() => {
      // Formatea la fecha como "DD-MM-YYYY"
      let fechaFormateada = null;
      if (fechaVenta instanceof Date && !isNaN(fechaVenta.getTime())) {
        const year = fechaVenta.getFullYear();
        const month = String(fechaVenta.getMonth() + 1).padStart(2, "0");
        const day = String(fechaVenta.getDate()).padStart(2, "0");
        fechaFormateada = `${year}-${month}-${day}`;
        
      }

      const data = {
        precioVenta: vendido ? precioVenta : "",
        estadoVenta,
        comision: vendido ? comision : "",
        estadoComision: vendido ? estadoComision : "",
        faltaPagar: vendido ? faltaPagar : "",
        fechaVenta: vendido ? fechaFormateada : null,
        metodoPago: vendido ? metodoPago : "",
        ganancia: vendido ? ganancia : "",
      };
      onSubmit(data);
      setLoading(false);
    }, 1200);
  };

  return (
    <ComponentCard title="Agregar Estado de Venta">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Checkbox
          label="¿Esta prenda ya se vendió?"
          checked={vendido}
          onChange={handleCheckboxChange}
        />
        {!vendido && (
          <Alert
            variant="info"
            title="Información"
            message="Si no se ha vendido, por favor continuar"
          />
        )}
        {/* Solo muestra los campos si está vendido */}
        {vendido && (
          <>
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            <div>
              <Label htmlFor="precioVenta">Precio Venta</Label>
              <InputPrices
                minValue={10000}
                maxValue={1000000}
                type="text"
                id="precioVenta"
                placeholder="Ej: $250.000"
                value={precioVenta}
                onChange={e => setPrecioVenta(e.target.value)}
                required={vendido}
              />
            </div>
            <div>
              <Label>Estado Venta</Label>
              <Select
                options={estadoVentaOptions}
                placeholder="Seleccione una opción"
                value={estadoVenta}
                onChange={setEstadoVenta}
                className="dark:bg-dark-900"
                required={vendido}
              />
            </div>
            <div>
              <Label htmlFor="comision">Comisión</Label>
              <InputPrices
                minValue={0}
                maxValue={1000000}
                type="text"
                id="comision"
                placeholder="Ej: $10.000"
                value={comision}
                onChange={e => setComision(e.target.value)}
                required={vendido}
              />
            </div>
            <div>
              <Label>Estado Comisión</Label>
              <Select
                options={estadoComisionOptions}
                placeholder="Seleccione una opción"
                value={estadoComision}
                onChange={setEstadoComision}
                className="dark:bg-dark-900"
                required={vendido}
              />
            </div>
            <div>
              <Label htmlFor="faltaPagar">Falta por Pagar</Label>
              <InputPrices
                minValue={0}
                maxValue={1000000}
                type="text"
                id="faltaPagar"
                placeholder="Ej: $5.000"
                value={faltaPagar}
                onChange={e => setFaltaPagar(e.target.value)}
                required={vendido}
              />
            </div>
            <div>
              <DatePicker
                id="fechaVenta"
                label="Fecha de venta"
                placeholder="Seleccione una fecha"
                value={fechaVenta}
                onChange={setFechaVenta}
                required={vendido}
              />
            </div>
            <div>
              <Label>Método de Pago</Label>
              <Select
                options={metodoPagoOptions}
                placeholder="Seleccione una opción"
                value={metodoPago}
                onChange={setMetodoPago}
                className="dark:bg-dark-900"
                required={vendido}
              />
            </div>
            <div>
              <Label htmlFor="ganancia">Ganancia</Label>
              <InputPrices
                minValue={0}
                maxValue={1000000}
                type="text"
                id="ganancia"
                placeholder="Ej: $20.000"
                value={ganancia}
                onChange={e => setGanancia(e.target.value)}
                required={vendido}
              />
            </div>
          </>
        )}
        <div className="flex items-center gap-5">
          <Button
            size="md"
            variant="primary"
            endIcon={
              loading ? (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : (
                <PaperPlaneIcon className="size-5" />
              )
            }
            disabled={loading}
          >
            {loading ? "Guardando..." : vendido ? "Guardar" : "Continuar"}
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}