import React, { useState } from "react";
import { Product } from "../../interfaces/Product.interface";
import { toast } from "react-toastify";
import { updateFinalProduct } from "../../services/UPDATE/UpdateFinalProduct";
import Label from "../../../form/Label";
import Input from "../../../form/input/InputField";
import Button from "../../../ui/button/Button";
import { toastStyles } from "../../../../styles/toastStyles";


interface Props {
  product: Product;
  onUpdated: () => void;
  onCancel?: () => void;
}

const EditProductForm: React.FC<Props> = ({ product, onUpdated, onCancel }) => {
  const [form, setForm] = useState({ ...product });
  const [loading, setLoading] = useState(false);
  // Detectar si hay cambios respecto al producto original
  const isDirty =
    form.descripcion !== product.descripcion ||
    form.observaciones !== product.observaciones ||
    form.idEstadoCompra?.id !== product.idEstadoCompra?.id ||
    form.idEstadoVenta?.id !== product.idEstadoVenta?.id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateFinalProduct(product.id, {
        id: typeof product.id === 'string' ? parseInt(product.id, 10) : product.id,
        descripcion: form.descripcion,
        observaciones: form.observaciones,
        idEstadoCompra: { id: Number(form.idEstadoCompra.id) },
        idEstadoVenta: { id: Number(form.idEstadoVenta.id) },
      });
      toast.success("Prenda actualizado correctamente", {
        style: toastStyles.success,
      });
      onUpdated();
      console.log("Prenda actualizado, pero el modal sigue activo");
    } catch (err) {
      toast.error("Error actualizando prenda" + (err instanceof Error ? `: ${err.message}` : ""), {
        style: toastStyles.error,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {form.idEstadoCompra?.linkUrlImagen && (
        <div className="flex justify-center mb-6">
          <img
            src={form.idEstadoCompra.linkUrlImagen}
            alt={form.descripcion || "Imagen del producto"}
            className="max-h-64 w-auto rounded-xl object-contain border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            style={{ maxWidth: '100%' }}
          />
        </div>
      )}
      <div>
        <Label htmlFor="descripcion">Nombre Prenda</Label>
        <Input
          type="text"
          id="descripcion"
          name="descripcion"
          placeholder="Ej: Camiseta Nike talla M"
          value={form.descripcion}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="observaciones">Observaciones</Label>
        <Input
          type="text"
          id="observaciones"
          name="observaciones"
          placeholder="Observaciones adicionales"
          value={form.observaciones}
          onChange={handleChange}
          required={false}
        />
      </div>
      <div className="flex justify-end gap-5">
        {onCancel && (
          <Button
            type="button"
            size="md"
            variant="danger"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
        )}
        <Button
          type="submit"
          size="md"
          variant="primary"
          disabled={loading || !isDirty}
        >
          {loading ? "Actualizando..." : "Actualizar prenda"}
        </Button>
      </div>
    </form>
  );
};

export default EditProductForm;
