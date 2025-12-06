"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Design } from "@/lib/types";
import { mockDesigns } from "@/lib/mockDesigns";

type AppContextValue = {
  images: Design[];
  favorites: Design[];
  toggleFavorite: (id: string) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<Design[]>([]);
  const [favorites, setFavorites] = useState<Design[]>([]);

  useEffect(() => {
    setImages(mockDesigns);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem("designswipe:favorites");
      if (raw) {
        setFavorites(JSON.parse(raw));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem("designswipe:favorites", JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const exists = prev.find(item => item.id === id);
      if (exists) {
        return prev.filter(item => item.id !== id);
      }
      const found = images.find(img => img.id === id);
      if (!found) return prev;
      return [...prev, found];
    });
  };

  return (
    <AppContext.Provider value={{ images, favorites, toggleFavorite }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return ctx;
}
