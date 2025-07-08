// Popover accesible y reutilizable
interface PopoverProps {
  open: boolean;
  anchorRef: React.RefObject<HTMLAnchorElement>;
  children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ open, anchorRef, children }) => {
  const [position, setPosition] = React.useState<{ left: number; top: number }>({ left: 0, top: 0 });
  React.useLayoutEffect(() => {
    if (open && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({ left: rect.right + 8, top: rect.top + rect.height / 2 });
    }
  }, [open, anchorRef]);
  if (!open) return null;
  return (
    <div
      className="fixed z-20 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-slate-700 rounded shadow-lg px-4 py-2 text-sm w-56"
      style={{ left: position.left, top: position.top, transform: 'translateY(-50%)' }}
      role="tooltip"
      aria-live="polite"
    >
      {children}
    </div>
  );
};

import React, { useCallback } from "react";
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



// Utilidades para lógica de color y texto
const getCompraBadgeColor = (estado: string) => {
  if (estado === "Entregado") return "success";
  if (estado === "En camino") return "error";
  return "warning";
};

const getVentaBadgeColor = (estado: string) => {
  if (estado === "Vendido") return "success";
  if (estado === "Sin vender") return "error";
  return "warning";
};

const getMetodoPagoBadgeColor = (tipoPago: string, estadoVenta: string, paymentMethods: string[]) => {
  if (paymentMethods.includes(tipoPago)) return "success";
  if (estadoVenta === "Sin pago") return "warning";
  return "error";
};

const getGananciaBadgeColor = (ganancia: number) => {
  if (ganancia >= 100000) return "success";
  if (ganancia > 0) return "warning";
  return "error";
};

const getComisionBadgeColor = (comision: number) => {
  if (comision >= 100000) return "success";
  if (comision > 0) return "warning";
  return "error";
};

const getEstadoComisionColor = (estado: string) => {
  if (estado === "Pagada") return "text-green-500";
  if (estado === "Sin pagar") return "text-red-500";
  if (estado === "No aplica") return "text-blue-500";
  return "text-gray-400 dark:text-gray-500";
};

const ProductTableRow: React.FC<ProductTableRowProps> = React.memo(({
  product,
  paymentMethods,
  popoverProductId,
  setPopoverProductId,
  onEdit,
  onDelete,
}) => {
  // Callbacks para accesibilidad y performance
  const handleDelete = useCallback(() => onDelete(String(product.id)), [onDelete, product.id]);
  const handleEdit = useCallback(() => onEdit(String(product.id)), [onEdit, product.id]);

  // Ref para el ancla del popover
  const imgLinkRef = React.useRef<HTMLAnchorElement>(null);

  // Mostrar popover también al enfocar con teclado
  const handleFocus = () => setPopoverProductId(String(product.id));
  const handleBlur = () => setPopoverProductId(null);

  return (
    <TableRow key={product.id}>
      <TableCell className="px-5 py-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <a
            ref={imgLinkRef}
            href={product.idEstadoCompra.linkAmazon}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver producto en Amazon: ${product.descripcion}`}
            onClick={e => e.stopPropagation()}
            onMouseEnter={handleFocus}
            onMouseLeave={handleBlur}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ position: "relative" }}
            tabIndex={0}
          >
            <img
              src={product.idEstadoCompra.linkUrlImagen}
              alt={product.descripcion}
              className="w-12 h-12 object-cover rounded-full"
              loading="lazy"
            />
          </a>
          <Popover open={popoverProductId === String(product.id)} anchorRef={imgLinkRef as React.RefObject<HTMLAnchorElement>}>
            {product.descripcion}
          </Popover>
        </div>
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
        ${product.idEstadoCompra.precioCompra.toLocaleString()}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
        <div className="flex flex-col items-center">
          <Badge size="sm" color={getCompraBadgeColor(product.idEstadoCompra.estadoCompra)}>
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
          <Badge size="sm" color={getVentaBadgeColor(product.idEstadoVenta.estadoVenta)}>
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
          color={getMetodoPagoBadgeColor(product.idEstadoVenta.idMetodoPago.tipoPago, product.idEstadoVenta.estadoVenta, paymentMethods)}
        >
          {product.idEstadoVenta.idMetodoPago.tipoPago}
        </Badge>
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
        <Badge size="sm" color={getGananciaBadgeColor(product.idEstadoVenta.ganancia)}>
          ${product.idEstadoVenta.ganancia.toLocaleString()}
        </Badge>
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
        <Badge size="sm" color={getComisionBadgeColor(product.idEstadoVenta.comision)}>
          ${product.idEstadoVenta.comision.toLocaleString()}
        </Badge>
        {product.idEstadoVenta.estadoComision && (
          <div
            className={`mt-1 text-xs ${getEstadoComisionColor(product.idEstadoVenta.estadoComision)}`}
            aria-label={`Estado comisión: ${product.idEstadoVenta.estadoComision}`}
          >
            {product.idEstadoVenta.estadoComision}
          </div>
        )}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            aria-label="Eliminar producto"
            className="focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
            onClick={handleDelete}
            tabIndex={0}
            title="Eliminar producto"
          >
            <TrashBinIcon className="w-5 h-5 text-red-500" />
          </button>
          <button
            type="button"
            aria-label="Editar producto"
            className="focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            onClick={handleEdit}
            tabIndex={0}
            title="Editar producto"
          >
            <PencilIcon className="w-5 h-5 text-blue-500" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
});

export default ProductTableRow;