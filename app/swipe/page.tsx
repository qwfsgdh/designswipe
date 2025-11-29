"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, SlidersHorizontal } from "lucide-react";
import { DesignCard } from "@/components/ui/DesignCard";
import { useFilters } from "@/app/context/FilterContext";
import { useApp } from "@/app/context/AppContext";
import { designLibrary, Design } from "@/lib/designLibrary";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/ui/BottomNav";

export default function SwipePage() {
  const { filters } = useFilters();
  const { registerSwipe, getPreferenceScore } = useApp();
  const router = useRouter();

  const [cards, setCards] = useState<Design[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);

  const filteredLibrary = useMemo(() => {
    const matches = (design: Design) => {
      const matchesStyles =
        !filters.styles.length ||
        filters.styles.some((s) => design.style.includes(s));
      const matchesRooms =
        !filters.roomTypes.length || filters.roomTypes.includes(design.roomType);
      const matchesColors =
        !filters.colors.length ||
        filters.colors.some((c) => design.colors.includes(c));
      const matchesMaterials =
        !filters.materials.length ||
        filters.materials.some((m) => design.materials.includes(m));
      const matchesProperty =
        !filters.propertyType.length ||
        filters.propertyType.includes(design.propertyType);
      const matchesBudget = !filters.budget || design.budget === filters.budget;

      return (
        matchesStyles &&
        matchesRooms &&
        matchesColors &&
        matchesMaterials &&
        matchesProperty &&
        matchesBudget
      );
    };

    return designLibrary.filter(matches);
  }, [filters]);

  const hasFilters =
    filters.styles.length ||
    filters.roomTypes.length ||
    filters.colors.length ||
    filters.materials.length ||
    filters.propertyType.length ||
    !!filters.budget;

  const sortedLibrary = useMemo(() => {
    const base =
      filteredLibrary.length || !hasFilters ? filteredLibrary || designLibrary : [];
    return [...base]
      .map((design) => ({
        design,
        score: getPreferenceScore(design),
      }))
      .sort((a, b) => b.score - a.score);
  }, [filteredLibrary, getPreferenceScore]);

  useEffect(() => {
    setLoading(true);

    const pool = sortedLibrary.map((item) => item.design);
    const shuffled =
      pool.length > 0
        ? pool
        : hasFilters
          ? []
          : designLibrary;

    setCards(shuffled);
    setCurrentIndex(0);
    setNoResults(Boolean(hasFilters && !shuffled.length));
    setLoading(false);
  }, [filters, hasFilters, sortedLibrary]);

  const handleSwipe = (dir: "left" | "right") => {
    const card = cards[currentIndex];

    if (dir === "right" && card) {
      registerSwipe(card, "right");
    } else if (card) {
      registerSwipe(card, "left");
    }

    setTimeout(() => setCurrentIndex((prev) => prev + 1), 250);
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
          onClick={() => router.push("/filters")}
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
