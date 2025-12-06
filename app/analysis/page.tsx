"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/app/context/AppContext";
import { designLibrary, Design } from "@/lib/designLibrary";
import { ExternalLink, ShoppingBag } from "lucide-react";

const findDesign = (id: string | null, fallback: Design[]) =>
  id ? fallback.find((d) => d.id === id) || fallback[0] : fallback[0];

export default function AnalysisPage() {
  const { favorites } = useApp();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const favoriteDesigns = useMemo(() => {
    if (!favorites.length) return [];
    return favorites
      .map((fav) => designLibrary.find((d) => d.id === fav.id) || null)
      .filter(Boolean) as Design[];
  }, [favorites]);

  useEffect(() => {
    if (selectedId) return;
    const designFromUrl =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("design")
        : null;
    setSelectedId(designFromUrl || favoriteDesigns[0]?.id || null);
  }, [favoriteDesigns, selectedId]);

  if (!favorites.length) {
    return (
      <div className="min-h-screen bg-[#0A0F2C] text-white flex items-center justify-center px-6">
        <div className="text-center space-y-3">
          <p className="text-lg">Нет выбранных дизайнов.</p>
          <p className="text-gray-400">
            Добавьте дизайн в избранное на странице свайпов, чтобы проанализировать его детали.
          </p>
        </div>
      </div>
    );
  }

  const selectedDesign = findDesign(selectedId, favoriteDesigns);

  return (
    <div className="min-h-screen bg-[#0A0F2C] text-white px-6 pt-10 pb-24">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Design Breakdown</h1>
          <p className="text-gray-400 text-sm">
            AI-компоновка деталей и ссылки на магазины
          </p>
        </div>
      </header>

      <div className="mb-6">
        <label className="block text-sm text-gray-300 mb-2">Выбери дизайн</label>
        <select
          value={selectedDesign?.id}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
        >
          {favoriteDesigns.map((d) => (
            <option key={d.id} value={d.id} className="bg-[#0A0F2C]">
              {d.title} — {d.roomType}
            </option>
          ))}
        </select>
      </div>

      {selectedDesign && (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-light p-4 rounded-[20px] flex flex-col gap-3"
          >
            <img
              src={selectedDesign.image}
              alt={selectedDesign.title}
              className="w-full rounded-[16px] object-cover"
              style={{ aspectRatio: "3 / 2" }}
            />
            <div>
              <h2 className="text-xl font-semibold">{selectedDesign.title}</h2>
              <p className="text-gray-400 text-sm">{selectedDesign.roomType}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedDesign.style.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-light p-4 rounded-[20px]"
          >
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#00D9FF]" />
              Где купить
            </h3>
            <div className="space-y-3">
              {selectedDesign.sources.map((source) => (
                <div
                  key={source.url}
                  className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{source.name}</p>
                    <p className="text-xs text-gray-400">{source.store}</p>
                  </div>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-[#00D9FF] hover:text-white"
                  >
                    Открыть <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
