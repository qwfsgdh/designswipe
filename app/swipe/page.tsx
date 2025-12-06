"use client";

import { useEffect, useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import { useFilters } from "../context/FilterContext";
import FiltersBar from "@/components/ui/FiltersBar";
import DesignCard from "@/components/ui/DesignCard";
import { mockDesigns } from "@/lib/mockDesigns";
import { applyFilters } from "@/lib/filterEngine";
import type { Design } from "@/lib/types";

export default function SwipePage() {
  const { images, favorites, toggleFavorite } = useApp();
  const { filters } = useFilters();
  const [index, setIndex] = useState(0);
  const [swipePool, setSwipePool] = useState<Design[]>([]);

  console.log("TOTAL DESIGNS =", mockDesigns.length);

  useEffect(() => {
    const base = images.length ? images : mockDesigns;
    const filtered = applyFilters(base, filters);
    setSwipePool(filtered);
    setIndex(0);
  }, [filters, images]);

  const current = useMemo(
    () => (index < swipePool.length ? swipePool[index] : null),
    [swipePool, index]
  );

  if (!swipePool.length) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <FiltersBar />
        <div className="text-neutral-400 text-center mt-20">
          Нет подходящих интерьеров под текущие фильтры
        </div>
      </div>
    );
  }

  if (index >= swipePool.length) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <FiltersBar />
        <div className="text-neutral-400 text-center mt-20">
          Больше интерьеров нет под текущие фильтры
        </div>
      </div>
    );
  }

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
