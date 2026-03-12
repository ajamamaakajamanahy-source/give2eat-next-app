"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="relative isolate overflow-hidden">
      <section className="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center gap-10 px-6 py-16 text-center md:flex-row md:items-start md:text-left">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.15),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(59,130,246,0.2),_transparent_60%)]" />
        <div className="flex-1 space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-emerald-300">
            {t("hero.badge")}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="max-w-xl text-base text-white/70 md:text-lg">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="/donate"
              className="inline-flex flex-1 items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold text-black shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400"
            >
              Donate Food
            </a>
            <a
              href="/find"
              className="inline-flex flex-1 items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Find Food
            </a>
          </div>
          <div className="mt-4 grid max-w-xl grid-cols-2 gap-4 text-left text-xs text-white/60 md:text-sm">
            <div>
              <p className="font-semibold text-white">
                {t("hero.forDonorsTitle")}
              </p>
              <p>{t("hero.forDonorsText")}</p>
            </div>
            <div>
              <p className="font-semibold text-white">
                {t("hero.forReceiversTitle")}
              </p>
              <p>{t("hero.forReceiversText")}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-1 flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur md:mt-0">
          <h2 className="text-lg font-semibold">
            {t("hero.disclaimerTitle")}
          </h2>
          <p className="text-sm text-white/70">
            {t("hero.disclaimerText")}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>• {t("hero.disclaimerRule1")}</li>
            <li>• {t("hero.disclaimerRule2")}</li>
            <li>• {t("hero.disclaimerRule3")}</li>
          </ul>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 md:gap-16">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <h2 className="text-2xl font-semibold">
                {t("section.aboutTitle")}
              </h2>
              <p className="mt-3 text-sm text-white/70">
                {t("section.aboutText")}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">
                {t("section.howTitle")}
              </h2>
              <ol className="mt-3 space-y-2 text-sm text-white/70">
                <li>1. Donors list fresh, surplus food with pickup details.</li>
                <li>2. Receivers browse nearby listings and request portions.</li>
                <li>3. Donors approve requests and share pickup instructions.</li>
                <li>4. Listings expire automatically when time runs out.</li>
              </ol>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">
                {t("section.safetyTitle")}
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>• Follow FSSAI-aligned hygiene practices.</li>
                <li>• No spoiled, expired, or doubtful food.</li>
                <li>• Label allergens and ingredients clearly.</li>
                <li>• Coordinate safe and public pickup points.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
