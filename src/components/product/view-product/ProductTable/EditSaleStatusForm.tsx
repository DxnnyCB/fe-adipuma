import React, { useState, useEffect, useCallback } from "react";
import { Product } from "../../interfaces/Product.interface";
import { SaleStatus } from "../../interfaces/SaleStatus.interface";

// Extiende el tipo para idMetodoPago
type MetodoPago = { id: number; tipoPago: string };
type SaleStatusWithMetodoPago = Omit<SaleStatus, 'idMetodoPago'> & { idMetodoPago: MetodoPago };
import { toast } from "react-toastify";
import { updateSaleStatus } from "../../services/UPDATE/UpdateSaleStatus";
import Label from "../../../form/Label";
import InputPrices from "../../../form/input/InputPrices";
import Select from "../../../form/Select";
import DatePicker from "../../../form/date-picker";
import Button from "../../../ui/button/Button";
import { toastStyles } from "../../../../styles/toastStyles";
import { useSaleStatus } from "../../../../hooks/useSaleStatus";
import Checkbox from "../../../form/input/Checkbox";

interface Props {
    product: Product;
    onUpdated: () => void;
    onCancel?: () => void;
}

function getMetodoPagoId(metodoPago: unknown): number {
    if (
        typeof metodoPago === 'object' &&
        metodoPago !== null &&
        'id' in metodoPago &&
        typeof (metodoPago as { id: unknown }).id === 'number'
    ) {
        return (metodoPago as { id: number }).id;
    }
    return 0;
}

