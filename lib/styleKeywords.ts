export const STYLE_KEYWORDS: Record<string, string[]> = {
  industrial: ["industrial", "factory", "warehouse", "brick", "metal", "steel", "dark wood"],
  scandinavian: ["scandinavian", "minimal", "airy", "light wood", "white", "neutral"],
  boho: ["boho", "earth", "woven", "plants", "macrame", "organic", "textured"],
  modern: ["modern", "sleek", "minimal", "glass", "chrome", "clean lines"],
  classic: ["classic", "elegant", "ornate", "decorative", "traditional", "vintage"],
  retro: ["retro", "mid-century", "vintage", "bold color", "geometric"],
  japandi: ["japandi", "zen", "calm", "wood", "neutral", "minimal"],
  loft: ["loft", "open space", "exposed", "brick", "industrial"],
};

export const fuzzyMatch = (text: string, keywords: string[]) => {
  const low = text.toLowerCase();
  return keywords.some((k) => low.includes(k.toLowerCase()));
};
