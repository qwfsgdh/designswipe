"use client";

import { useEffect, useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import { useFilters } from "../context/FilterContext";
import FiltersBar from "@/components/ui/FiltersBar";
import DesignCard from "@/components/ui/DesignCard";
import { mockDesigns } from "@/lib/mockDesigns";

export default function SwipePage() {
  const { images, favorites, toggleFavorite } = useApp();
  const { filters } = useFilters();
  const [index, setIndex] = useState(0);

  console.log("TOTAL DESIGNS =", mockDesigns.length);

  const filtered = useMemo(() => {
    const base = images.length ? images : mockDesigns;
    return base.filter((img) => {
      if (filters.style && img.style !== filters.style) return false;
      if (filters.roomType && img.roomType !== filters.roomType) return false;
      if (filters.colorPalette && img.colorPalette !== filters.colorPalette)
        return false;
      if (filters.budget && img.budget !== filters.budget) return false;
      return true;
    });
  }, [images, filters]);

  useEffect(() => {
    setIndex(0);
  }, [filters]);

  if (!filtered.length) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <FiltersBar />
        <div className="text-neutral-400 text-center mt-20">
          Нет подходящих интерьеров под текущие фильтры
        </div>
      </div>
    );
  }

  if (index >= filtered.length) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <FiltersBar />
        <div className="text-neutral-400 text-center mt-20">
          Больше интерьеров нет под текущие фильтры
        </div>
      </div>
    );
  }

  const current = filtered[index] ?? null;

  const onNext = () => {
    setIndex((prev) => prev + 1);
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
          priority={index === 0}
        />
      )}
    </div>
  );
}
