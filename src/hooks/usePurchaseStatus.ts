import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { addPurchaseStatus } from "../components/product/services/CREATE/AddPurchaseStatus";
import { PurchaseStatusResponse } from "../components/product/interfaces/PurchaseStatusResponse.interface";
import { formatDate, validatePurchaseFields } from "../components/product/view-product/utils/PurchaseStatusFunctions";
import { toastStyles } from "../styles/toastStyles";

export const estadoCompraOptions = [
  { value: "En camino", label: "En camino" },
  { value: "Entregado", label: "Entregado" },
];

const ESTADO_COMPRA_SUCCESS = "Estado de compra agregado satisfactoriamente";
const ESTADO_COMPRA_ERROR = "Error al guardar el estado de compra: ";

interface PurchaseStatusForm {
  precioCompra: string;
  estadoCompra: string;
  fechaCompra: Date | null;
  linkAmazon: string;
  linkUrlImagen: string;
}

const initialFormState: PurchaseStatusForm = {
  precioCompra: "",
  estadoCompra: "",
  fechaCompra: null,
  linkAmazon: "",
  linkUrlImagen: "",
};

interface UsePurchaseStatusProps {
  onSubmit: (data: PurchaseStatusResponse) => void;
}

export function usePurchaseStatus({ onSubmit }: UsePurchaseStatusProps) {
  const [form, setForm] = useState<PurchaseStatusForm>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback(
    (field: keyof PurchaseStatusForm, value: string | Date | null) => {
      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      console.log("[PurchaseStatus] handleSubmit called");
      e.preventDefault();
      console.log("[PurchaseStatus] form state:", form);

      const errorMsg = validatePurchaseFields(form);
      if (errorMsg) {
        setError(errorMsg);
        console.warn("[PurchaseStatus] Validation error:", errorMsg);
        return;
      }
      setError(null);
      setLoading(true);

      const fechaFormateada = formatDate(form.fechaCompra);
      const precioCompraNumber = Number(form.precioCompra.replace(/\D/g, ""));

      const data = {
        precioCompra: precioCompraNumber,
        estadoCompra: form.estadoCompra,
        fechaCompra: fechaFormateada,
        linkAmazon: form.linkAmazon,
        linkUrlImagen: form.linkUrlImagen,
      };
      console.log("[PurchaseStatus] Data to send:", data);

      try {
        const response = (await addPurchaseStatus(data)) as PurchaseStatusResponse;
        toast.success(ESTADO_COMPRA_SUCCESS, {
          style: toastStyles.success,
        });
        console.log("[PurchaseStatus] API response:", response);
        onSubmit(response);
        setForm(initialFormState); // Limpia el formulario tras éxito
      } catch (err) {
        setError(ESTADO_COMPRA_ERROR + (err instanceof Error ? err.message : String(err)));
        toast.error(ESTADO_COMPRA_ERROR + (err instanceof Error ? err.message : String(err)), {
          style: toastStyles.error,
        });
        console.error("[PurchaseStatus] API error:", err);
      } finally {
        setLoading(false);
      }
    },
    [form, onSubmit]
  );

  return {
    form,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
}
