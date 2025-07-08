import React, { useState } from "react";
import { Product } from "../../../interfaces/Product.interface";
import { Modal } from "../../../../ui/modal";
import EditProductForm from "../EditProductForm";
import EditPurchaseStatusForm from "../EditPurchaseStatusForm";
import EditSaleStatusForm from "../EditSaleStatusForm";


interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | undefined;
  onUpdated: () => void;
}

const TABS = [
  { label: "Producto", key: "producto" },
  { label: "Estado de Compra", key: "compra" },
  { label: "Estado de Venta", key: "venta" },
];

const EditProductModal: React.FC<EditProductModalProps> = ({ isOpen, onClose, product, onUpdated }) => {
  const [activeTab, setActiveTab] = useState("producto");

  const handleClose = () => {
    setActiveTab("producto"); // Reinicia la tab activa a "producto"
    onClose();
  };

  if (!product) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose} // Usa handleClose en lugar de onClose directamente
      className="max-w-2xl p-10 rounded-2xl shadow-lg"
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-desc"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
        aria-label="Cerrar"
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 id="edit-modal-title" className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
        Información del producto
      </h2>
      <div className="mb-8">
        <nav className="flex gap-2 justify-center" aria-label="Tabs">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500
                ${activeTab === tab.key
                  ? "bg-[#2d3650] text-white shadow"
                  : "bg-transparent text-gray-400 dark:text-gray-400 hover:bg-[#232a3b] hover:text-white"}
              `}
              onClick={() => setActiveTab(tab.key)}
              type="button"
              aria-current={activeTab === tab.key ? "page" : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div id="edit-modal-desc">
        {activeTab === "producto" && (
          <EditProductForm product={product} onUpdated={onUpdated} onCancel={handleClose} />
        )}
        {activeTab === "compra" && (
          <EditPurchaseStatusForm product={product} onUpdated={onUpdated} onCancel={handleClose} />
        )}
        {activeTab === "venta" && (
          <EditSaleStatusForm product={product} onUpdated={onUpdated} onCancel={handleClose} />
        )}
      </div>
    </Modal>
  );
};

export default EditProductModal;
