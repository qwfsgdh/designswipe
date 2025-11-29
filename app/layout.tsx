import type { ReactNode } from "react";
import "./globals.css";
import { FilterProvider } from "./context/FilterContext";
import { AppProvider } from "./context/AppContext";
import BottomNav from "@/components/ui/BottomNav";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0A0F2C] text-white">
        {/* Оборачиваем ВСЁ приложение в оба провайдера */}
        <AppProvider>
          <FilterProvider>
            {children}
            <BottomNav />
          </FilterProvider>
        </AppProvider>
      </body>
    </html>
  );
}

