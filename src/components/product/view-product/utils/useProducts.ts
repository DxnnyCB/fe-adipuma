import { useCallback, useEffect, useRef, useState } from "react";

import { getAllProducts, PageableParams } from "../../services/GET/GetAllProducts";
import { Product } from "../../interfaces/Product.interface";

export interface ProductFilters {
  selectedYear: number | null;
  selectedMonth: number | null;
  selectedYearSale: number | null;
  selectedMonthSale: number | null;
  selectedMetodoPago: string | null;
  selectedEstadoVenta: string | null;
  selectedEstadoCompra: string | null;
  search: string;
}

export interface UseProductsParams {
  filters: ProductFilters;
  page: number;
  pageSize: number;
}

export function useProducts({ filters, page, pageSize }: UseProductsParams) {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    setError(null);
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const params: PageableParams & Record<string, unknown> = {
      page: page - 1,
      size: pageSize,
      yearCompra: filters.selectedYear ?? undefined,
      monthCompra: filters.selectedMonth ?? undefined,
      yearVenta: filters.selectedYearSale ?? undefined,
      monthVenta: filters.selectedMonthSale ?? undefined,
      metodoPago: filters.selectedMetodoPago ?? undefined,
      estadoVenta: filters.selectedEstadoVenta ?? undefined,
      estadoCompra: filters.selectedEstadoCompra ?? undefined,
      search: filters.search?.trim() !== "" ? filters.search : undefined,
    };
    getAllProducts(params, controller.signal)
      .then((data) => {
        // Puede venir como paginado o como array plano
        if (Array.isArray((data as ProductPage).content)) {
          const pageData = data as ProductPage;
          setProducts(pageData.content);
          setTotalElements(pageData.totalElements ?? pageData.content.length);
        } else if (Array.isArray(data)) {
          setProducts(data);
          setTotalElements(data.length);
        } else {
          setProducts([]);
          setTotalElements(0);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "CanceledError" && err.name !== "AbortError") {
          setProducts([]);
          setTotalElements(0);
          setError("Error al cargar productos");
        }
        setLoading(false);
      });
// Para tipar la respuesta paginada
interface ProductPage {
  content: Product[];
  totalElements: number;
}
    // cleanup
    return () => controller.abort();
  }, [filters, page, pageSize]);

  useEffect(() => {
    return fetchProducts();
  }, [fetchProducts]);

  return { products, totalElements, loading, error, refetch: fetchProducts };
}
