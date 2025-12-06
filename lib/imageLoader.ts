import type { Design, FilterState } from "./types";
import { applyFilters } from "./filterEngine";

const UNSPLASH_URL = "https://api.unsplash.com/search/photos";
const PEXELS_URL = "https://api.pexels.com/v1/search";

const normalize = (value: string) => value.trim().toLowerCase();

const isInteriorImage = (description?: string | null, tags: string[] = []) => {
  const text = `${description || ""} ${tags.join(" ")}`.toLowerCase();
  const good = ["interior", "living room", "kitchen", "bedroom", "home decor"];
  const bad = ["car", "street", "animal", "fashion", "food", "landscape"];

  if (bad.some((word) => text.includes(word))) return false;
  return good.some((word) => text.includes(word));
};

export function optimizeUrl(url: string): string {
  if (!url) return url;
  const base = url.split("?")[0];
  return `${base}?auto=format&fit=crop&w=1200&q=70`;
}

const buildQuery = (filters: FilterState) => {
  const parts = [
    filters.style,
    filters.room?.replace("_", " "),
    "interior",
    filters.material,
    filters.palette,
  ]
    .filter(Boolean)
    .join(" ");
  return parts || "interior design";
};

const deriveDesign = (base: Partial<Design>, fallback: FilterState): Design => {
  const pick = <K extends keyof FilterState>(
    key: K,
    defaults: Design[keyof Design]
  ) => {
    const value = fallback[key];
    return (value as Design[keyof Design]) || defaults;
  };

  return {
    id: base.id || crypto.randomUUID(),
    title: base.title || "Curated Interior",
    src: base.src || "",
    style: base.style || (pick("style", "modern") as Design["style"]),
    room: base.room || (pick("room", "living_room") as Design["room"]),
    palette: base.palette || (pick("palette", "neutral") as Design["palette"]),
    budget: base.budget || (pick("budget", "medium") as Design["budget"]),
    lighting:
      base.lighting || (pick("lighting", "mixed") as Design["lighting"]),
    furnitureDensity:
      base.furnitureDensity ||
      (pick("furnitureDensity", "normal") as Design["furnitureDensity"]),
    material: base.material || (pick("material", "mixed") as Design["material"]),
    theme: base.theme || (pick("theme", "modern") as Design["theme"]),
    composition:
      base.composition ||
      (pick("composition", "centered") as Design["composition"]),
    dominantColor:
      base.dominantColor ||
      (pick("dominantColor", "beige") as Design["dominantColor"]),
    windowPresence:
      base.windowPresence ||
      (pick("windowPresence", "yes") as Design["windowPresence"]),
    plantPresence:
      base.plantPresence ||
      (pick("plantPresence", "no") as Design["plantPresence"]),
    flooring: base.flooring || (pick("flooring", "wood") as Design["flooring"]),
    artPresence:
      base.artPresence ||
      (pick("artPresence", "yes") as Design["artPresence"]),
    aspectRatio:
      base.aspectRatio ||
      (pick("aspectRatio", "landscape") as Design["aspectRatio"]),
    orientation:
      base.orientation ||
      (pick("orientation", "horizontal") as Design["orientation"]),
    qualityScore: base.qualityScore ?? 80,
    description: base.description || "",
  };
};

export const dedupe = (arr: Design[], existing: Design[] = []) => {
  const seen = new Set(
    existing.map((d) => `${normalize(d.id)}|${normalize(d.src)}`)
  );
  const result: Design[] = [];
  arr.forEach((item) => {
    const key = `${normalize(item.id)}|${normalize(item.src)}`;
    if (seen.has(key)) return;
    seen.add(key);
    result.push(item);
  });
  return result;
};

export async function fetchUnsplashBatch(
  filters: FilterState,
  page: number,
  perPage: number
): Promise<Design[]> {
  const key =
    process.env.UNSPLASH_ACCESS_KEY || process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  if (!key) return [];

  const query = buildQuery(filters);
  const url = `${UNSPLASH_URL}?query=${encodeURIComponent(
    query
  )}&page=${page}&per_page=${perPage}`;

  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${key}` },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Unsplash ${res.status}`);

  const data = await res.json();
  const results = Array.isArray(data.results) ? data.results : [];

  const mapped: Design[] = results
    .map((item: any) => {
      const tags =
        item.tags?.map((t: any) => t.title || t.description || "").filter(Boolean) ||
        [];
      const desc = item.description || item.alt_description || "";
      if (!isInteriorImage(desc, tags)) return null;
      const design = deriveDesign(
        {
          id: `unsplash-${item.id}`,
          src: optimizeUrl(item.urls?.regular || item.urls?.full || ""),
          title: desc || "Unsplash Interior",
          orientation:
            item.width && item.height && item.width >= item.height
              ? "horizontal"
              : "vertical",
          description: desc,
        },
        filters
      );
      return design;
    })
    .filter(Boolean) as Design[];

  return applyFilters(mapped, filters);
}

export async function fetchPexelsBatch(
  filters: FilterState,
  page: number,
  perPage: number
): Promise<Design[]> {
  const key = process.env.PEXELS_API_KEY;
  if (!key) return [];

  const query = buildQuery(filters);
  const url = `${PEXELS_URL}?query=${encodeURIComponent(
    query
  )}&page=${page}&per_page=${perPage}`;

  const res = await fetch(url, {
    headers: { Authorization: key },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Pexels ${res.status}`);

  const data = await res.json();
  const photos = Array.isArray(data.photos) ? data.photos : [];

  const mapped: Design[] = photos
    .map((item: any) => {
      const desc = item.alt || "";
      if (!isInteriorImage(desc, [])) return null;
      const design = deriveDesign(
        {
          id: `pexels-${item.id}`,
          src: optimizeUrl(
            item.src?.large2x || item.src?.large || item.src?.medium || ""
          ),
          title: desc || "Pexels Interior",
          orientation:
            item.width && item.height && item.width >= item.height
              ? "horizontal"
              : "vertical",
          description: desc,
        },
        filters
      );
      return design;
    })
    .filter(Boolean) as Design[];

  return applyFilters(mapped, filters);
}

export { isInteriorImage };
