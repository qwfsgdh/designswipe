"use client";

import type { DesignImage } from "@/lib/types";
import { Heart, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  image: DesignImage;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onNext: () => void;
};

export default function DesignCard({
  image,
  isFavorite,
  onToggleFavorite,
  onNext,
}: Props) {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-slate-700 bg-slate-900">
        <Image
          src={image.src}
          alt={image.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 600px"
        />

        <button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 rounded-full bg-slate-900/70 p-2"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "text-pink-400 fill-pink-400" : "text-slate-100"
            }`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">{image.title}</h2>
          <p className="text-xs text-slate-400">
            {image.style} · {image.roomType} · {image.colorPalette} ·{" "}
            {image.budget.toUpperCase()}
          </p>
        </div>
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500 text-slate-950 text-sm font-medium"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <Link
        href={`/breakdown/${image.id}`}
        className="text-xs text-sky-300 underline"
      >
        Open breakdown (стул — ИКЕА, стол — Леруа и т.д.)
      </Link>
    </div>
  );
}
