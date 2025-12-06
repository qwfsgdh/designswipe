"use client";

import { useFilters } from "@/app/context/FilterContext";

const styles = [
  "minimal",
  "modern",
  "scandinavian",
  "japandi",
  "boho",
  "loft",
  "industrial",
  "classic",
  "luxury",
];

const rooms = [
  "living_room",
  "bedroom",
  "kitchen",
  "bathroom",
  "office",
  "studio",
  "balcony",
  "dining_room",
  "hallway",
];

const palettes = ["warm", "cool", "neutral", "bright", "pastel"];
const budgets = ["low", "medium", "high"];
const lightings = ["soft", "daylight", "ambient", "dramatic"];
const materials = ["wood", "stone", "metal", "textile", "mixed"];
const orientations = ["horizontal", "vertical"];
const themes = ["cozy", "elegant", "rustic", "artistic", "industrial"];

export default function FiltersBar() {
  const { filters, setFilter, resetFilters } = useFilters();

  const renderSelect = (
    label: string,
    value: string | undefined,
    options: string[],
    key: keyof typeof filters
  ) => (
    <select
      className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm"
      value={value ?? ""}
      onChange={(e) => setFilter(key, (e.target.value as any) || undefined)}
    >
      <option value="">{label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {renderSelect("Style", filters.style, styles, "style")}
      {renderSelect("Room", filters.room, rooms, "room")}
      {renderSelect("Palette", filters.palette, palettes, "palette")}
      {renderSelect("Budget", filters.budget, budgets, "budget")}
      {renderSelect("Lighting", filters.lighting, lightings, "lighting")}
      {renderSelect("Material", filters.material, materials, "material")}
      {renderSelect("Orientation", filters.orientation, orientations, "orientation")}
      {renderSelect("Theme", filters.theme, themes, "theme")}

      <input
        type="number"
        min={1}
        max={10}
        placeholder="Quality ≥"
        className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm w-24"
        value={filters.qualityMin ?? ""}
        onChange={(e) =>
          setFilter(
            "qualityMin",
            e.target.value ? Number(e.target.value) : undefined
          )
        }
      />

      <button
        onClick={resetFilters}
        className="text-xs px-3 py-2 rounded-xl border border-slate-600 text-slate-200"
      >
        Reset
      </button>
    </div>
  );
}
