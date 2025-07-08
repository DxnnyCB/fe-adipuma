import { useState, useCallback } from "react";
import { addFinalProduct } from "../components/product/services/CREATE/AddFinalProduct";
import type { FinalProductOnSubmit } from "../components/product/interfaces/ProductOnSubmit.interface";
import type { FinalProductResponse } from "../components/product/interfaces/FinalProductResponse.interface";
import { toast } from "react-toastify";
import { validateFinalProductFields } from "../components/product/view-product/utils/PurchaseStatusFunctions";
import { toastStyles } from "../styles/toastStyles";

const PRODUCT_SUCCESS = "Se ha guardado la prenda: ";
const PRODUCT_ERROR = "Error al guardar la prenda: ";

type UseFinalProductProps = FinalProductOnSubmit;

export function useFinalProduct({ onSubmit, idEstadoCompra, idEstadoVenta }: UseFinalProductProps) {
  const [descripcion, setDescripcion] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Extrae el id numérico si viene como objeto { id: number }
      const idCompra = typeof idEstadoCompra === "object" && idEstadoCompra !== null && "id" in idEstadoCompra
        ? idEstadoCompra.id
        : idEstadoCompra;
      const idVenta = typeof idEstadoVenta === "object" && idEstadoVenta !== null && "id" in idEstadoVenta
        ? idEstadoVenta.id
        : idEstadoVenta;

      const errorMsg = validateFinalProductFields({
        descripcion,
        observaciones,
        idEstadoCompra: idCompra,
        idEstadoVenta: idVenta,
      });
      if (errorMsg) {
        setError(errorMsg);
        return;
      }
      setError(null);
      setLoading(true);

      // Ajusta el objeto data para cumplir con el tipo FinalProduct esperado por la API
      const data = {
        descripcion,
        observaciones,
        idEstadoCompra: { id: idCompra as number },
        idEstadoVenta: { id: idVenta as number },
      };

      try {
        const response = (await addFinalProduct(data)) as FinalProductResponse;
        toast.success(PRODUCT_SUCCESS + response.descripcion + " de forma correcta", {
          style: toastStyles.success,
        });
        onSubmit(response);
        setDescripcion("");
        setObservaciones("");
      } catch (err) {
        setError(PRODUCT_ERROR + (err instanceof Error ? err.message : String(err)));
        toast.error(PRODUCT_ERROR + (err instanceof Error ? err.message : String(err)), {
          style: toastStyles.error,
        });
      } finally {
        setLoading(false);
      }
    },
    [descripcion, observaciones, idEstadoCompra, idEstadoVenta, onSubmit]
  );

  return {
    descripcion,
    setDescripcion,
    observaciones,
    setObservaciones,
    error,
    loading,
    handleSubmit,
  };
}
