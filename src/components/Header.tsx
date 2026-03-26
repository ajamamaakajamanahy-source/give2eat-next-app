"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import AuthButton from "./AuthButton";

export default function Header({ session }: { session: any }) {
  const { t, language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/donate", label: t("donate") },
    { href: "/find", label: t("find") },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.span
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="h-9 w-9 rounded-xl bg-emerald-500 flex items-center justify-center text-sm font-black text-black shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-shadow"
          >
            G2
          </motion.span>
          <span className="text-lg font-semibold tracking-tight text-white">
            Give2Eat
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 text-sm md:flex">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              <Link
                href={link.href}
                className="relative px-4 py-2 text-white/60 hover:text-white transition-colors duration-300 rounded-full hover:bg-white/5 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-emerald-400 rounded-full group-hover:w-1/2 transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
          
          {session && (
            <>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link href="/dashboard/donor" className="relative px-4 py-2 text-white/60 hover:text-white transition-colors duration-300 rounded-full hover:bg-white/5">
                  {t("donor_dashboard")}
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Link href="/dashboard/receiver" className="relative px-4 py-2 text-white/60 hover:text-white transition-colors duration-300 rounded-full hover:bg-white/5">
                  {t("receiver_dashboard")}
                </Link>
              </motion.div>
            </>
          )}

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-1 ml-2 border-l border-white/10 pl-3"
          >
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                language === "en"
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  : "text-white/40 hover:text-white/60 hover:bg-white/5"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("ml")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                language === "ml"
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  : "text-white/40 hover:text-white/60 hover:bg-white/5"
              }`}
            >
              മല
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring" }}
          >
            <AuthButton session={session} />
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <div className="flex flex-col gap-1.5 w-5">
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-full bg-white rounded-full origin-center"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-full bg-white rounded-full"
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-full bg-white rounded-full origin-center"
            />
          </div>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-white/5 bg-black/90 backdrop-blur-xl"
          >
            <nav className="flex flex-col gap-2 p-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 mt-2 border-t border-white/5">
                <AuthButton session={session} />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
