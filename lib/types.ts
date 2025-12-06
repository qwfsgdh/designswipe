export type Design = {
  id: string;
  title: string;
  src: string;
  style:
    | "modern"
    | "classic"
    | "scandinavian"
    | "minimal"
    | "loft"
    | "boho"
    | "industrial"
    | "retro"
    | "japandi";
  room:
    | "living_room"
    | "kitchen"
    | "bedroom"
    | "bathroom"
    | "office"
    | "hallway"
    | "balcony";
  palette: "cool" | "warm" | "neutral" | "monochrome";
  budget: "low" | "medium" | "premium";
  lighting: "bright" | "dim" | "mixed";
  furnitureDensity: "minimal" | "normal" | "cluttered";
  material:
    | "wood"
    | "metal"
    | "fabric"
    | "stone"
    | "concrete"
    | "mixed"
    | "tile"
    | "glass"
    | "brick";
  theme:
    | "japandi"
    | "boho"
    | "scandinavian"
    | "modern"
    | "industrial"
    | "classic"
    | "retro"
    | "minimal";
  composition: "centered" | "asymmetrical" | "sectional" | "open_space";
  dominantColor:
    | "white"
    | "beige"
    | "grey"
    | "brown"
    | "black"
    | "green"
    | "blue";
  windowPresence: "yes" | "no";
  plantPresence: "yes" | "no";
  flooring: "wood" | "tile" | "carpet" | "concrete";
  artPresence: "yes" | "no";
  aspectRatio: "landscape" | "square" | "portrait";
  orientation: "horizontal" | "vertical";
  qualityScore: number;
};

export type FilterState = {
  style: Design["style"] | null;
  room: Design["room"] | null;
  palette: Design["palette"] | null;
  budget: Design["budget"] | null;
  lighting: Design["lighting"] | null;
  furnitureDensity: Design["furnitureDensity"] | null;
  material: Design["material"] | null;
  theme: Design["theme"] | null;
  composition: Design["composition"] | null;
  dominantColor: Design["dominantColor"] | null;
  windowPresence: Design["windowPresence"] | null;
  plantPresence: Design["plantPresence"] | null;
  flooring: Design["flooring"] | null;
  artPresence: Design["artPresence"] | null;
  aspectRatio: Design["aspectRatio"] | null;
  orientation: Design["orientation"] | null;
  qualityMin: number | null;
};
