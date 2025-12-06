"use client";

import { useApp } from "../context/AppContext";
import DesignCard from "@/components/ui/DesignCard";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useApp();

  if (!favorites.length) {
    return (
      <div className="p-4 text-slate-400">
        У тебя пока нет избранных интерьеров. Добавь их на вкладке Swipe.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-semibold mb-2">Favorites</h1>
      {favorites.map((design) => (
        <div key={design.id} className="space-y-2">
          <DesignCard design={design} onNext={() => {}} />
          <div className="flex justify-center">
            <button
              className="px-4 py-2 rounded-full border border-slate-600 text-sm"
              onClick={() => toggleFavorite(design.id)}
            >
              Убрать из избранного
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
