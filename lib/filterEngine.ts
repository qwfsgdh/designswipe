import type { Design, FilterState } from "./types";

const normalize = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, "_");

const matches = (value: string | number, filterValue: string | null) => {
  if (!filterValue) return true;
  return normalize(String(value)) === normalize(filterValue);
};

export const applyFilters = (designs: Design[], filters: FilterState) => {
  return designs.filter((design) => {
    if (!matches(design.style, filters.style)) return false;
    if (!matches(design.room, filters.room)) return false;
    if (!matches(design.palette, filters.palette)) return false;
    if (!matches(design.budget, filters.budget)) return false;
    if (!matches(design.lighting, filters.lighting)) return false;
    if (!matches(design.furnitureDensity, filters.furnitureDensity)) return false;
    if (!matches(design.material, filters.material)) return false;
    if (!matches(design.theme, filters.theme)) return false;
    if (!matches(design.composition, filters.composition)) return false;
    if (!matches(design.dominantColor, filters.dominantColor)) return false;
    if (!matches(design.windowPresence, filters.windowPresence)) return false;
    if (!matches(design.plantPresence, filters.plantPresence)) return false;
    if (!matches(design.flooring, filters.flooring)) return false;
    if (!matches(design.artPresence, filters.artPresence)) return false;
    if (!matches(design.aspectRatio, filters.aspectRatio)) return false;
    if (!matches(design.orientation, filters.orientation)) return false;
    if (filters.qualityMin !== null && design.qualityScore < filters.qualityMin) {
      return false;
    }
    return true;
  });
};
