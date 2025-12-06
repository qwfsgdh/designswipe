import type { ReactNode } from "react";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import { FilterProvider } from "./context/FilterContext";
import BottomNav from "@/components/ui/BottomNav";

export const metadata = {
  title: "DesignSwipe",
  description:
    "Swipe through interior designs, save favorites, get product breakdowns.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50">
        <AppProvider>
          <FilterProvider>
            <div className="min-h-screen pb-20 flex flex-col">
              <main className="flex-1">{children}</main>
              <BottomNav />
            </div>
          </FilterProvider>
        </AppProvider>
      </body>
    </html>
  );
}
