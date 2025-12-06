"use client";

import { useFilters } from "@/app/context/FilterContext";

const styles = [
  "modern",
  "classic",
  "scandinavian",
  "minimal",
  "loft",
  "boho",
  "industrial",
  "retro",
  "japandi",
];

const rooms = [
  "living_room",
  "kitchen",
  "bedroom",
  "bathroom",
  "office",
  "hallway",
  "balcony",
];

const palettes = ["cool", "warm", "neutral", "monochrome"];
const budgets = ["low", "medium", "premium"];
const lightings = ["bright", "dim", "mixed"];
const materials = ["wood", "metal", "fabric", "stone", "concrete", "mixed"];
const orientations = ["horizontal", "vertical"];

export default function FiltersBar() {
  const { filters, setFilter, resetFilters } = useFilters();

  const renderSelect = (
    label: string,
    value: string | null,
    options: string[],
    key: keyof typeof filters
  ) => (
    <select
      className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm"
      value={value ?? ""}
      onChange={(e) =>
        setFilter(key, (e.target.value as any) || null)
      }
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

      <input
        type="number"
        min={0}
        max={100}
        placeholder="Quality ≥"
        className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm w-24"
        value={filters.qualityMin ?? ""}
        onChange={(e) =>
          setFilter(
            "qualityMin",
            e.target.value ? Number(e.target.value) : null
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
