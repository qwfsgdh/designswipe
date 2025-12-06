"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import { useFilters } from "../context/FilterContext";
import FiltersBar from "@/components/ui/FiltersBar";
import DesignCard from "@/components/ui/DesignCard";
import { mockDesigns } from "@/lib/mockDesigns";
import { applyFilters } from "@/lib/filterEngine";
import type { Design } from "@/lib/types";
import { dedupe, fetchPexelsBatch, fetchUnsplashBatch } from "@/lib/imageLoader";

export default function SwipePage() {
  const { images, favorites, toggleFavorite } = useApp();
  const { filters } = useFilters();
  const [index, setIndex] = useState(0);
  const [swipePool, setSwipePool] = useState<Design[]>([]);
  const [nextPage, setNextPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  console.log("TOTAL DESIGNS =", mockDesigns.length);

  useEffect(() => {
    const base = images.length ? images : mockDesigns;
    const filtered = applyFilters(base, filters);
    setSwipePool(filtered);
    setIndex(0);
    setNextPage(1);
  }, [filters, images]);

  const current = useMemo(
    () => (index < swipePool.length ? swipePool[index] : null),
    [swipePool, index]
  );

  const loadNextBatch = useCallback(async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const pageToLoad = nextPage;
    try {
      const [unsplash, pexels] = await Promise.all([
        fetchUnsplashBatch(filters, pageToLoad, 20),
        fetchPexelsBatch(filters, pageToLoad, 20),
      ]);
      const combined = dedupe([...unsplash, ...pexels], swipePool);
      const filteredNew = applyFilters(combined, filters);
      if (filteredNew.length) {
        setSwipePool((prev) => dedupe([...prev, ...filteredNew], prev));
      }
      setNextPage(pageToLoad + 1);
      setLoadingMore(false);
    } catch (_err) {
      setTimeout(() => {
        setLoadingMore(false);
        loadNextBatch();
      }, 1500);
    }
  }, [filters, nextPage, swipePool, loadingMore]);

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
    if (index >= swipePool.length - 10) {
      loadNextBatch();
    }
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
