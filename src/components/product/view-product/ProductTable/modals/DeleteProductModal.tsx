import React from "react";
import { Modal } from "../../../../ui/modal";
import { Product } from "../../../interfaces/Product.interface";

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  product?: Product;
}

export const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  product,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    showCloseButton={false}
    className="max-w-md p-6 rounded-2xl shadow-lg"
    aria-labelledby="delete-modal-title"
    aria-describedby="delete-modal-desc"
  >
    <h2 id="delete-modal-title" className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
      Alerta de borrado
    </h2>
    <div className="flex flex-col items-center mb-6">
      <p className="text-gray-600 text-center dark:text-gray-300 mb-3">
        Estás a punto de eliminar la siguiente prenda: <br />
        <span className="font-bold text-red-600 dark:text-red-400 text-center">
          {product?.descripcion || "Descripción no disponible"}
        </span>
      </p>
      {product?.idEstadoCompra?.linkUrlImagen && (
        <div className="mb-3">
          <img
            src={product.idEstadoCompra.linkUrlImagen}
            alt={product.descripcion}
            className="w-20 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
            onError={e => (e.currentTarget.style.display = "none")}
          />
        </div>
      )}
      <p id="delete-modal-desc" className="text-gray-600 text-center dark:text-gray-300">
        ¿Estás seguro de que deseas continuar?
      </p>
    </div>
    <div className="flex justify-end gap-4">
      <button
        onClick={onClose}
        className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        disabled={isDeleting}
      >
        Cancelar
      </button>
      <button
        onClick={onConfirm}
        disabled={isDeleting}
        className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
      >
        {isDeleting ? "Eliminando..." : "Eliminar"}
      </button>
    </div>
  </Modal>
);
