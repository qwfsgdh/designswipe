"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { mockDesigns } from "@/lib/mockDesigns";
import { designBreakdowns } from "@/lib/designBreakdowns";

export default function BreakdownPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const design = useMemo(
    () => mockDesigns.find((item) => item.id === id) || null,
    [id]
  );
  const breakdown = useMemo(
    () => designBreakdowns.find((b) => b.designId === id) || null,
    [id]
  );

  useEffect(() => {
    if (!design) {
      const timer = setTimeout(() => router.push("/swipe"), 1200);
      return () => clearTimeout(timer);
    }
  }, [design, router]);

  if (!id) {
    return <div className="p-4 text-slate-400">Invalid design id.</div>;
  }

  if (!design) {
    return (
      <div className="p-4 text-slate-400">
        Дизайн не найден. Перенаправляем обратно к свайпу...
      </div>
    );
  }

  if (!breakdown) {
    return (
      <div className="p-4 space-y-3">
        <h1 className="text-xl font-semibold">Breakdown</h1>
        <p className="text-slate-400">
          Для этого интерьера разбор пока не подготовлен.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          Interior breakdown: {design.title}
        </h1>
        <Link href="/favorites" className="text-sm text-sky-300 underline">
          ← Назад
        </Link>
      </div>

      <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
        <Image
          src={design.src}
          width={900}
          height={600}
          alt={design.title}
          style={{ objectFit: "cover", width: "100%", height: "auto" }}
          unoptimized
        />
      </div>

      <div className="space-y-4">
        {breakdown.items.map((item, i) => (
          <div
            key={`${item.category}-${i}`}
            className="p-4 border border-slate-800 rounded-lg bg-slate-900/70 space-y-2"
          >
            <div className="text-lg font-semibold">{item.title}</div>
            <div className="text-sm text-neutral-400">
              {item.style} • {item.material} • {item.palette}
            </div>
            <div className="text-sm">
              Similarity score: {(item.similarity * 100).toFixed(0)}%
            </div>
            <div className="flex gap-3 flex-wrap">
              {item.link1 && (
                <a
                  className="underline text-sky-300"
                  href={item.link1}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Product link 1
                </a>
              )}
              {item.link2 && (
                <a
                  className="underline text-sky-300"
                  href={item.link2}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Product link 2
                </a>
              )}
              {item.link3 && (
                <a
                  className="underline text-sky-300"
                  href={item.link3}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Product link 3
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
