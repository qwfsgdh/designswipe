"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { FilterState } from "@/lib/types";

type FilterContextValue = {
  filters: FilterState;
  setFilter: (key: keyof FilterState, value: FilterState[keyof FilterState]) => void;
  resetFilters: () => void;
};

const defaultFilters: FilterState = {
  style: null,
  room: null,
  palette: null,
  budget: null,
  lighting: null,
  furnitureDensity: null,
  material: null,
  theme: null,
  composition: null,
  dominantColor: null,
  windowPresence: null,
  plantPresence: null,
  flooring: null,
  artPresence: null,
  aspectRatio: null,
  orientation: null,
  qualityMin: null,
};

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const setFilter = (key: keyof FilterState, value: FilterState[keyof FilterState]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
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
