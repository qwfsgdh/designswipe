import type { Design, FilterState } from "./types";

export function applyFilters(designs: Design[], filters: FilterState): Design[] {
  const {
    style,
    room,
    palette,
    budget,
    lighting,
    material,
    orientation,
    theme,
    qualityMin,
  } = filters;

  let result = designs.filter((d) => {
    if (style && d.style !== style) return false;
    if (room && d.room !== room) return false;
    if (palette && d.palette !== palette) return false;
    if (budget && d.budget !== budget) return false;
    if (lighting && d.lighting !== lighting) return false;
    if (material && d.material !== material) return false;
    if (orientation && d.orientation !== orientation) return false;
    if (theme && d.theme !== theme) return false;
    if (typeof qualityMin === "number" && d.qualityScore < qualityMin) {
      return false;
    }
    return true;
  });

  if (result.length < 24) {
    const sorted = [...designs].sort((a, b) => b.qualityScore - a.qualityScore);

    result = sorted.filter((d) => {
      if (style && d.style !== style) return false;
      if (room && d.room !== room) return false;
      if (typeof qualityMin === "number" && d.qualityScore < qualityMin) return false;
      return true;
    });

    if (result.length < 24) {
      result = sorted.slice(0, 24);
    }
  }

  return result;
}
