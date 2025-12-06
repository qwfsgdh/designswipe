"use client";

import type { Design } from "@/lib/types";
import { Heart, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  image: Design;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onNext: () => void;
  priority?: boolean;
};

export default function DesignCard({
  image,
  isFavorite,
  onToggleFavorite,
  onNext,
  priority = false,
}: Props) {
  const MAX_RETRIES = 1;
  const [retryCount, setRetryCount] = useState(0);
  const [imageKey, setImageKey] = useState(() => Date.now());
  const [isLoaded, setIsLoaded] = useState(false);

  const refreshImage = () => setImageKey(Date.now());

  const handleError = () => {
    if (retryCount < MAX_RETRIES) {
      setRetryCount((prev) => prev + 1);
      setTimeout(() => refreshImage(), 300);
    } else {
      onNext();
    }
  };

  const handleNext = () => {
    setTimeout(() => onNext(), 350);
  };

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div
        className="mx-auto"
        style={{
          width: "100%",
          maxWidth: "900px",
          height: "600px",
          position: "relative",
        }}
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500 bg-slate-900/50">
            Loading…
          </div>
        )}
        <Image
          key={imageKey}
          src={image.src}
          alt={image.title}
          fill
          sizes="90vw"
          style={{
            objectFit: image.orientation === "vertical" ? "contain" : "cover",
            borderRadius: "12px",
          }}
          onError={handleError}
          onLoadingComplete={() => setIsLoaded(true)}
          priority={priority}
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
            {image.style} · {image.room} · {image.palette} ·{" "}
            {image.budget.toUpperCase()}
          </p>
        </div>
        <button
          onClick={handleNext}
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
