import React from "react";
import ComponentCard from "../../../common/ComponentCard.tsx";
import Label from "../../../form/Label.tsx";
import InputPrices from "../../../form/input/InputPrices.tsx";
import Select from "../../../form/Select.tsx";
import DatePicker from "../../../form/date-picker.tsx";
import Button from "../../../ui/button/Button.tsx";
import Checkbox from "../../../form/input/Checkbox.tsx";
import { PaperPlaneIcon } from "../../../../icons/index.ts";
import Alert from "../../../ui/alert/Alert.tsx";
import { SaleStatusResponse } from "../../interfaces/SaleStatusResponse.interface.tsx";
import { useSaleStatus, estadoVentaOptions, estadoComisionOptions, metodoPagoOptions } from "../../../../hooks/useSaleStatus.ts";

interface SaleStatusProps {
  precioCompra: number | null;
  onSubmit: (data: SaleStatusResponse) => void;
}

const SaleStatus: React.FC<SaleStatusProps> = ({ precioCompra, onSubmit }) => {
  const {
    vendido,
    precioVenta,
    setPrecioVenta,
    estadoVenta,
    setEstadoVenta,
    comision,
    estadoComision,
    setEstadoComision,
    faltaPagar = 0,
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
    calcularComision,
    comisionActiva, // Asegurando que comisionActiva esté incluido
    actualizarComisionActiva,
  } = useSaleStatus({ precioCompra, onSubmit });

  const handleComisionCheckboxChange = (checked: boolean) => {
    actualizarComisionActiva(checked); // Usar la nueva función del hook para actualizar el estado y la comisión
    if (checked) {
      calcularComision(Number(ganancia)); // Recalcular comisión si el checkbox está activo
    }
  };

  return (
    <ComponentCard title="Agregar Estado de Venta">
      <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
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
              <Checkbox
                label="¿Activar comisión?"
                checked={comisionActiva} // Usar el valor del hook directamente
                onChange={handleComisionCheckboxChange}
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
                readOnly={true}
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
            <div className="hidden">
              <Label htmlFor="faltaPagar">Falta por Pagar</Label>
              <InputPrices
                minValue={0}
                maxValue={1000000}
                type="text"
                id="faltaPagar"
                placeholder="Ej: $5.000"
                value={faltaPagar}
                onChange={e => setFaltaPagar(e.target.value)}
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
                value={metodoPago ? metodoPago.value : undefined}
                onChange={value => {
                  const selected = metodoPagoOptions.find(opt => opt.value === value) || null;
                  setMetodoPago(selected);
                }}
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
                readOnly={true}
                required={vendido}
              />
            </div>
          </>
        )}
        <div className="flex items-center gap-5">
          <Button
            type="submit"
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
};

export default SaleStatus;