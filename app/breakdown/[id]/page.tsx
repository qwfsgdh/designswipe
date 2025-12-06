"use client";

import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/app/context/AppContext";
import { useEffect } from "react";

export default function BreakdownPage() {
  const params = useParams();
  const router = useRouter();
  const { images, favorites } = useApp();

  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const design =
    images.find((item) => item.id === id) ||
    favorites.find((item) => item.id === id) ||
    null;

  useEffect(() => {
    if (!design) {
      const timer = setTimeout(() => router.push("/swipe"), 1500);
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

  return (
    <div className="p-4 space-y-3">
      <h1 className="text-xl font-semibold">Breakdown</h1>
      <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
        <div className="text-lg font-semibold">{design.title}</div>
        <div className="text-xs text-slate-400">
          {design.style} · {design.room} · {design.palette} ·{" "}
          {design.budget.toUpperCase()}
        </div>
        <p className="mt-3 text-sm text-slate-300">
          Здесь будет автоматический разбор предметов мебели и декора. Подключи
          свою API, которая вернёт: стул — ИКЕА, стол — Леруа, свет — XYZ.
        </p>
      </div>
    </div>
  );
}
