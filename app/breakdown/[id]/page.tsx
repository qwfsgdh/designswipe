"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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

  // id используем БЕЗ изменений
  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const designId = (rawId ?? "").trim();

  const design = useMemo(
    () => mockDesigns.find((item) => String(item.id) === designId) || null,
    [designId]
  );

  const breakdown = useMemo(
    () =>
      designBreakdowns.find((b) => String(b.designId) === designId) || null,
    [designId]
  );

  useEffect(() => {
    if (!design) {
      const timer = setTimeout(() => router.push("/favorites"), 1500);
      return () => clearTimeout(timer);
    }
  }, [design, router]);

  if (!design) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-lg text-red-400">
          Дизайн не найден (id = {designId})
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Через секунду вернём тебя в избранное…
        </p>
      </main>
    );
  }

  if (!breakdown) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-3">
        <h1 className="text-2xl font-semibold">
          Разбор ещё не готов для этого интерьера
        </h1>
        <p className="text-sm text-muted-foreground">
          Добавь запись в <code>lib/designBreakdowns.ts</code> с{" "}
          <strong>designId = "{designId}"</strong>.
        </p>
        <Link
          href="/favorites"
          className="text-blue-400 hover:text-blue-300 underline underline-offset-2 text-sm"
        >
          ← Вернуться в избранное
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Разбор интерьера: {design.title}
          </h1>
          <Link
            href="/favorites"
            className="text-sm text-blue-400 hover:text-blue-300 underline underline-offset-2"
          >
            ← Назад к избранному
          </Link>
        </div>

        <p className="text-sm text-muted-foreground">
          Стиль: <strong>{breakdown.mainStyle}</strong> • Сложность:{" "}
          <strong>{breakdown.difficulty}</strong>
        </p>

        <p className="text-base leading-relaxed">{breakdown.summary}</p>

        {breakdown.keyPoints.length > 0 && (
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {breakdown.keyPoints.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        )}

        {zones.map((zone) => {
          const items = breakdown.items.filter((i) => i.zone === zone);
          if (!items.length) return null;

          return (
            <section key={zone} className="mt-6 space-y-3">
              <h2 className="text-lg font-semibold">
                {zoneLabels[zone]} ({items.length} предметов)
              </h2>

              <div className="space-y-4">
                {items
                  .sort((a, b) => a.importance - b.importance)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg border border-border/60 bg-card px-4 py-3 space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold">
                            {item.category}: {item.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Важность:{" "}
                            {item.importance === 1
                              ? "ключевой элемент"
                              : item.importance === 2
                              ? "средний"
                              : "акцент"}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm mt-1">{item.description}</p>

                      <p className="text-xs text-muted-foreground">
                        Стиль: {item.style} • Палитра: {item.palette} •
                        Материалы: {item.material}
                      </p>

                      {item.notes && item.notes.length > 0 && (
                        <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-0.5 mt-1">
                          {item.notes.map((n, i) => (
                            <li key={i}>{n}</li>
                          ))}
                        </ul>
                      )}

                      {item.products.length > 0 && (
                        <div className="mt-2 space-y-1">
                          <p className="text-xs font-semibold">
                            Подбор товаров:
                          </p>
                          <ul className="space-y-1 text-xs">
                            {item.products.map((p) => (
                              <li key={p.url}>
                                <a
                                  href={p.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                                >
                                  {p.shop} — {p.title}
                                </a>
                                {p.note && <> • {p.note}</>}
                                {p.similarity && (
                                  <> • {Math.round(p.similarity * 100)}% совпадение</>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
