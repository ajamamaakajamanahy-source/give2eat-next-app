"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Header({ session }: { session: any }) {
  const { t, language, setLanguage } = useLanguage();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <header className="border-b border-white/10 bg-black/80 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-xl bg-emerald-500 flex items-center justify-center text-sm font-bold text-black">
            G2
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">
            Give2Eat
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          <Link href="/" className="hover:text-white transition-colors">
            {t("home")}
          </Link>
          <Link href="/donate" className="hover:text-white transition-colors">
            {t("donate")}
          </Link>
          
          {session ? (
            <button 
              onClick={handleSignOut}
              className="text-white/70 hover:text-white transition-colors"
            >
              {t("sign_out") || "Sign Out"}
            </button>
          ) : (
            <Link href="/login" className="text-white/70 hover:text-white transition-colors">
              {t("login_signup")}
            </Link>
          )}


          <div className="flex items-center gap-2 ml-4 border-l border-white/10 pl-4">
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 rounded transition-colors ${
                language === "en" ? "bg-white/10 text-white" : "hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("ml")}
              className={`px-2 py-1 rounded transition-colors ${
                language === "ml" ? "bg-white/10 text-white" : "hover:text-white"
              }`}
            >
              മല
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
