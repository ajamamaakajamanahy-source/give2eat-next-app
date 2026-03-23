"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ml";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    donate: "Donate Food",
    find: "Find Food",
    donor_dashboard: "Donor Dashboard",
    receiver_dashboard: "Receiver Dashboard",
    login_signup: "Login / Sign Up",
    sign_out: "Sign Out",
    welcome: "Zero Waste. Zero Hunger.",
    hero_title_part1: "Give2Eat connects",
    hero_title_part2: "extra food",
    hero_title_part3: "with people who need it.",
    hero_desc: "A realtime food donation network where donors can list surplus food in seconds and receivers can safely find nearby meals before they expire.",
    for_donors: "For Donors",
    for_donors_desc: "Share fresh surplus food in under a minute.",
    for_receivers: "For Receivers",
    for_receivers_desc: "Discover verified, nearby food with safe pickup windows.",
    safety_disclaimer: "Live Safety Disclaimer",
    safety_desc: "This platform only connects food donors and recipients. Food safety and hygiene are the responsibility of the donor.",
    safety_rule1: "Food must be freshly prepared and unexpired.",
    safety_rule2: "Proper storage and temperature must be maintained.",
    safety_rule3: "Donors are responsible for accurate descriptions.",
  },
  ml: {
    home: "ഹോം",
    donate: "ഭക്ഷണം നൽകുക",
    find: "ഭക്ഷണം കണ്ടെത്തുക",
    donor_dashboard: "ദാതാവിന്റെ ഡാഷ്ബോർഡ്",
    receiver_dashboard: "സ്വീകർത്താവിന്റെ ഡാഷ്ബോർഡ്",
    login_signup: "ലോഗിൻ / സൈൻ അപ്പ്",
    sign_out: "സൈൻ ഔട്ട്",
    welcome: "സീറോ വേസ്റ്റ്. സീറോ ഹംഗർ.",
    hero_title_part1: "Give2Eat",
    hero_title_part2: "അധികമുള്ള ഭക്ഷണം",
    hero_title_part3: "ആവശ്യമുള്ളവർക്ക് എത്തിച്ചു നൽകുന്നു.",
    hero_desc: "ദാതാക്കൾക്ക് അധികമുള്ള ഭക്ഷണം നിമിഷങ്ങൾക്കുള്ളിൽ പട്ടികപ്പെടുത്താനും സ്വീകർത്താക്കൾക്ക് കാലാവധി തീരുന്നതിന് മുമ്പ് അടുത്തുള്ള ഭക്ഷണം സുരക്ഷിതമായി കണ്ടെത്താനും കഴിയുന്ന ഒരു തത്സമയ നെറ്റ്‌വർക്ക്.",
    for_donors: "ദാതാക്കൾക്ക്",
    for_donors_desc: "ഒരു മിനിറ്റിനുള്ളിൽ സാല്പലിലെ ഭക്ഷണം പങ്കിടാം.",
    for_receivers: "സ്വീകർത്താക്കൾക്ക്",
    for_receivers_desc: "സുരക്ഷിതമായ പിക്ക്അപ്പ് വിൻഡോകളുള്ള അടുത്തുള്ള ഭക്ഷണം കണ്ടെത്തൂ.",
    safety_disclaimer: "സുരക്ഷാ മുന്നറിയിപ്പ്",
    safety_desc: "ഈ പ്ലാറ്റ്‌ഫോം ഭക്ഷണ ദാതാക്കളെയും സ്വീകർത്താക്കളെയും ബന്ധിപ്പിക്കുന്നു. ഭക്ഷണ സുരക്ഷയും ശുചിത്വവും ദാതാവിന്റെ ഉത്തരവാദിത്തമാണ്.",
    safety_rule1: "ഭക്ഷണം പുതുതായി തയ്യാറാക്കിയതും കാലഹരണപ്പെടാത്തതുമായിരിക്കണം.",
    safety_rule2: "ശരിയായ സംഭരണവും താപനിലയും പാലിക്കണം.",
    safety_rule3: "കൃത്യമായ വിവരണങ്ങൾക്ക് ദാതാക്കൾ ഉത്തരവാദികളാണ്.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Persist language choice
  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "en" || saved === "ml")) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
