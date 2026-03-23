"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import AuthButton from "./AuthButton";

export default function Header({ session }: { session: any }) {
  const { t, language, setLanguage } = useLanguage();

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
          <Link href="/find" className="hover:text-white transition-colors">
            {t("find")}
          </Link>
          {session && (
            <>
              <Link href="/dashboard/donor" className="hover:text-white transition-colors">
                {t("donor_dashboard")}
              </Link>
              <Link href="/dashboard/receiver" className="hover:text-white transition-colors">
                {t("receiver_dashboard")}
              </Link>
            </>
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

          <AuthButton session={session} />
        </nav>
      </div>
    </header>
  );
}
