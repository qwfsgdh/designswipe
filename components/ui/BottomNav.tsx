"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, SwatchBook, Heart, User } from "lucide-react";

const items = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/swipe", icon: SwatchBook, label: "Swipe" },
  { href: "/favorites", icon: Heart, label: "Favorites" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="max-w-md mx-auto flex justify-around py-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 text-xs"
            >
              <Icon
                className={`w-5 h-5 ${
                  active ? "text-sky-400" : "text-slate-400"
                }`}
              />
              <span className={active ? "text-sky-300" : "text-slate-400"}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
