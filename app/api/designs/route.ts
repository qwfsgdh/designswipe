import { NextResponse } from "next/server";
import { mapPhotoToDesign, searchUnsplash, type DesignSeed } from "@/lib/unsplash";
import type { Design } from "@/lib/designLibrary";

const defaultQuery = "modern interior design living room";

const buildQuery = (seed: DesignSeed) => {
  const parts = [];
  if (seed.style?.length) parts.push(seed.style.join(" "));
  if (seed.roomType) parts.push(seed.roomType);
  parts.push("interior design");
  return parts.join(" ").trim() || defaultQuery;
};

const pickSeed = (params: URLSearchParams): DesignSeed => {
  const style = params.getAll("style").filter(Boolean);
  const colors = params.getAll("color").filter(Boolean);
  const materials = params.getAll("material").filter(Boolean);
  return {
    style: style.length ? style : undefined,
    roomType: params.get("room") || undefined,
    colors: colors.length ? colors : undefined,
    materials: materials.length ? materials : undefined,
    propertyType: params.get("property") || undefined,
    budget: params.get("budget") || undefined,
  };
};

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const seed = pickSeed(params);

  const apiKey =
    process.env.UNSPLASH_ACCESS_KEY || process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "UNSPLASH_ACCESS_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    const query = buildQuery(seed);
    const photos = await searchUnsplash(apiKey, query);
    const designs: Design[] = photos.map(photo => mapPhotoToDesign(photo, seed));

    return NextResponse.json({ items: designs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to load designs from Unsplash",
      },
      { status: 500 }
    );
  }
}
