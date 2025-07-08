import React from "react";
import ComponentCard from "../../../common/ComponentCard.tsx";
import Label from "../../../form/Label.tsx";
import InputPrices from "../../../form/input/InputPrices.tsx";
import Select from "../../../form/Select.tsx";
import DatePicker from "../../../form/date-picker.tsx";
import Button from "../../../ui/button/Button.tsx";
import { PaperPlaneIcon } from "../../../../icons/index.ts";
import InputLinks from "../../../form/input/InputLinks.tsx";
import { PurchaseStatusResponse } from "../../interfaces/PurchaseStatusResponse.interface.tsx";
import { usePurchaseStatus, estadoCompraOptions } from "../../../../hooks/usePurchaseStatus.ts";

interface PurchaseStatusProps {
  onSubmit: (data: PurchaseStatusResponse) => void;
}

const PurchaseStatus: React.FC<PurchaseStatusProps> = ({ onSubmit }) => {
  const {
    form,
    loading,
    error,
    handleChange,
    handleSubmit,
  } = usePurchaseStatus({ onSubmit });

  return (
    <ComponentCard title="Agregar Estado de Compra">
      <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        <div>
          <Label htmlFor="precioCompra">Precio compra</Label>
          <InputPrices
            minValue={10000}
            maxValue={999999}
            type="text"
            id="precioCompra"
            placeholder="Ej: $200.000"
            value={form.precioCompra}
            onChange={e => handleChange("precioCompra", e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Estado Compra</Label>
          <Select
            options={estadoCompraOptions}
            placeholder="Seleccione una opción"
            value={form.estadoCompra}
            onChange={value => handleChange("estadoCompra", value)}
            className="dark:bg-dark-900"
            required
          />
        </div>
        <div>
          <DatePicker
            id="date-picker"
            label="Fecha de compra"
            placeholder="Seleccione una fecha"
            value={form.fechaCompra}
            onChange={date => handleChange("fechaCompra", date)}
            required
          />
        </div>
        <div>
          <Label htmlFor="linkAmazon">Link Ropa</Label>
          <InputLinks
            type="text"
            id="linkAmazon"
            placeholder="Ej: https://www.amazon.com/dp/B0DG6XW36Z?ref=ppx_yo2ov_dt_b_fed_asin_title"
            value={form.linkAmazon}
            onChange={e => handleChange("linkAmazon", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="linkUrlImagen">Link Imagen Ropa</Label>
          <InputLinks
            type="text"
            id="linkUrlImagen"
            placeholder="Ej: https://m.media-amazon.com/images/I/51fZ8HdmIIL._AC_SX679_.jpg"
            value={form.linkUrlImagen}
            onChange={e => handleChange("linkUrlImagen", e.target.value)}
            required
          />
        </div>
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
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
};

export default PurchaseStatus;