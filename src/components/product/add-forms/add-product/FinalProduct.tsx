import ComponentCard from "../../../common/ComponentCard.tsx";
import Label from "../../../form/Label.tsx";
import Input from "../../../form/input/InputField.tsx";
import Button from "../../../ui/button/Button.tsx";
import { PaperPlaneIcon } from "../../../../icons/index.ts";
import type { FinalProductOnSubmit } from "../../interfaces/ProductOnSubmit.interface.tsx";
import { useFinalProduct } from "../../../../hooks/useFinalProduct.ts";

export default function FinalProduct({ onSubmit, idEstadoCompra, idEstadoVenta }: FinalProductOnSubmit) {
  const {
    descripcion,
    setDescripcion,
    observaciones,
    setObservaciones,
    error,
    loading,
    handleSubmit,
  } = useFinalProduct({ onSubmit, idEstadoCompra, idEstadoVenta });

  return (
    <ComponentCard title="Finalizar Producto">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        <div>
          <Label htmlFor="descripcion">Nombre Prenda</Label>
          <Input
            type="text"
            id="descripcion"
            placeholder="Ej: Camiseta Nike talla M"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="observaciones">Observaciones</Label>
          <Input
            type="text"
            id="observaciones"
            placeholder="Observaciones adicionales"
            value={observaciones}
            onChange={e => setObservaciones(e.target.value)}
            required={false}
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
}