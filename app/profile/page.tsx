"use client";

import AuthButton from "@/components/ui/AuthButton";

export default function ProfilePage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Profile</h1>
      <p className="text-sm text-slate-400">
        Войди через Google, чтобы привязать избранные интерьеры к аккаунту (позже
        можно будет синкать с сервером).
      </p>
      <AuthButton />
    </div>
  );
}
