import { useState } from "react";
import PurchaseStatus from "../add-forms/add-status-purchase/PurchaseStatus";
import SaleStatus from "../add-forms/add-status-sale/SaleStatus";
import FinalProduct from "../add-forms/add-product/FinalProduct";
import { useNavigate } from "react-router-dom";

const steps = [
  { label: "Estado de Compra" },
  { label: "Estado de Venta" },
  { label: "Finalizar Producto" },
];

export default function ProductWizard() {
  const [step, setStep] = useState(1);
  const [purchaseData, setPurchaseData] = useState<unknown>(null);
  const [saleData, setSaleData] = useState<unknown>(null);
  const [purchaseId, setPurchaseId] = useState<number | null>(null);
  const [saleId, setSaleId] = useState<number | null>(null);

  const navigate = useNavigate();

  // Recibe los datos de PurchaseStatus y avanza
  const handlePurchaseSubmit = (data: unknown) => {
    setPurchaseData(data);
    if (data && typeof data === "object" && "id" in data) {
      setPurchaseId((data as { id: number }).id);
    } else {
      setPurchaseId(null);
    }
    setStep(2);
  };

  // Recibe los datos de SaleStatus y avanza
  const handleSaleSubmit = (data: unknown) => {
    setSaleData(data);
    if (data && typeof data === "object" && "id" in data) {
      setSaleId((data as { id: number }).id);
    } else {
      setSaleId(null);
    }
    setStep(3);
  };

  // Recibe los datos finales y muestra todo (o envía al backend)
  const handleFinalSubmit = (finalData: unknown) => {
    const allData = {
      ...(purchaseData && typeof purchaseData === "object" ? purchaseData : {}),
      ...(saleData && typeof saleData === "object" ? saleData : {}),
      ...(finalData && typeof finalData === "object" ? finalData : {}),
    };
    console.log("Datos finales del producto:", allData);
    setTimeout(() => {
      navigate("/product-table");
    }, 1000);
  };

  // Progress bar width
  const progressPercent = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <div>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((s, idx) => (
            <div key={s.label} className="flex-1 flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold
                  ${step === idx + 1
                    ? "bg-blue-600"
                    : step > idx + 1
                      ? "bg-green-500"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
              >
                {idx + 1}
              </div>
              <span className="mt-2 text-xs text-center text-gray-700 dark:text-gray-300">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="relative h-2 bg-gray-200 dark:bg-gray-800 rounded-full">
          <div
            className="absolute h-2 bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Form Steps */}
      {step === 1 && (
        <>
          <PurchaseStatus onSubmit={handlePurchaseSubmit} />
        </>
      )}
      {step === 2 && (
        <SaleStatus
          precioCompra={
            purchaseData && typeof purchaseData === "object" && "precioCompra" in purchaseData
              ? (purchaseData as { precioCompra?: number }).precioCompra ?? null
              : null
          }
          onSubmit={handleSaleSubmit}
        />
      )}
      {step === 3 && (
        <FinalProduct
          onSubmit={handleFinalSubmit}
          idEstadoCompra={purchaseId ? { id: purchaseId } : null}
          idEstadoVenta={saleId ? { id: saleId } : null}
        />
      )}
    </div>
  );
}