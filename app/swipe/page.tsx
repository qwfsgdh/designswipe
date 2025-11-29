"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, SlidersHorizontal } from "lucide-react";
import { DesignCard } from "@/components/ui/DesignCard";
import { useFilters } from "@/app/context/FilterContext";
import { useApp } from "@/app/context/AppContext";
import BottomNav from "@/components/ui/BottomNav";

interface Design {
  id: string;
  image: string;
  roomType: string;
  style: string[];
  colors: string[];
  materials: string[];
  propertyType: string;
  budget: string;
}

// Простая библиотека карточек, чтобы фильтры гарантированно работали без внешнего API.
const DESIGN_LIBRARY: Design[] = [
  {
    id: "modern-living",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
    roomType: "Living Room",
    style: ["Modern", "Minimalist"],
    colors: ["Neutral", "Light"],
    materials: ["Wood", "Glass"],
    propertyType: "Apartment",
    budget: "$15k - $30k",
  },
  {
    id: "scandi-bedroom",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    roomType: "Bedroom",
    style: ["Scandinavian", "Cozy"],
    colors: ["Neutral", "Warm"],
    materials: ["Wood", "Textile"],
    propertyType: "Apartment",
    budget: "$5k - $15k",
  },
  {
    id: "industrial-loft",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80",
    roomType: "Loft",
    style: ["Industrial"],
    colors: ["Dark", "Cool"],
    materials: ["Brick", "Metal", "Concrete"],
    propertyType: "Loft",
    budget: "$30k - $50k",
  },
  {
    id: "luxury-dining",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    roomType: "Dining Room",
    style: ["Luxury", "Contemporary"],
    colors: ["Dark", "Gold"],
    materials: ["Marble", "Metal"],
    propertyType: "House",
    budget: "$50k+",
  },
  {
    id: "kitchen-bright",
    image:
      "https://images.unsplash.com/photo-1505692069463-5e3405e3e7ee?auto=format&fit=crop&w=900&q=80",
    roomType: "Kitchen",
    style: ["Modern", "Minimalist"],
    colors: ["Light", "Neutral"],
    materials: ["Wood", "Concrete"],
    propertyType: "Apartment",
    budget: "$15k - $30k",
  },
  {
    id: "office-warm",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
    roomType: "Home Office",
    style: ["Contemporary", "Cozy"],
    colors: ["Warm", "Neutral"],
    materials: ["Wood", "Textile"],
    propertyType: "Apartment",
    budget: "$5k - $15k",
  },
  {
    id: "bathroom-spa",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
    roomType: "Bathroom",
    style: ["Minimalist"],
    colors: ["Light", "Neutral"],
    materials: ["Stone", "Glass"],
    propertyType: "Apartment",
    budget: "$15k - $30k",
  },
  {
    id: "cozy-nook",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80",
    roomType: "Reading Nook",
    style: ["Cozy", "Scandinavian"],
    colors: ["Warm", "Neutral"],
    materials: ["Wood", "Textile"],
    propertyType: "House",
    budget: "< $5k",
  },
  {
    id: "classic-bedroom",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
    roomType: "Bedroom",
    style: ["Classic", "Luxury"],
    colors: ["Dark", "Warm"],
    materials: ["Wood", "Velvet"],
    propertyType: "House",
    budget: "$30k - $50k",
  },
  {
    id: "colorful-living",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80",
    roomType: "Living Room",
    style: ["Contemporary", "Colorful"],
    colors: ["Colorful"],
    materials: ["Textile", "Wood"],
    propertyType: "Apartment",
    budget: "$5k - $15k",
  },
];

