import React, { useState } from "react";
import { Product } from "../../interfaces/Product.interface";
import { StatusPurchase } from "../../interfaces/PurchaseStatus.interface";
import { toast } from "react-toastify";
import { updatePurchaseStatus } from "../../services/UPDATE/UpdatePurchaseStatus";
import Label from "../../../form/Label";
import InputPrices from "../../../form/input/InputPrices";
import Select from "../../../form/Select";
import DatePicker from "../../../form/date-picker";
import Button from "../../../ui/button/Button";
import InputLinks from "../../../form/input/InputLinks";
import { toastStyles } from "../../../../styles/toastStyles";

interface Props {
  product: Product;
  onUpdated: () => void;
  onCancel?: () => void;
}


const EditPurchaseStatusForm: React.FC<Props> = ({ product, onUpdated, onCancel }) => {
  const [linkAmazonError, setLinkAmazonError] = useState<string | null>(null);
  const [linkUrlImagenError, setLinkUrlImagenError] = useState<string | null>(null);
  const [precioCompraError, setPrecioCompraError] = useState<string | null>(null);

  const [form, setForm] = useState<StatusPurchase>({
    ...product.idEstadoCompra,
    id: Number(product.idEstadoCompra.id),
  });
  const [loading, setLoading] = useState(false);

  const handleChange = <K extends keyof StatusPurchase>(name: K, value: StatusPurchase[K]) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePurchaseStatus(product.idEstadoCompra.id, form);
      toast.success("Estado de compra actualizado correctamente", {
        style: toastStyles.success,
      });
      onUpdated();
    } catch (err) {
      toast.error("Error actualizando estado de compra" + (err instanceof Error ? `: ${err.message}` : ""), {
        style: toastStyles.error,
      });
    } finally {
      setLoading(false);
    }
  };

  const isDirty =
    form.precioCompra !== product.idEstadoCompra.precioCompra ||
    form.estadoCompra !== product.idEstadoCompra.estadoCompra ||
    form.fechaCompra !== product.idEstadoCompra.fechaCompra ||
    form.linkAmazon !== product.idEstadoCompra.linkAmazon ||
    form.linkUrlImagen !== product.idEstadoCompra.linkUrlImagen;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="precioCompra">Precio compra</Label>
        <InputPrices
          minValue={10000}
          maxValue={999999}
          type="text"
          id="precioCompra"
          name="precioCompra"
          placeholder="Ej: $200.000"
          value={form.precioCompra}
          onChange={e => handleChange("precioCompra", Number(e.target.value))}
          required
          onErrorChange={setPrecioCompraError}
        />
      </div>
      <div>
        <Label>Estado Compra</Label>
        <Select
          options={[
            { value: "Entregado", label: "Entregado" },
            { value: "En camino", label: "En camino" },
          ]}
          placeholder="Seleccione una opción"
          value={form.estadoCompra}
          onChange={value => handleChange("estadoCompra", value)}
          required
        />
      </div>
      <div>
        <DatePicker
          id="fechaCompra"
          label="Fecha de compra"
          placeholder="Seleccione una fecha"
          value={form.fechaCompra ? new Date(form.fechaCompra) : null}
          onChange={date => handleChange("fechaCompra", date ? date.toISOString().slice(0, 10) : "")}
          required
        />
      </div>
      <div>
        <Label htmlFor="linkAmazon">Link Ropa</Label>
        <InputLinks
          type="text"
          id="linkAmazon"
          name="linkAmazon"
          placeholder="Ej: https://www.amazon.com/dp/B0DG6XW36Z?ref=ppx_yo2ov_dt_b_fed_asin_title"
          value={form.linkAmazon}
          onChange={e => handleChange("linkAmazon", e.target.value)}
          required
          onErrorChange={setLinkAmazonError}
        />
      </div>
      <div>
        <Label htmlFor="linkUrlImagen">Link Imagen Ropa</Label>
        <InputLinks
          type="text"
          id="linkUrlImagen"
          name="linkUrlImagen"
          placeholder="Ej: https://m.media-amazon.com/images/I/51fZ8HdmIIL._AC_SX679_.jpg"
          value={form.linkUrlImagen}
          onChange={e => handleChange("linkUrlImagen", e.target.value)}
          required
          onErrorChange={setLinkUrlImagenError}
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
          disabled={
            loading ||
            !isDirty ||
            !!precioCompraError ||
            !!linkAmazonError ||
            !!linkUrlImagenError
          }
        >
          {loading ? "Actualizando..." : "Actualizar estado de compra"}
        </Button>
      </div>
    </form>
  );
};

export default EditPurchaseStatusForm;
