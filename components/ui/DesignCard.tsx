"use client";

import type { Design } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  design: Design;
  onNext: () => void;
  onPrev?: () => void;
};

export default function DesignCard({ design, onNext, onPrev }: Props) {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Заголовок + описание */}
      <div className="w-full max-w-5xl flex flex-col gap-1">
        <h2 className="text-xl font-semibold">{design.title}</h2>
        <p className="text-sm text-muted-foreground">{design.description}</p>
      </div>

      {/* Картинка */}
      <div className="relative w-full max-w-5xl max-h-[75vh] aspect-[3/2] rounded-xl overflow-hidden bg-muted">
        <Image
          src={design.src}
          alt={design.title}
          fill
          sizes="(max-width: 1024px) 100vw, 900px"
          className={
            design.orientation === "vertical" ? "object-contain" : "object-cover"
          }
          priority={false}
        />
      </div>

      {/* Кнопки действий */}
      <div className="w-full max-w-5xl flex items-center justify-between mt-2">
        {onPrev ? (
          <button
            type="button"
            onClick={onPrev}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Назад
          </button>
        ) : (
          <span />
        )}

        <button
          type="button"
          onClick={onNext}
          className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
        >
          Следующий интерьер
        </button>
      </div>

      {/* Линк на разбор */}
      <div className="w-full max-w-5xl flex justify-start">
        <Link
          href={`/breakdown/${design.id}`}
          className="text-sm text-blue-400 hover:text-blue-300 underline underline-offset-2"
        >
          Разбор: что за мебель на фото
        </Link>
      </div>
    </div>
  );
}
