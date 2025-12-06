"use client";

import { useApp } from "@/app/context/AppContext";

export default function AnalysisPage() {
  const { favorites } = useApp();

  if (!favorites.length) {
    return (
      <div className="p-4 text-slate-400">
        Нет избранных дизайнов. Добавь их на вкладке Swipe.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <h1 className="text-xl font-semibold">Design Breakdown</h1>
      <p className="text-sm text-slate-400">
        Здесь будет разбор: стул — ИКЕА, стол — Леруа, и т.д. Подключи свой
        бэкенд, чтобы отдавать данные по ID.
      </p>
      <ul className="space-y-2">
        {favorites.map((item) => (
          <li
            key={item.id}
            className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2"
          >
            <div className="text-sm font-medium">{item.title}</div>
            <div className="text-xs text-slate-400">
              {item.style} · {item.room} · {item.palette}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
