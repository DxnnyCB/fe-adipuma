import React, { useState } from "react";
import ComponentCard from "../../../common/ComponentCard.tsx";
import Label from "../../../form/Label.tsx";
import InputPrices from "../../../form/input/InputPrices.tsx";
import Select from "../../../form/Select.tsx";
import DatePicker from "../../../form/date-picker.tsx";
import Button from "../../../ui/button/Button.tsx";
import { PaperPlaneIcon } from "../../../../icons/index.ts";
import InputLinks from "../../../form/input/InputLinks.tsx";
//import { addPurchaseStatus } from "../../services/CREATE/AddPurchaseStatus.ts";
import { toast } from "react-toastify";
//import { PurchaseStatusResponse } from "../../interfaces/PurchaseStatusResponse.interface.tsx";

interface PurchaseStatusProps {
  onSubmit: (data: {
    precioCompra: number;
    estadoCompra: string;
    fechaCompra: string;
    linkAmazon: string;
    linkUrlImagen: string;
  }) => void;
}

export default function PurchaseStatus({ onSubmit }: PurchaseStatusProps) {
  const [precioCompra, setPrecioCompra] = useState("");
  const [estadoCompra, setEstadoCompra] = useState("");
  const [fechaCompra, setFechaCompra] = useState<Date | null>(null);
  const [linkAmazon, setlinkAmazon] = useState("");
  const [linkUrlImagen, setlinkUrlImagen] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const options = [
    { value: "En camino", label: "En camino" },
    { value: "Entregado", label: "Entregado" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (
      !precioCompra.trim() ||
      !estadoCompra ||
      !fechaCompra ||
      !linkAmazon.trim() ||
      !linkUrlImagen.trim()
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    setError(null);
    setLoading(true);

    // Formatea la fecha como "DD-MM-YYYY"
    let fechaFormateada = "";
    if (fechaCompra instanceof Date && !isNaN(fechaCompra.getTime())) {
      const year = fechaCompra.getFullYear();
      const month = String(fechaCompra.getMonth() + 1).padStart(2, "0");
      const day = String(fechaCompra.getDate()).padStart(2, "0");
      fechaFormateada = `${year}-${month}-${day}`;
    }

    // Convierte precioCompra a number
    const precioCompraNumber = parseInt(precioCompra.replace(/\D/g, ""), 10);

    const data = {
      precioCompra: precioCompraNumber,
      estadoCompra,
      fechaCompra: fechaFormateada,
      linkAmazon,
      linkUrlImagen,
    };
    
    try {
      //const response = await addStatusPurchase(data) as PurchaseStatusResponse;
      toast.success("Estado de compra agregado satisfactoriamente");
      onSubmit(data); // Llama a la función onSubmit pasada como prop
    } catch (err) {
      setError("Error al guardar el estado de compra. " + err);
      toast.error("Error al guardar el estado de compra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComponentCard title="Agregar Estado de Compra">
      <form className="space-y-6" onSubmit={handleSubmit}>
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
            value={precioCompra}
            onChange={e => setPrecioCompra(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Estado Compra</Label>
          <Select
            options={options}
            placeholder="Seleccione una opción"
            value={estadoCompra}
            onChange={setEstadoCompra}
            className="dark:bg-dark-900"
            required
          />
        </div>
        <div>
          <DatePicker
            id="date-picker"
            label="Fecha de compra"
            placeholder="Seleccione una fecha"
            value={fechaCompra}
            onChange={(date) => setFechaCompra(date)}
            required
          />
        </div>
        <div>
          <Label htmlFor="linkAmazon">Link Ropa</Label>
          <InputLinks
            type="text"
            id="linkAmazon"
            placeholder="Ej: https://www.amazon.com/dp/B0DG6XW36Z?ref=ppx_yo2ov_dt_b_fed_asin_title"
            value={linkAmazon}
            onChange={e => setlinkAmazon(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="linkUrlImagen">Link Imagen Ropa</Label>
          <InputLinks
            type="text"
            id="linkUrlImagen"
            placeholder="Ej: https://m.media-amazon.com/images/I/51fZ8HdmIIL._AC_SX679_.jpg"
            value={linkUrlImagen}
            onChange={e => setlinkUrlImagen(e.target.value)}
            required
          />
        </div>
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
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}