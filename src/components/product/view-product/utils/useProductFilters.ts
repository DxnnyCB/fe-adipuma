// Archivo movido a ../utils/useProductFilters.ts
// Elimina este archivo si ya no es necesario.

import { useState } from "react";

export interface ProductFiltersState {
  selectedMetodoPago: string | null;
  setSelectedMetodoPago: (v: string | null) => void;
  selectedEstadoVenta: string | null;
  setSelectedEstadoVenta: (v: string | null) => void;
  selectedEstadoCompra: string | null;
  setSelectedEstadoCompra: (v: string | null) => void;
  selectedYear: number | null;
  setSelectedYear: (v: number | null) => void;
  selectedMonth: number | null;
  setSelectedMonth: (v: number | null) => void;
  selectedYearSale: number | null;
  setSelectedYearSale: (v: number | null) => void;
  selectedMonthSale: number | null;
  setSelectedMonthSale: (v: number | null) => void;
  search: string;
  setSearch: (v: string) => void;
  clearCompra: () => void;
  clearVenta: () => void;
}

export function useProductFilters(): ProductFiltersState {
  const [selectedMetodoPago, setSelectedMetodoPago] = useState<string | null>(null);
  const [selectedEstadoVenta, setSelectedEstadoVenta] = useState<string | null>(null);
  const [selectedEstadoCompra, setSelectedEstadoCompra] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYearSale, setSelectedYearSale] = useState<number | null>(null);
  const [selectedMonthSale, setSelectedMonthSale] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const clearCompra = () => {
    setSelectedYear(null);
    setSelectedMonth(null);
  };
  const clearVenta = () => {
    setSelectedYearSale(null);
    setSelectedMonthSale(null);
  };

  return {
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
  };
}
