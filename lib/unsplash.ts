import type { Design } from "./designLibrary";

export type UnsplashPhoto = {
  id: string;
  description?: string | null;
  alt_description?: string | null;
  color?: string | null;
  urls: { regular: string };
  links: { html: string };
  user?: { name?: string | null };
  tags?: Array<{ title?: string }>;
};

export type DesignSeed = {
  style?: string[];
  roomType?: string;
  colors?: string[];
  materials?: string[];
  propertyType?: string;
  budget?: string;
};

const normalize = (value?: string | null) => (value || "").toLowerCase();

export const guessStyle = (tags: string[] = []): string[] => {
  const normalized = tags.map(normalize);
  if (normalized.some(t => t.includes("modern") || t.includes("minimal"))) {
    return ["Modern", "Minimalist"];
  }
  if (normalized.some(t => t.includes("scandi") || t.includes("nordic"))) {
    return ["Scandinavian"];
  }
  if (normalized.some(t => t.includes("industrial") || t.includes("loft"))) {
    return ["Industrial"];
  }
  if (normalized.some(t => t.includes("luxury") || t.includes("elegant"))) {
    return ["Luxury"];
  }
  if (normalized.some(t => t.includes("cozy"))) {
    return ["Cozy"];
  }
  return ["Contemporary"];
};

export const guessRoom = (tags: string[] = []): string => {
  const normalized = tags.map(normalize);
  if (normalized.some(t => t.includes("kitchen"))) return "Kitchen";
  if (normalized.some(t => t.includes("bedroom"))) return "Bedroom";
  if (normalized.some(t => t.includes("office"))) return "Home Office";
  if (normalized.some(t => t.includes("dining"))) return "Dining Room";
  if (normalized.some(t => t.includes("bath"))) return "Bathroom";
  return "Living Room";
};

const buildPalette = (color?: string | null) => {
  if (!color) return ["#0A0F2C", "#00D9FF", "#F5F5F5"];
  return [color, "#0A0F2C", "#00D9FF"];
};

export const mapPhotoToDesign = (photo: UnsplashPhoto, seed: DesignSeed): Design => {
  const tags = photo.tags?.map(t => t.title || "").filter(Boolean) || [];
  return {
    id: `unsplash-${photo.id}`,
    title: photo.description || photo.alt_description || "Curated Interior",
    image: photo.urls.regular,
    roomType: seed.roomType || guessRoom(tags),
    style: seed.style || guessStyle(tags),
    colors: seed.colors || ["Neutral"],
    materials: seed.materials || ["Mixed"],
    propertyType: seed.propertyType || "Apartment",
    budget: seed.budget || "$15k - $30k",
    palette: buildPalette(photo.color),
    sources: [
      {
        name: "Photo on Unsplash",
        store: photo.user?.name || "Unsplash",
        url: photo.links.html,
      },
    ],
    description: photo.description || photo.alt_description || undefined,
  };
};

export async function searchUnsplash(
  apiKey: string,
  query: string,
  signal?: AbortSignal
) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=30&orientation=landscape&content_filter=high`,
    {
      headers: { Authorization: `Client-ID ${apiKey}` },
      signal,
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error(`Unsplash: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as { results: UnsplashPhoto[] };
  return json.results;
}
