"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type Filters = {
  style: string | null;
  roomType: string | null;
  colorPalette: string | null;
  budget: string | null;
};

type FilterContextValue = {
  filters: Filters;
  setFilter: (key: keyof Filters, value: string | null) => void;
  resetFilters: () => void;
};

const FilterContext = createContext<FilterContextValue | null>(null);

const defaultFilters: Filters = {
  style: null,
  roomType: null,
  colorPalette: null,
  budget: null,
};

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const setFilter = (key: keyof Filters, value: string | null) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(defaultFilters);

  return (
    <FilterContext.Provider value={{ filters, setFilter, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) {
    throw new Error("useFilters must be used inside FilterProvider");
  }
  return ctx;
}
