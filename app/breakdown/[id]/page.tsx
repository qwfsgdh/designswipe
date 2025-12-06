"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { mockDesigns } from "@/lib/mockDesigns";
import { designBreakdowns } from "@/lib/designBreakdowns";

const zones = ["seating", "textiles", "lighting", "storage", "decor"] as const;
const zoneLabels: Record<(typeof zones)[number], string> = {
  seating: "Зона посадки",
  textiles: "Текстиль и мягкость",
  lighting: "Освещение",
  storage: "Хранение и конструкции",
  decor: "Акценты и декор",
};

export default function BreakdownPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const normalizedId = (rawId ?? "").replace(/^design\-/, "").trim();

  const design = useMemo(
    () => mockDesigns.find((item) => String(item.id) === normalizedId) || null,
    [normalizedId]
  );
  const breakdown = useMemo(
    () =>
      designBreakdowns.find((b) => String(b.designId) === normalizedId) || null,
    [normalizedId]
  );

  useEffect(() => {
    if (!design) {
      const timer = setTimeout(() => router.push("/swipe"), 1200);
      return () => clearTimeout(timer);
    }
  }, [design, router]);

  if (!design) {
    return (
      <div className="p-10 text-slate-300">
        Design not found (id = {normalizedId})
      </div>
    );
  }

  if (!breakdown) {
    return (
      <div className="p-10 text-neutral-300 space-y-2">
        <div className="text-xl font-semibold">Breakdown</div>
        <div>
          Для этого интерьера ещё нет разбора 🙌
          <br />
          Добавь breakdown в <code>designBreakdowns.ts</code> для designId ={" "}
          {normalizedId}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      <section className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold">
            Разбор интерьера: {design.title}
          </h1>
          <div className="text-sm text-neutral-500">
            Стиль: {breakdown.mainStyle} • Сложность: {breakdown.difficulty}
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-neutral-800">
          <Image
            src={design.src}
            alt={design.title}
            width={1200}
            height={800}
            style={{ objectFit: "cover", width: "100%", height: "auto" }}
            unoptimized
          />
        </div>

        <p className="text-neutral-300 text-sm leading-relaxed">
          {breakdown.summary}
        </p>

        {breakdown.keyPoints.length > 0 && (
          <ul className="list-disc list-inside text-neutral-400 text-sm space-y-1">
            {breakdown.keyPoints.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        )}

        <Link href="/favorites" className="text-sm text-sky-300 underline">
          ← Назад к избранному
        </Link>
      </section>

      {zones.map((zone) => {
        const items = breakdown.items.filter((i) => i.zone === zone);
        if (!items.length) return null;

        return (
          <section key={zone} className="space-y-4">
            <h2 className="text-lg font-semibold">
              {zoneLabels[zone]}{" "}
              <span className="text-xs text-neutral-500">
                ({items.length} предметов)
              </span>
            </h2>

            <div className="space-y-4">
              {items
                .sort((a, b) => a.importance - b.importance)
                .map((item) => (
                  <div
                    key={item.id}
                    className="border border-neutral-800 rounded-xl p-4 space-y-3 bg-black/40"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="text-sm uppercase text-neutral-500">
                          {item.category}
                        </div>
                        <div className="text-base font-semibold">
                          {item.title}
                        </div>
                      </div>
                      <div className="text-xs text-neutral-500">
                        Важность:{" "}
                        {item.importance === 1
                          ? "ключевой элемент"
                          : item.importance === 2
                          ? "средний"
                          : "акцент"}
                      </div>
                    </div>

                    <p className="text-sm text-neutral-300">
                      {item.description}
                    </p>

                    <div className="text-xs text-neutral-400">
                      Стиль: {item.style} • Палитра: {item.palette} • Материалы:{" "}
                      {item.material}
                    </div>

                    {item.notes && item.notes.length > 0 && (
                      <ul className="text-xs text-neutral-400 list-disc list-inside space-y-1">
                        {item.notes.map((n, i) => (
                          <li key={i}>{n}</li>
                        ))}
                      </ul>
                    )}

                    {item.products.length > 0 && (
                      <div className="mt-2 space-y-1">
                        <div className="text-xs font-semibold text-neutral-400">
                          Подбор товаров:
                        </div>
                        <div className="flex flex-col gap-1">
                          {item.products.map((p, i) => (
                            <a
                              key={`${item.id}-p-${i}`}
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-400 underline flex justify-between gap-2"
                            >
                              <span>
                                {p.shop} — {p.title}
                                {p.note ? ` • ${p.note}` : ""}
                              </span>
                              <span className="text-neutral-500">
                                {p.similarity
                                  ? `${Math.round(
                                      p.similarity * 100
                                    )}% совпадение`
                                  : ""}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
