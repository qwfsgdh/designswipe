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
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold mb-2">Favorites</h1>
      {favorites.map((image) => (
        <DesignCard
          key={image.id}
          image={image}
          isFavorite
          onToggleFavorite={() => toggleFavorite(image.id)}
          onNext={() => {}}
          priority={false}
        />
      ))}
    </div>
  );
}
