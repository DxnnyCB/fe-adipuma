import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "../../../ui/table";
import { Product } from "../../interfaces/Product.interface";
import ProductTableRow from "./ProductTableRow";
import ProductPagination from "./ProductPagination";

// Simple skeleton loader
const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="animate-pulse">
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <tbody>
          {[...Array(rows)].map((_, i) => (
            <tr key={i}>
              {[...Array(9)].map((_, j) => (
                <td key={j} className="px-4 py-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Subcomponente para la paginación y el resumen
interface PaginationFooterProps {
  page: number;
  pageSize: number;
  filteredCount: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const PaginationFooter: React.FC<PaginationFooterProps> = ({ page, pageSize, filteredCount, totalPages, setPage }) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full mt-2 px-4 pb-4">
    <span className="text-sm text-gray-700 dark:text-gray-300 mb-2 md:mb-0">
      Mostrando {(page - 1) * pageSize + 1}
      {" a "}
      {Math.min(page * pageSize, filteredCount)}
      {" de "}
      {filteredCount} registros
    </span>
    <ProductPagination page={page} totalPages={totalPages} setPage={setPage} />
  </div>
);

interface ProductTableProps {
  products: Product[];
  paymentMethods: string[];
  popoverProductId: string | null;
  setPopoverProductId: (id: string | null) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  pageSize: number;
  filteredCount: number;
}


const ProductTable: React.FC<ProductTableProps & { loading?: boolean }> = ({
  products,
  paymentMethods,
  popoverProductId,
  setPopoverProductId,
  onEdit,
  onDelete,
  page,
  totalPages,
  setPage,
  pageSize,
  filteredCount,
  loading = false,
}) => {
  // Si loading, muestra skeleton
  if (loading) {
    return <TableSkeleton rows={pageSize} />;
  }
  if (products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400 text-sm">
        No hay productos para mostrar.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
          <TableRow>
            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
              Imagen
            </TableCell>
            <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
              Precio Compra
            </TableCell>
            <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
              Estado Compra
            </TableCell>
            <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
              Precio Venta
            </TableCell>
            <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
              Estado Venta
            </TableCell>
            <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
              Método de Pago
            </TableCell>
            <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
              Ganancia
            </TableCell>
            <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
              Comisión
            </TableCell>
            <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
              Acciones
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
          {products.map((product) => (
            <ProductTableRow
              key={product.id}
              product={product}
              paymentMethods={paymentMethods}
              popoverProductId={popoverProductId}
              setPopoverProductId={setPopoverProductId}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>

      <PaginationFooter
        page={page}
        pageSize={pageSize}
        filteredCount={filteredCount}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
};

export default ProductTable;