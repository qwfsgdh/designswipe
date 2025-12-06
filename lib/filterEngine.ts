import { Design, FilterState } from "@/lib/types";

export function applyFilters(
  designs: Design[],
  filters: FilterState
): Design[] {
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

  // 1️⃣ STRICT MATCH
  let result = designs.filter((d) => {
    if (style && d.style !== style) return false;
    if (room && d.room !== room) return false;
    if (palette && d.palette !== palette) return false;
    if (budget && d.budget !== budget) return false;
    if (lighting && d.lighting !== lighting) return false;
    if (material && d.material !== material) return false;
    if (orientation && d.orientation !== orientation) return false;
    if (theme && d.theme !== theme) return false;
    if (qualityMin && d.qualityScore < qualityMin) return false;
    return true;
  });

  // 2️⃣ Fallback if too few (ideal interior UX)
  if (result.length < 20) {
    // candidates sorted by quality descending
    const sorted = [...designs].sort(
      (a, b) => b.qualityScore - a.qualityScore
    );

    // expand preference: same style or same room if user selected them
    const expanded = sorted.filter((d) => {
      if (style && d.style !== style) return false;
      if (room && d.room !== room) return false;
      if (qualityMin && d.qualityScore < qualityMin) return false;
      return true;
    });

    // If expanded still small — fallback is just best possible
    if (expanded.length >= 20) {
      result = expanded.slice(0, 40);
    } else {
      result = sorted.slice(0, 40);
    }
  }

  return result;
}
