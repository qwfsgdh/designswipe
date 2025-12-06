"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseClient";

type User = {
  email: string | null;
};

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabaseBrowser.auth.getUser().then(({ data }) => {
      setUser(data.user ? { email: data.user.email ?? null } : null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabaseBrowser.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { email: session.user.email ?? null } : null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    await supabaseBrowser.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/profile`
            : undefined,
      },
    });
  };

  const signOut = async () => {
    await supabaseBrowser.auth.signOut();
  };

  if (loading) {
    return (
      <button className="px-4 py-2 rounded-xl bg-slate-800 text-xs">
        Loading...
      </button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-300">{user.email}</span>
        <button
          onClick={signOut}
          className="px-4 py-2 rounded-xl bg-slate-800 text-xs"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={signInWithGoogle}
      className="px-4 py-2 rounded-xl bg-sky-500 text-slate-950 text-xs font-medium"
    >
      Sign in with Google
    </button>
  );
}
