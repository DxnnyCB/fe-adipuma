import React from "react";
import { TableRow, TableCell } from "../../../ui/table";
import Badge from "../../../ui/badge/Badge";
import { TrashBinIcon, PencilIcon } from "../../../../icons";
import { Product } from "../../interfaces/Product.interface";

interface ProductTableRowProps {
  product: Product;
  paymentMethods: string[];
  popoverProductId: string | null;
  setPopoverProductId: (id: string | null) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProductTableRow: React.FC<ProductTableRowProps> = ({
  product,
  paymentMethods,
  popoverProductId,
  setPopoverProductId,
  onEdit,
  onDelete,
}) => (
  <TableRow key={product.id}>
    <TableCell className="px-5 py-4 sm:px-6 text-center">
      <div className="flex items-center justify-center gap-3">
        <a
          href={product.idEstadoCompra.linkAmazon}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          onMouseEnter={() => setPopoverProductId(String(product.id))}
          onMouseLeave={() => setPopoverProductId(null)}
          style={{ position: "relative" }}
        >
          <img
            src={product.idEstadoCompra.linkUrlImagen}
            alt={product.descripcion}
            className="w-12 h-12 object-cover rounded-full"
          />
          {popoverProductId === String(product.id) && (
            <div className="absolute z-20 left-14 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-slate-700 rounded shadow-lg px-4 py-2 text-sm w-56">
              {product.descripcion}
            </div>
          )}
        </a>
      </div>
    </TableCell>
    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
      ${product.idEstadoCompra.precioCompra.toLocaleString()}
    </TableCell>
    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
      <div className="flex flex-col items-center">
        <Badge
          size="sm"
          color={
            product.idEstadoCompra.estadoCompra === "Entregado"
              ? "success"
              : product.idEstadoCompra.estadoCompra === "En camino"
                ? "error"
                : "warning"
          }
        >
          {product.idEstadoCompra.estadoCompra}
        </Badge>
        {product.idEstadoCompra.fechaCompra && (
          <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            {new Date(product.idEstadoCompra.fechaCompra).toLocaleDateString()}
          </div>
        )}
      </div>
    </TableCell>
    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
      ${product.idEstadoVenta.precioVenta.toLocaleString()}
    </TableCell>
    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
      <div className="flex flex-col items-center">
        <Badge
          size="sm"
          color={
            product.idEstadoVenta.estadoVenta === "Vendido"
              ? "success"
              : product.idEstadoVenta.estadoVenta === "Sin vender"
                ? "error"
                : "warning"
          }
        >
          {product.idEstadoVenta.estadoVenta}
        </Badge>
        {product.idEstadoVenta.fechaVenta && (
          <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            {new Date(product.idEstadoVenta.fechaVenta).toLocaleDateString()}
          </div>
        )}
      </div>
    </TableCell>
    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
      <Badge
        size="sm"
        color={
          paymentMethods.includes(product.idEstadoVenta.idMetodoPago.tipoPago)
            ? "success"
            : product.idEstadoVenta.estadoVenta === "Sin pago"
              ? "warning"
              : "error"
        }
      >
        {product.idEstadoVenta.idMetodoPago.tipoPago}
      </Badge>
    </TableCell>
    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
      <Badge
        size="sm"
        color={
          product.idEstadoVenta.ganancia >= 100000
            ? "success"
            : product.idEstadoVenta.ganancia > 0
              ? "warning"
              : "error"
        }
      >
        ${product.idEstadoVenta.ganancia.toLocaleString()}
      </Badge>
    </TableCell>
    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
      <Badge
        size="sm"
        color={
          product.idEstadoVenta.comision >= 100000
            ? "success"
            : product.idEstadoVenta.comision > 0
              ? "warning"
              : "error"
        }
      >
        ${product.idEstadoVenta.comision.toLocaleString()}
      </Badge>
    </TableCell>
    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
      <div className="flex items-center justify-center gap-2">
        <TrashBinIcon
          className="w-5 h-5 text-red-500 cursor-pointer"
          onClick={() => onDelete(String(product.id))}
        />
        <PencilIcon
          className="w-5 h-5 text-blue-500 cursor-pointer"
          onClick={() => onEdit(String(product.id))}
        />
      </div>
    </TableCell>
  </TableRow>
);

export default ProductTableRow;