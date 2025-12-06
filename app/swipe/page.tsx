"use client";

import { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import { useFilters } from "../context/FilterContext";
import FiltersBar from "@/components/ui/FiltersBar";
import DesignCard from "@/components/ui/DesignCard";

export default function SwipePage() {
  const { images, favorites, toggleFavorite } = useApp();
  const { filters } = useFilters();
  const [index, setIndex] = useState(0);

  const filtered = useMemo(() => {
    return images.filter((img) => {
      if (filters.style && img.style !== filters.style) return false;
      if (filters.roomType && img.roomType !== filters.roomType) return false;
      if (filters.colorPalette && img.colorPalette !== filters.colorPalette)
        return false;
      if (filters.budget && img.budget !== filters.budget) return false;
      return true;
    });
  }, [images, filters]);

  const current = filtered[index] ?? null;

  const onNext = () => {
    setIndex((prev) => {
      const next = prev + 1;
      if (next >= filtered.length) return 0;
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <FiltersBar />

      {!current && (
        <div className="text-center text-slate-400 mt-20">
          Нет подходящих интерьеров под текущие фильтры.
        </div>
      )}

      {current && (
        <DesignCard
          image={current}
          isFavorite={favorites.some((f) => f.id === current.id)}
          onToggleFavorite={() => toggleFavorite(current.id)}
          onNext={onNext}
        />
      )}
    </div>
  );
}
