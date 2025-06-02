import React from "react";

interface ProductFiltersProps {
  years: number[];
  months: string[];
  selectedYear: number | null;
  setSelectedYear: (year: number | null) => void;
  selectedMonth: number | null;
  setSelectedMonth: (month: number | null) => void;
  selectedYearSale: number | null;
  setSelectedYearSale: (year: number | null) => void;
  selectedMonthSale: number | null;
  setSelectedMonthSale: (month: number | null) => void;
  search: string;
  setSearch: (value: string) => void;
  onClearCompra: () => void;
  onClearVenta: () => void;
  selectedMetodoPago: string | null;
  setSelectedMetodoPago: (value: string | null) => void;
  selectedEstadoVenta: string | null;
  setSelectedEstadoVenta: (value: string | null) => void;
  selectedEstadoCompra: string | null;
  setSelectedEstadoCompra: (value: string | null) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  years,
  months,
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
  onClearCompra,
  onClearVenta,
}) => (
  <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-white/[0.05]">
    {/* Filtro por fecha compra */}
    <div className="flex flex-col items-start flex-1 min-w-[220px]">
      <label className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">
        Filtrar por fecha compra
      </label>
      <div className="flex gap-2 w-full">
        <select
          value={selectedYear || ""}
          onChange={e => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
          className="border rounded px-2 py-1 bg-white dark:bg-slate-900 border-gray-300 dark:border-white/[0.05] text-gray-400 dark:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-1/2"
        >
          <option value="">Año</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select
          value={selectedMonth || ""}
          onChange={e => setSelectedMonth(e.target.value ? Number(e.target.value) : null)}
          className="border rounded px-2 py-1 bg-white dark:bg-slate-900 border-gray-300 dark:border-white/[0.05] text-gray-400 dark:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-1/2"
        >
          <option value="">Mes</option>
          {months.map((month, idx) => (
            <option key={month} value={idx + 1}>{month}</option>
          ))}
        </select>
        <button
          onClick={onClearCompra}
          className="ml-1 p-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800"
          title="Limpiar filtros"
          type="button"
        >
          <svg
            className="w-5 h-5 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    {/* Filtro por fecha venta */}
    <div className="flex flex-col items-start flex-1 min-w-[220px]">
      <label className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">
        Filtrar por fecha venta
      </label>
      <div className="flex gap-2 w-full">
        <select
          value={selectedYearSale || ""}
          onChange={e => setSelectedYearSale(e.target.value ? Number(e.target.value) : null)}
          className="border rounded px-2 py-1 bg-white dark:bg-slate-900 border-gray-300 dark:border-white/[0.05] text-gray-400 dark:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-1/2"
        >
          <option value="">Año</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select
          value={selectedMonthSale || ""}
          onChange={e => setSelectedMonthSale(e.target.value ? Number(e.target.value) : null)}
          className="border rounded px-2 py-1 bg-white dark:bg-slate-900 border-gray-300 dark:border-white/[0.05] text-gray-400 dark:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-1/2"
        >
          <option value="">Mes</option>
          {months.map((month, idx) => (
            <option key={month} value={idx + 1}>{month}</option>
          ))}
        </select>
        <button
          onClick={onClearVenta}
          className="ml-1 p-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800"
          title="Limpiar filtros"
          type="button"
        >
          <svg
            className="w-5 h-5 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    {/* Buscador */}
    <div className="flex flex-col items-start flex-1 min-w-[220px]">
      <label className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">
        Buscar producto
      </label>
      <div className="relative w-full">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="h-11 w-full rounded-lg border border-gray-200 dark:border-white/[0.05] appearance-none pl-11 pr-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
        />
      </div>
    </div>
  </div>
);

export default ProductFilters;