const EditSaleStatusForm: React.FC<Props> = ({ product, onUpdated, onCancel }) => {
    const {
        comisionActiva,
        calcularComision,
        setPrecioVenta,
        actualizarComisionActiva,
    } = useSaleStatus({
        precioCompra: product.idEstadoCompra.precioCompra,
        onSubmit: () => { },
    });

    const initialFormState: SaleStatusWithMetodoPago = {
        ...product.idEstadoVenta,
        idMetodoPago: {
            id: getMetodoPagoId(product.idEstadoVenta.idMetodoPago.id),
            tipoPago: product.idEstadoVenta.idMetodoPago?.tipoPago || ""
        }
    };
    const [form, setForm] = useState<SaleStatusWithMetodoPago>(initialFormState);
    const [initialForm] = useState<SaleStatusWithMetodoPago>(initialFormState);
    const [loading, setLoading] = useState(false);

    const handleChange = useCallback(<K extends keyof SaleStatusWithMetodoPago>(name: K, value: SaleStatusWithMetodoPago[K]) => {
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateSaleStatus(product.idEstadoVenta.id, {
                ...form,
                idMetodoPago: { id: form.idMetodoPago.id }
            });
            toast.success("Estado de venta actualizado correctamente", {
                style: toastStyles.success,
            });
            onUpdated();
        } catch (err) {
            toast.error("Error actualizando estado de venta" + (err instanceof Error ? `: ${err.message}` : ""), {
                style: toastStyles.error,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleComisionCheckboxChange = (checked: boolean) => {
        actualizarComisionActiva(checked);
        if (checked) {
            calcularComision(Number(form.ganancia));
        } else {
            handleChange("comision", 0);
        }
    };

    useEffect(() => {
        if (form.precioVenta && form.precioVenta !== product.idEstadoVenta.precioVenta) {
            setPrecioVenta(form.precioVenta.toString());
            const gananciaCalculada = Number(form.precioVenta) - Number(product.idEstadoCompra.precioCompra);
            handleChange("ganancia", gananciaCalculada);
            const comisionCalculada = calcularComision(gananciaCalculada);
            handleChange("comision", comisionCalculada);
        }
    }, [form.precioVenta, product.idEstadoCompra.precioCompra, product.idEstadoVenta.precioVenta, setPrecioVenta, calcularComision, handleChange]);


    // Función robusta para comparar el formulario con el estado original
    const isFormDirty = () => {
        const keys: (keyof SaleStatus)[] = [
            "estadoVenta",
            "precioVenta",
            "ganancia",
            "comision",
            "estadoComision",
            "faltaPagar",
            "fechaVenta",
            "idMetodoPago"
        ];
        for (const key of keys) {
            if (key === "idMetodoPago") {
                const formId = form.idMetodoPago?.id ?? null;
                const originalId = initialForm.idMetodoPago?.id ?? null;
                if (formId !== originalId) return true;
            } else {
                const formValue = form[key] ?? "";
                const originalValue = initialForm[key] ?? "";
                if (String(formValue) !== String(originalValue)) return true;
            }
        }
        return false;
    };
    const isDirty = isFormDirty();

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <Label>Estado Venta</Label>
                <Select
                    options={[
                        { value: "Vendido", label: "Vendido" },
                        { value: "Sin vender", label: "Sin vender" },
                    ]}
                    placeholder="Seleccione una opción"
                    value={form.estadoVenta}
                    onChange={value => handleChange("estadoVenta", value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="precioVenta">Precio Venta</Label>
                <InputPrices
                    minValue={10000}
                    maxValue={999999}
                    type="text"
                    id="precioVenta"
                    name="precioVenta"
                    placeholder="Ej: $200.000"
                    value={form.precioVenta}
                    onChange={(e) => {
                        const nuevoPrecioVenta = Number(e.target.value);
                        handleChange("precioVenta", nuevoPrecioVenta);
                        const gananciaCalculada = nuevoPrecioVenta - Number(product.idEstadoCompra.precioCompra);
                        setForm(prevForm => ({
                            ...prevForm,
                            ganancia: gananciaCalculada,
                            comision: gananciaCalculada * 0.035,
                        }));
                    }}
                    required
                />
            </div>
            <div>
                <Checkbox
                    label="¿Activar comisión?"
                    checked={comisionActiva}
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
                    name="comision"
                    placeholder="Ej: $10.000"
                    value={form.comision}
                    readOnly
                    required
                />
            </div>
            <div>
                <Label>Estado Comisión</Label>
                <Select
                    options={[
                        { value: "Pagada", label: "Pagada" },
                        { value: "Sin pagar", label: "Sin pagar" },
                        { value: "No aplica", label: "No aplica" },
                    ]}
                    placeholder="Seleccione una opción"
                    value={form.estadoComision}
                    onChange={value => handleChange("estadoComision", value)}
                    required
                />
            </div>
            <div className="hidden">
                <Label htmlFor="faltaPagar">Falta por Pagar</Label>
                <InputPrices
                    minValue={0}
                    maxValue={1000000}
                    type="text"
                    id="faltaPagar"
                    name="faltaPagar"
                    placeholder="Ej: $5.000"
                    value={form.faltaPagar}
                    onChange={e => handleChange("faltaPagar", Number(e.target.value))}
                />
            </div>
            <div>
                <DatePicker
                    id="fechaVenta"
                    label="Fecha de venta"
                    placeholder="Seleccione una fecha"
                    value={form.fechaVenta ? new Date(form.fechaVenta) : null}
                    onChange={date => handleChange("fechaVenta", date ? date.toISOString().slice(0, 10) : "")}
                    required
                />
            </div>
            <div>
                <Label>Método de Pago</Label>
                {(() => {
                    const metodosPago = [
                        { id: 1, tipoPago: "Nequi" },
                        { id: 2, tipoPago: "Efectivo" },
                        { id: 3, tipoPago: "Sin pago" },
                        { id: 4, tipoPago: "Nequi y Efectivo" },
                    ];

                    return (
                        <Select
                            options={metodosPago.map(mp => ({
                                value: mp.tipoPago, // usamos tipoPago como value
                                label: mp.tipoPago
                            }))}
                            placeholder="Seleccione una opción"
                            value={form.idMetodoPago?.tipoPago || ""}
                            onChange={value => {
                                const selected = metodosPago.find(mp => mp.tipoPago === value);
                                if (selected) {
                                    handleChange("idMetodoPago", {
                                        id: selected.id,
                                        tipoPago: selected.tipoPago
                                    });
                                } else {
                                    handleChange("idMetodoPago", {
                                        id: 0,
                                        tipoPago: value
                                    });
                                }
                            }}
                            required
                        />
                    );
                })()}
            </div>

            <div>
                <Label htmlFor="ganancia">Ganancia</Label>
                <InputPrices
                    minValue={0}
                    maxValue={1000000}
                    type="text"
                    id="ganancia"
                    name="ganancia"
                    placeholder="Ej: $20.000"
                    value={form.ganancia}
                    readOnly
                    required
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
                    {loading ? "Actualizando..." : "Actualizar estado de venta"}
                </Button>
            </div>
        </form>
    );
};

export default EditSaleStatusForm;
