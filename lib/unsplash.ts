import type { Design } from "./designLibrary";

type UnsplashPhoto = {
  id: string;
  description?: string | null;
  alt_description?: string | null;
  color?: string | null;
  urls: { regular: string };
  links: { html: string };
  user?: { name?: string | null };
  tags?: Array<{ title?: string }>;
};

const guessStyle = (tags: string[] = []): string[] => {
  const normalized = tags.map(t => t.toLowerCase());
  if (normalized.some(t => t.includes("modern") || t.includes("minimal"))) {
    return ["Modern", "Minimalist"];
  }
  if (normalized.some(t => t.includes("scandi"))) return ["Scandinavian"];
  if (normalized.some(t => t.includes("industrial"))) return ["Industrial"];
  if (normalized.some(t => t.includes("luxury"))) return ["Luxury"];
  return ["Contemporary"];
};

const guessRoom = (tags: string[] = []): string => {
  const normalized = tags.map(t => t.toLowerCase());
  if (normalized.some(t => t.includes("kitchen"))) return "Kitchen";
  if (normalized.some(t => t.includes("bedroom"))) return "Bedroom";
  if (normalized.some(t => t.includes("office"))) return "Home Office";
  if (normalized.some(t => t.includes("dining"))) return "Dining Room";
  return "Living Room";
};

const buildPalette = (color?: string | null) => {
  if (!color) return ["#0A0F2C", "#00D9FF", "#F5F5F5"];
  return [color, "#0A0F2C", "#00D9FF"];
};

const mapPhotoToDesign = (photo: UnsplashPhoto): Design => {
  const tags = photo.tags?.map(t => t.title || "").filter(Boolean) || [];
  return {
    id: `unsplash-${photo.id}`,
    title: photo.description || photo.alt_description || "Curated Interior",
    image: photo.urls.regular,
    roomType: guessRoom(tags),
    style: guessStyle(tags),
    colors: ["Neutral"],
    materials: ["Mixed"],
    propertyType: "Apartment",
    budget: "$15k - $30k",
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

export async function fetchUnsplashDesigns(apiKey: string, signal?: AbortSignal) {
  const query = encodeURIComponent("modern interior design living room");
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&per_page=24&orientation=landscape&content_filter=high`,
    {
      headers: { Authorization: `Client-ID ${apiKey}` },
      signal,
    }
  );

  if (!res.ok) {
    throw new Error(`Unsplash: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as { results: UnsplashPhoto[] };
  return json.results.map(mapPhotoToDesign);
}
