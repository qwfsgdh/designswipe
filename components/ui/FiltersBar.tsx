"use client";

import { useFilters } from "@/app/context/FilterContext";

const styles = [
  { value: "scandinavian", label: "Scandinavian" },
  { value: "loft", label: "Loft" },
  { value: "minimal", label: "Minimal" },
];

const roomTypes = [
  { value: "living_room", label: "Living Room" },
  { value: "bedroom", label: "Bedroom" },
  { value: "kitchen", label: "Kitchen" },
];

const palettes = [
  { value: "warm", label: "Warm" },
  { value: "cool", label: "Cool" },
];

const budgets = [
  { value: "low", label: "$" },
  { value: "medium", label: "$$" },
  { value: "high", label: "$$$" },
];

export default function FiltersBar() {
  const { filters, setFilter, resetFilters } = useFilters();

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <select
        className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm"
        value={filters.style ?? ""}
        onChange={(e) => setFilter("style", e.target.value || null)}
      >
        <option value="">Style</option>
        {styles.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      <select
        className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm"
        value={filters.roomType ?? ""}
        onChange={(e) => setFilter("roomType", e.target.value || null)}
      >
        <option value="">Room</option>
        {roomTypes.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      <select
        className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm"
        value={filters.colorPalette ?? ""}
        onChange={(e) => setFilter("colorPalette", e.target.value || null)}
      >
        <option value="">Palette</option>
        {palettes.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      <select
        className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm"
        value={filters.budget ?? ""}
        onChange={(e) => setFilter("budget", e.target.value || null)}
      >
        <option value="">Budget</option>
        {budgets.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      <button
        onClick={resetFilters}
        className="text-xs px-3 py-2 rounded-xl border border-slate-600 text-slate-200"
      >
        Reset
      </button>
    </div>
  );
}
