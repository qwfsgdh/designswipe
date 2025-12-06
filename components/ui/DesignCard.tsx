"use client";

import type { Design } from "@/lib/types";
import Image from "next/image";

type Props = {
  design: Design;
  onNext: () => void;
  onPrev?: () => void;
};

export default function DesignCard({ design, onNext, onPrev }: Props) {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          height: "600px",
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          background: "#111",
        }}
      >
        <Image
          src={design.src}
          alt={design.title}
          width={900}
          height={600}
          style={{
            objectFit: design.orientation === "vertical" ? "contain" : "cover",
            borderRadius: "12px",
          }}
          className="w-full h-full"
          unoptimized
        />
      </div>

      <div className="text-center text-sm text-neutral-300 max-w-xl px-4">
        <div className="font-semibold mb-1">{design.title}</div>
        <div className="text-neutral-400">{design.description}</div>
      </div>

      <div className="flex gap-4 mt-2">
        {onPrev && (
          <button
            className="px-4 py-2 rounded-full border border-neutral-600 text-sm"
            onClick={onPrev}
          >
            Назад
          </button>
        )}
        <button
          className="px-6 py-2 rounded-full bg-white text-black text-sm font-semibold"
          onClick={onNext}
        >
          Следующий интерьер
        </button>
      </div>
    </div>
  );
}
