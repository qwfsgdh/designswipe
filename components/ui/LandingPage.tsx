"use client";

import { motion } from "framer-motion";
import { Sparkles, Brain, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

const features = [
  {
    icon: Brain,
    title: "AI Interior Breakdown",
    description:
      "Get automatic breakdown of each image into furniture and decor items.",
  },
  {
    icon: Sparkles,
    title: "Pinterest-Level Feed",
    description:
      "High-quality interiors aggregated from Pinterest-like sources.",
  },
  {
    icon: Heart,
    title: "Your Style, Your Favorites",
    description:
      "Swipe, save, and build your personal interior moodboard.",
  },
];

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 md:py-16">
      {/* Лого */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/40 text-sky-300 text-sm">
          <Sparkles className="w-4 h-4" />
          <span>DesignSwipe AI</span>
        </div>
      </motion.div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl text-center space-y-4"
      >
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
          Swipe интерьеры,
          <span className="text-sky-400"> сохраняй фавориты</span> и получай
          разбор по товарам.
        </h1>
        <p className="text-slate-300 text-sm md:text-base">
          Подключаем ленту интерьеров из внешних источников, обучаемся на твоих
          свайпах и подсказываем, что за стул, стол и декор в кадре — с
          прямыми ссылками на магазины.
        </p>

        <button
          onClick={() => router.push("/swipe")}
          className="mt-6 px-10 py-4 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-2xl text-slate-900 font-semibold text-lg shadow-lg hover:shadow-xl transition"
        >
          Start Swiping
        </button>
      </motion.div>

      {/* Features */}
      <div className="mt-10 grid gap-4 md:grid-cols-3 max-w-4xl w-full">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 flex flex-col gap-2"
            >
              <div className="inline-flex items-center justify-center rounded-xl bg-slate-800 w-10 h-10">
                <Icon className="w-5 h-5 text-sky-300" />
              </div>
              <h3 className="font-semibold text-sm md:text-base">
                {feature.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-400">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
