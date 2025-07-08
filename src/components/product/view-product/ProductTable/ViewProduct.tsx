import { useState, useMemo } from "react";
// import { PageableParams } from "../../services/GET/GetAllProducts";
import ProductFilters from "./ProductFilters";
import ProductTable from "./ProductTable";
import PageSizeSelector from "./PageSizeSelector";
import { deleteProduct } from "../../services/DELETE/DeleteProduct";
// import { Modal } from "../../../ui/modal";
import { useProductFilters } from "../utils/useProductFilters";
import { useProducts } from "../utils/useProducts";
import { toast } from "react-toastify";
import { toastStyles } from "../../../../styles/toastStyles";
import { DeleteProductModal } from "./modals/DeleteProductModal";
import EditProductModal from "./modals/EditProductModal";

export default function ViewProduct() {
  // Filtros y búsqueda
  const {
    selectedMetodoPago,
    setSelectedMetodoPago,
    selectedEstadoVenta,
    setSelectedEstadoVenta,
    selectedEstadoCompra,
    setSelectedEstadoCompra,
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    selectedYearSale,
    setSelectedYearSale,
    selectedMonthSale,
    setSelectedMonthSale,
    search,
    setSearch,
    clearCompra,
    clearVenta,
  } = useProductFilters();

  // Memoiza los filtros para evitar renders infinitos
  const filters = useMemo(
    () => ({
      selectedYear,
      selectedMonth,
      selectedYearSale,
      selectedMonthSale,
      selectedMetodoPago,
      selectedEstadoVenta,
      selectedEstadoCompra,
      search,
    }),
    [
      selectedYear,
      selectedMonth,
      selectedYearSale,
      selectedMonthSale,
      selectedMetodoPago,
      selectedEstadoVenta,
      selectedEstadoCompra,
      search,
    ]
  );

  // Otros estados
  const [popoverProductId, setPopoverProductId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch de productos y paginación
  const { products, totalElements, error, refetch } = useProducts({
    filters,
    page,
    pageSize,
  });

  // Constantes de UI
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2019 }, (_, i) => 2020 + i);
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const paymentMethods = ["Efectivo", "Nequi", "Nequi y Efectivo"];
  const pageSizeOptions = [1, 5, 10, 20];

  // (Eliminado: filters ya no es necesario aquí)

  const handleDelete = async (id: string) => {
    setDeleteId(id); // Muestra el popup
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await deleteProduct(deleteId);
      setDeleteId(null);
      setIsDeleting(false);
      toast.success("Prenda eliminada correctamente", {
        style: toastStyles.success,
      });
      refetch();
    } catch (error) {
      setIsDeleting(false);
      toast.error("Error eliminando prenda" + (error instanceof Error ? `: ${error.message}` : ""), {
        style: toastStyles.error,
      });
      console.error("Error eliminando prenda:", error);
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  // useProducts ya maneja el fetching y el efecto

  // Funciones para editar y eliminar
  const handleEdit = (id: string) => {
    setEditId(id);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setEditId(null);
    setIsEditing(false);
  };

  const productToEdit = products.find(p => String(p.id) === String(editId));

  const productToDelete = products.find(p => String(p.id) === String(deleteId));

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* Feedback de error global */}
      {error && (
        <div className="text-center text-red-500 py-2 text-sm">{error}</div>
      )}
      {/* Filtros de fechas y adicionales fuera de la tabla */}
      <ProductFilters
        years={years}
        months={months}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYearSale={selectedYearSale}
        setSelectedYearSale={setSelectedYearSale}
        selectedMonthSale={selectedMonthSale}
        setSelectedMonthSale={setSelectedMonthSale}
        search={search}
        setSearch={setSearch}
        onClearCompra={() => {
          clearCompra();
          setPage(1);
        }}
        onClearVenta={() => {
          clearVenta();
          setPage(1);
        }}
        selectedMetodoPago={selectedMetodoPago}
        setSelectedMetodoPago={setSelectedMetodoPago}
        selectedEstadoVenta={selectedEstadoVenta}
        setSelectedEstadoVenta={setSelectedEstadoVenta}
        selectedEstadoCompra={selectedEstadoCompra}
        setSelectedEstadoCompra={setSelectedEstadoCompra}
      />

      {/* Popup de confirmación extraído a componente */}
      <DeleteProductModal
        isOpen={!!deleteId}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        product={productToDelete}
      />

      {/* Modal de edición con pestañas */}
      <EditProductModal
        isOpen={isEditing}
        onClose={closeEditModal}
        product={productToEdit}
        onUpdated={() => {
          //closeEditModal();
          refetch();
        }}
      />

      {/* Barra superior: PageSizeSelector y Buscador */}
      <div className="flex items-center w-full gap-x-4 px-4 pt-4">
        <PageSizeSelector
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageSizeOptions={pageSizeOptions}
          setPage={setPage}
        />
      </div>
      {/* Tabla de productos */}
      <div className="max-w-full overflow-x-auto my-4">
        <ProductTable
          products={products}
          paymentMethods={paymentMethods}
          popoverProductId={popoverProductId}
          setPopoverProductId={setPopoverProductId}
          onEdit={handleEdit}
          onDelete={handleDelete}
          page={page}
          totalPages={Math.ceil(totalElements / pageSize)}
          setPage={setPage}
          pageSize={pageSize}
          filteredCount={totalElements}
        />
      </div>
    </div>
  );
}