export default function SwipePage() {
  const { filters } = useFilters();
  const { addFavorite } = useApp();

  const [cards, setCards] = useState<Design[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);

  const filteredLibrary = useMemo(() => {
    return DESIGN_LIBRARY.filter((design) => {
      const matchesStyles =
        !filters.styles.length ||
        filters.styles.some((s) => design.style.includes(s));
      const matchesRooms =
        !filters.roomTypes.length ||
        filters.roomTypes.includes(design.roomType);
      const matchesColors =
        !filters.colors.length ||
        filters.colors.some((c) => design.colors.includes(c));
      const matchesMaterials =
        !filters.materials.length ||
        filters.materials.some((m) => design.materials.includes(m));
      const matchesProperty =
        !filters.propertyType.length ||
        filters.propertyType.includes(design.propertyType);
      const matchesBudget =
        !filters.budget || design.budget === filters.budget;

      return (
        matchesStyles &&
        matchesRooms &&
        matchesColors &&
        matchesMaterials &&
        matchesProperty &&
        matchesBudget
      );
    });
  }, [filters]);

  useEffect(() => {
    // Имитация загрузки + фильтрация локальных карточек
    setLoading(true);

    const pool = filteredLibrary.length ? filteredLibrary : DESIGN_LIBRARY;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setCurrentIndex(0);
    setNoResults(!shuffled.length);
    setLoading(false);
  }, [filters]);

  const handleSwipe = (dir: "left" | "right") => {
    const card = cards[currentIndex];

    if (dir === "right" && card) {
      // ✅ Любимый дизайн → в контекст
      addFavorite(card);
    }

    setTimeout(
      () => setCurrentIndex(prev => prev + 1),
      250
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0F2C] text-gray-300">
        Loading designs…
      </div>
    );
  }

  if (noResults) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0F2C] text-gray-300">
        <p className="mb-4 text-center">
          No designs found for these filters.
        </p>
        <button
          onClick={() => (window.location.href = "/filters")}
          className="px-6 py-3 bg-gradient-to-r from-[#00D9FF] to-[#00B8DB] rounded-[20px] text-[#0A0F2C] font-semibold"
        >
          Change Filters
        </button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const nextCard = cards[currentIndex + 1];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pb-32 pt-8 bg-[#0A0F2C] text-white">
      {/* Header */}
      <div className="w-full max-w-md mb-8 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-semibold"
        >
          DesignSwipe AI
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass-light px-4 py-2 rounded-[20px] flex items-center gap-2 hover:bg-white/10 transition-all"
          onClick={() => (window.location.href = "/filters")}
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span>Filters</span>
        </motion.button>
      </div>

      {/* Card stack */}
      <div className="relative w-full max-w-md h-[600px] mb-8">
        {currentIndex >= cards.length ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="glass-light p-12 rounded-[24px] text-center">
              <h3 className="mb-4 text-xl font-semibold">No more designs!</h3>
              <p className="text-gray-400 mb-6">
                You’ve seen all designs. Try new filters.
              </p>
              <button
                onClick={() => setCurrentIndex(0)}
                className="px-8 py-3 bg-gradient-to-r from-[#00D9FF] to-[#00B8DB] rounded-[20px] text-[#0A0F2C] font-semibold"
              >
                Start Over
              </button>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            {nextCard && (
              <div className="absolute inset-0 flex items-center justify-center">
                <DesignCard
                  key={`next-${nextCard.id}`}
                  design={nextCard}
                  onSwipe={() => {}}
                  style={{ scale: 0.95, opacity: 0.5 }}
                />
              </div>
            )}

            {currentCard && (
              <motion.div
                key={`current-${currentCard.id}`}
                className="absolute inset-0 flex items-center justify-center"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                whileDrag={{ scale: 1.05 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 100) handleSwipe("right");
                  if (info.offset.x < -100) handleSwipe("left");
                }}
              >
                <DesignCard design={currentCard} onSwipe={handleSwipe} />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Like / Dislike buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-6"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/50 transition-all"
          onClick={() => handleSwipe("left")}
        >
          <X className="w-8 h-8 text-red-400" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-20 h-20 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#00B8DB] flex items-center justify-center shadow-[0_0_30px_rgba(0,217,255,0.3)] hover:shadow-[0_0_50px_rgba(0,217,255,0.5)] transition-all"
          onClick={() => handleSwipe("right")}
        >
          <Heart className="w-10 h-10 text-[#0A0F2C] fill-[#0A0F2C]" />
        </motion.button>
      </motion.div>

      <BottomNav />
    </div>
  );
}
