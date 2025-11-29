"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase: SupabaseClient | null =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Тип юзера (можно расширять при необходимости)
interface UserType {
  id: string;
  email: string | null;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

// Тип карточки дизайна (минимально нужный)
interface DesignCardType {
  id: string;
  image: string;
  roomType: string;
  style: string[];
  colors: string[];
  materials: string[];
  propertyType: string;
  budget: string;
}

interface AppContextType {
  user: UserType | null;
  loading: boolean;

  // фильтры
  filters: {
    styles: string[];
    colors: string[];
    materials: string[];
    propertyType: string[];
    roomTypes: string[];
    budget: string | null;
  };
  setFilters: (data: Partial<AppContextType["filters"]>) => void;
  resetFilters: () => void;

  preferences: PreferenceScores;
  registerSwipe: (card: DesignCardType, direction: "left" | "right") => void;
  getPreferenceScore: (card: DesignCardType) => number;

  // избранное
  favorites: DesignCardType[];
  addFavorite: (card: DesignCardType) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;

  // auth
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type PreferenceMap = Record<string, number>;
export type PreferenceScores = {
  styles: PreferenceMap;
  roomTypes: PreferenceMap;
  colors: PreferenceMap;
  materials: PreferenceMap;
  propertyType: PreferenceMap;
  budget: PreferenceMap;
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState<PreferenceScores>({
    styles: {},
    roomTypes: {},
    colors: {},
    materials: {},
    propertyType: {},
    budget: {},
  });

  // --------------------------
  // ⭐ Авторизация
  // --------------------------

  useEffect(() => {
    const getUser = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data } = await supabase.auth.getUser();
      setUser(data.user as UserType | null);
      setLoading(false);
    };

    getUser();

    if (!supabase) return;

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user as UserType | null);
      }
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    if (!supabase) {
      alert("Google login is not configured yet. Please set Supabase keys.");
      return;
    }
    const basePath =
      typeof window !== "undefined" &&
      window.location.pathname.startsWith("/designswipe")
        ? "/designswipe"
        : "";
    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}${basePath}/profile`
        : undefined;

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: redirectTo ? { redirectTo } : undefined,
    });
  };

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    window.location.href = "/";
  };

  // --------------------------
  // ⭐ Фильтры
  // --------------------------

  const [filters, setFiltersState] = useState<AppContextType["filters"]>({
    styles: [],
    colors: [],
    materials: [],
    propertyType: [],
    roomTypes: [],
    budget: null,
  });

  const setFilters = (update: Partial<AppContextType["filters"]>) => {
    setFiltersState(prev => ({ ...prev, ...update }));
  };

  const resetFilters = () => {
    setFiltersState({
      styles: [],
      colors: [],
      materials: [],
      propertyType: [],
      roomTypes: [],
      budget: null,
    });
  };

  // --------------------------
  // ⭐ Избранное
  // --------------------------

  const [favorites, setFavorites] = useState<DesignCardType[]>([]);

  const addFavorite = (card: DesignCardType) => {
    setFavorites(prev => {
      // не добавляем дубли
      if (prev.some(item => item.id === card.id)) return prev;
      return [...prev, card];
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const clearFavorites = () => setFavorites([]);

  const bump = (map: PreferenceMap, keys: string[], delta: number) => {
    const updated: PreferenceMap = { ...map };
    keys.forEach(key => {
      updated[key] = (updated[key] || 0) + delta;
    });
    return updated;
  };

  const registerSwipe = (card: DesignCardType, direction: "left" | "right") => {
    const delta = direction === "right" ? 1 : -0.5;

    setPreferences(prev => ({
      styles: bump(prev.styles, card.style, delta),
      roomTypes: bump(prev.roomTypes, [card.roomType], delta),
      colors: bump(prev.colors, card.colors, delta),
      materials: bump(prev.materials, card.materials, delta),
      propertyType: bump(prev.propertyType, [card.propertyType], delta),
      budget: bump(prev.budget, [card.budget], delta),
    }));

    if (direction === "right") {
      addFavorite(card);
    }
  };

  const getPreferenceScore = (card: DesignCardType) => {
    const sum = (map: PreferenceMap, keys: string[]) =>
      keys.reduce((acc, key) => acc + (map[key] || 0), 0);

    return (
      sum(preferences.styles, card.style) +
      sum(preferences.colors, card.colors) +
      sum(preferences.materials, card.materials) +
      sum(preferences.roomTypes, [card.roomType]) +
      sum(preferences.propertyType, [card.propertyType]) +
      sum(preferences.budget, [card.budget])
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loading,

        filters,
        setFilters,
        resetFilters,

        preferences,
        registerSwipe,
        getPreferenceScore,

        favorites,
        addFavorite,
        removeFavorite,
        clearFavorites,

        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
