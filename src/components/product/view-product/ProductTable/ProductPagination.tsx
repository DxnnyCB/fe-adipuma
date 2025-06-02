import React from "react";

interface ProductPaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const ProductPagination: React.FC<ProductPaginationProps> = ({
  page,
  totalPages,
  setPage,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-2 h-8">
      <button
        onClick={() => setPage(Math.max(page - 1, 1))}
        disabled={page === 1}
        className={`h-8 w-8 flex items-center justify-center rounded transition
          ${page === 1
            ? "bg-transparent border border-gray-500 text-gray-500 cursor-not-allowed"
            : "bg-transparent border border-gray-500 text-gray-700 dark:text-gray-200 hover:bg-indigo-500 hover:text-white"
          }`}
        aria-label="Anterior"
        style={{ alignSelf: "center" }}
      >
        <span className="flex items-center justify-center h-full">&#8592;</span>
      </button>
      {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
        <button
          key={num}
          onClick={() => setPage(num)}
          className={`h-8 w-8 flex items-center justify-center rounded transition
            ${page === num
              ? "bg-indigo-600 text-white"
              : "bg-transparent border border-gray-500 text-gray-700 dark:text-gray-200 hover:bg-indigo-500 hover:text-white"
            }`}
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => setPage(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className={`h-8 w-8 flex items-center justify-center rounded transition
          ${page === totalPages
            ? "bg-transparent border border-gray-500 text-gray-500 cursor-not-allowed"
            : "bg-transparent border border-gray-500 text-gray-700 dark:text-gray-200 hover:bg-indigo-500 hover:text-white"
          }`}
        aria-label="Siguiente"
        style={{ alignSelf: "center" }}
      >
        <span className="flex items-center justify-center h-full">&#8594;</span>
      </button>
    </div>
  );
};

export default ProductPagination;