import type { Design, FilterState } from "./types";
import { STYLE_KEYWORDS, fuzzyMatch } from "./styleKeywords";

const normalize = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, "_");

const matches = (value: string | number, filterValue: string | null) => {
  if (!filterValue) return true;
  return normalize(String(value)) === normalize(filterValue);
};

export const applyFilters = (designs: Design[], filters: FilterState) => {
  const filtered = designs.filter((design) => {
    const description = `${design.title} ${design.description || ""}`;

    if (filters.style) {
      const keywords = STYLE_KEYWORDS[filters.style] || [];
      if (!fuzzyMatch(description, keywords)) return false;
    }
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

  if (filtered.length < 8) {
    return designs
      .filter((design) => design.qualityScore >= (filters.qualityMin ?? 30))
      .slice(0, 20);
  }

  return filtered;
};
