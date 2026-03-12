"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { language, setLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ml" : "en");
  };

  const closeMobile = () => setMobileOpen(false);

  const navLinks = [
    { href: "/", labelKey: "nav.home" as const },
    { href: "/donate", labelKey: "nav.donate" as const },
    { href: "/find", labelKey: "nav.find" as const },
    { href: "/dashboard/donor", labelKey: "nav.donorDashboard" as const },
    {
      href: "/dashboard/receiver",
      labelKey: "nav.receiverDashboard" as const,
    },
  ];

  const languageLabel = language === "en" ? "മലയാളം" : "English";

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 text-sm font-bold">
              G2
            </span>
            <span className="text-lg font-semibold tracking-tight">
              Give2Eat
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white"
              >
                {t(link.labelKey)}
              </a>
            ))}
            <button
              type="button"
              onClick={toggleLanguage}
              className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/80 hover:border-emerald-400 hover:text-emerald-300"
            >
              {languageLabel}
            </button>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={toggleLanguage}
              className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/80 hover:border-emerald-400 hover:text-emerald-300"
            >
              {languageLabel}
            </button>
            <button
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/20 text-white hover:border-emerald-400"
            >
              <span className="sr-only">Open navigation</span>
              <span className="flex flex-col gap-1.5">
                <span className="block h-0.5 w-4 bg-white" />
                <span className="block h-0.5 w-4 bg-white" />
                <span className="block h-0.5 w-4 bg-white" />
              </span>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-black/95 md:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 text-sm text-white/80">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className="py-1 hover:text-white"
                >
                  {t(link.labelKey)}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 bg-gradient-to-b from-black via-zinc-950 to-black">
        {children}
      </main>

      <footer className="border-t border-white/10 bg-black">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Give2Eat. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <a href="/legal/privacy-policy" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="/legal/terms" className="hover:text-white">
              Terms &amp; Conditions
            </a>
            <a href="/legal/food-safety" className="hover:text-white">
              Food Safety Disclaimer
            </a>
            <a
              href="/legal/community-guidelines"
              className="hover:text-white"
            >
              Community Guidelines
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

