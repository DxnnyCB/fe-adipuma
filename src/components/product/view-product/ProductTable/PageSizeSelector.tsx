import React from "react";

interface PageSizeSelectorProps {
  pageSize: number;
  setPageSize: (size: number) => void;
  pageSizeOptions: number[];
  setPage: (page: number) => void;
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  pageSize,
  setPageSize,
  pageSizeOptions,
  setPage,
}) => (
  <div className="flex-shrink-0 min-w-[140px]">
    <label htmlFor="page-size" className="sr-only">
      Tamaño de página
    </label>
    <select
      id="page-size"
      value={pageSize}
      onChange={e => {
        setPageSize(Number(e.target.value));
        setPage(1);
      }}
      className="border rounded px-2 py-1 bg-white dark:bg-slate-900 border-gray-300 dark:border-white/[0.05] text-gray-400 dark:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
      aria-label="Seleccionar cantidad de registros por página"
    >
      {pageSizeOptions.map((size: number) => (
        <option key={size} value={size}>
          {size} registros
        </option>
      ))}
    </select>
  </div>
);

export default PageSizeSelector;