import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/GET/GetAllProducts";
import { Product } from "../../interfaces/Product.interface";
import ProductFilters from "./ProductFilters";
import ProductTable from "./ProductTable";
import PageSizeSelector from "./PageSizeSelector";
import { FilteredProducts } from "../utils/FilteredProducts";

export default function ViewProduct() {
  const [popoverProductId, setPopoverProductId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Filtros adicionales
  const [selectedMetodoPago, setSelectedMetodoPago] = useState<string | null>(null);
  const [selectedEstadoVenta, setSelectedEstadoVenta] = useState<string | null>(null);
  const [selectedEstadoCompra, setSelectedEstadoCompra] = useState<string | null>(null);

  // Año y Mes state and options
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYearSale, setSelectedYearSale] = useState<number | null>(null);
  const [selectedMonthSale, setSelectedMonthSale] = useState<number | null>(null);

  // Example: generate years from 2020 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2019 }, (_, i) => 2020 + i);
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const paymentMethods = [
    "Efectivo",
    "Nequi",
    "Nequi y Efectivo"
  ];

  const pageSizeOptions = [1, 5, 10, 20];

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data as Product[]))
      .catch((error) => console.error(error));
  }, []);

  // Filtrado y paginado
  const filteredProducts = FilteredProducts(
    products,
    selectedYear,
    selectedMonth,
    search,
    selectedYearSale,
    selectedMonthSale,
    selectedMetodoPago,
    selectedEstadoVenta,
    selectedEstadoCompra
  );

  const clearCompraFilters = () => {
    setSelectedYear(null);
    setSelectedMonth(null);
    setPage(1);
  };
  const clearVentaFilters = () => {
    setSelectedYearSale(null);
    setSelectedMonthSale(null);
    setPage(1);
  };

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  // Funciones para editar y eliminar
  const handleEdit = (id: string) => {
    // Implementa la lógica de edición aquí
    console.log("Edit product", id);
  };
  const handleDelete = (id: string) => {
    // Implementa la lógica de eliminación aquí
    console.log("Delete product", id);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
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
        onClearCompra={clearCompraFilters}
        onClearVenta={clearVentaFilters}
        selectedMetodoPago={selectedMetodoPago}
        setSelectedMetodoPago={setSelectedMetodoPago}
        selectedEstadoVenta={selectedEstadoVenta}
        setSelectedEstadoVenta={setSelectedEstadoVenta}
        selectedEstadoCompra={selectedEstadoCompra}
        setSelectedEstadoCompra={setSelectedEstadoCompra}
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
          products={paginatedProducts}
          paymentMethods={paymentMethods}
          popoverProductId={popoverProductId}
          setPopoverProductId={setPopoverProductId}
          onEdit={handleEdit}
          onDelete={handleDelete}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          pageSize={pageSize}
          filteredCount={filteredProducts.length}
        />
      </div>
    </div>
  );
}