export type DesignImage = {
  id: string;
  title: string;
  src: string;
  source: "pinterest" | "unsplash" | "mock";
  style: string;
  roomType: string;
  colorPalette: string;
  budget: "low" | "medium" | "high";
};
