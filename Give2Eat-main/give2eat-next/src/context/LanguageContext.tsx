"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "ml";

type TranslationKey =
  | "nav.home"
  | "nav.donate"
  | "nav.find"
  | "nav.donorDashboard"
  | "nav.receiverDashboard"
  | "hero.badge"
  | "hero.title"
  | "hero.subtitle"
  | "hero.forDonorsTitle"
  | "hero.forDonorsText"
  | "hero.forReceiversTitle"
  | "hero.forReceiversText"
  | "hero.disclaimerTitle"
  | "hero.disclaimerText"
  | "hero.disclaimerRule1"
  | "hero.disclaimerRule2"
  | "hero.disclaimerRule3"
  | "section.aboutTitle"
  | "section.aboutText"
  | "section.howTitle"
  | "section.safetyTitle";

type Translations = Record<Language, Record<TranslationKey, string>>;

const translations: Translations = {
  en: {
    "nav.home": "Home",
    "nav.donate": "Donate Food",
    "nav.find": "Find Food",
    "nav.donorDashboard": "Donor Dashboard",
    "nav.receiverDashboard": "Receiver Dashboard",
    "hero.badge": "Zero Waste. Zero Hunger.",
    "hero.title": "Give2Eat connects extra food with people who need it.",
    "hero.subtitle":
      "A realtime food donation network where donors can list surplus food in seconds and receivers can safely find nearby meals before they expire.",
    "hero.forDonorsTitle": "For Donors",
    "hero.forDonorsText": "Share fresh surplus food in under a minute.",
    "hero.forReceiversTitle": "For Receivers",
    "hero.forReceiversText":
      "Discover verified, nearby food with safe pickup windows.",
    "hero.disclaimerTitle": "Live Safety Disclaimer",
    "hero.disclaimerText":
      "This platform only connects food donors and recipients. Food safety and hygiene are the responsibility of the donor.",
    "hero.disclaimerRule1": "Food must be freshly prepared and unexpired.",
    "hero.disclaimerRule2":
      "Proper storage and temperature must be maintained.",
    "hero.disclaimerRule3":
      "Donors are responsible for accurate descriptions.",
    "section.aboutTitle": "About Give2Eat",
    "section.aboutText":
      "Give2Eat is a community-powered food redistribution network. Our mission is to reduce food waste and hunger by connecting trusted donors with nearby receivers in real time.",
    "section.howTitle": "How it works",
    "section.safetyTitle": "Safety guidelines",
  },
  ml: {
    "nav.home": "ഹോം",
    "nav.donate": "ഭക്ഷണം ദാനം ചെയ്യുക",
    "nav.find": "ഭക്ഷണം കണ്ടെത്തുക",
    "nav.donorDashboard": "ദാതാവ് ഡാഷ്‌ബോർഡ്",
    "nav.receiverDashboard": "സ്വീകരിക്കുന്നവരുടെ ഡാഷ്‌ബോർഡ്",
    "hero.badge": "പാഴ്‌വ്യയം ഇല്ല. വിശപ്പ് ഇല്ല.",
    "hero.title":
      "Give2Eat അധികമുള്ള ഭക്ഷണം അതിനാവശ്യമായ ആളുകളുമായി ബന്ധിപ്പിക്കുന്നു.",
    "hero.subtitle":
      "ദാതാക്കൾക്ക് അധികമായ പുതിയ ഭക്ഷണം ചില സെക്കൻഡുകൾക്കുള്ളിൽ ലിസ്റ്റ് ചെയ്യാനും, സ്വീകരിക്കുന്നവർക്ക് അത് കാലാവധി തീരുന്നതിന് മുമ്പ് സുരക്ഷിതമായി കണ്ടെത്താനുമുള്ള തത്സമയ പ്ലാറ്റ്ഫോം.",
    "hero.forDonorsTitle": "ദാതാക്കൾക്കായി",
    "hero.forDonorsText":
      "അധികമായി ഉള്ള പുതിയ ഭക്ഷണം ഒരു മിനിറ്റിനുള്ളിൽ പങ്കിടുക.",
    "hero.forReceiversTitle": "സ്വീകരിക്കുന്നവർക്ക്",
    "hero.forReceiversText":
      "സുരക്ഷിതമായ പിക്കപ്പ് സമയവുമായുള്ള സമീപത്തെ ഭക്ഷണം കണ്ടെത്തുക.",
    "hero.disclaimerTitle": "ഭക്ഷ്യസുരക്ഷാ അറിയിപ്പ്",
    "hero.disclaimerText":
      "ഈ പ്ലാറ്റ്ഫോം ഭക്ഷണ ദാതാക്കളെയും സ്വീകരിക്കുന്നവരെയും മാത്രം ബന്ധിപ്പിക്കുന്നു. ഭക്ഷ്യസുരക്ഷയും ശുചിത്വവും പൂർണ്ണമായി ദാതാവിന്റെ ഉത്തരവാദിത്തമാണ്.",
    "hero.disclaimerRule1":
      "ഭക്ഷണം പുതിയതും കാലാവധി കഴിഞ്ഞതല്ലാത്തതും ആയിരിക്കണം.",
    "hero.disclaimerRule2":
      "ശരിയായ സംഭരണംയും ആവശ്യമായ താപനിലയും പാലിക്കണം.",
    "hero.disclaimerRule3":
      "വിവരണം, അലർജൻ വിവരങ്ങൾ മുതലായവ ശരിയായി വ്യക്തമാക്കണം.",
    "section.aboutTitle": "Give2Eatയെ കുറിച്ച്",
    "section.aboutText":
      "Give2Eat ഒരു സമൂഹാടിസ്ഥാനത്തിലുള്ള ഭക്ഷണ പുനർവിതരണ ശൃംഖലയാണ്. വിശപ്പും ഭക്ഷ്യപാഴ്‌വ്യയവും കുറയ്ക്കുക എന്നതാണ് ഞങ്ങളുടെ ലക്ഷ്യം.",
    "section.howTitle": "എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    "section.safetyTitle": "സുരക്ഷാനിർദേശങ്ങൾ",
  },
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("give2eat-language");
    if (stored === "en" || stored === "ml") {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("give2eat-language", lang);
    }
  };

  const t = (key: TranslationKey) => {
    const value = translations[language][key];
    return value ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

