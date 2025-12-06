"use client";

import { useEffect, useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import { useFilters } from "../context/FilterContext";
import FiltersBar from "@/components/ui/FiltersBar";
import DesignCard from "@/components/ui/DesignCard";
import { mockDesigns } from "@/lib/mockDesigns";
import { applyFilters } from "@/lib/filterEngine";

export default function SwipePage() {
  const { favorites, toggleFavorite } = useApp();
  const { filters } = useFilters();
  const [index, setIndex] = useState(0);
  const [swipePool, setSwipePool] = useState(mockDesigns);

  useEffect(() => {
    const filtered = applyFilters(mockDesigns, filters);
    setSwipePool(filtered);
    setIndex(0);
  }, [filters]);

  const current = useMemo(
    () => (index < swipePool.length ? swipePool[index] : null),
    [swipePool, index]
  );

  const hasAny = swipePool.length > 0;
  const isEnd = index >= swipePool.length;

  return (
    <div className="flex flex-col gap-4 p-4">
      <FiltersBar />

      {!hasAny && (
        <div className="text-center text-slate-400 mt-20">
          Нет подходящих интерьеров под текущие фильтры
        </div>
      )}

      {hasAny && isEnd && (
        <div className="text-center text-slate-400 mt-20">
          Интерьеры закончились. Измени фильтры или начни сначала
        </div>
      )}

      {current && !isEnd && (
        <div className="flex flex-col gap-4">
          <DesignCard
            design={current}
            onNext={() => setIndex((prev) => prev + 1)}
            onPrev={index > 0 ? () => setIndex((prev) => Math.max(prev - 1, 0)) : undefined}
          />

          <div className="flex justify-center">
            <button
              onClick={() => toggleFavorite(current.id)}
              className="px-4 py-2 rounded-full border border-slate-600 text-sm"
            >
              {favorites.some((f) => f.id === current.id)
                ? "Убрать из избранного"
                : "В избранное"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
