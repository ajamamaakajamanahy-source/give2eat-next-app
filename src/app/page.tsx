"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import Hero3D from "@/components/Hero3D";
import Food3D from "@/components/Food3D";

export default function Home() {
  const { t } = useLanguage();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="relative isolate overflow-hidden">
      <section className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center gap-10 px-6 py-16 text-center lg:flex-row lg:items-center lg:text-left">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.15),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(59,130,246,0.2),_transparent_60%)]" />
        
        <motion.div 
          className="flex-1 space-y-8"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.p 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-emerald-300"
          >
            {t("welcome")}
          </motion.p>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl font-bold tracking-tight md:text-7xl leading-[1.1]"
          >
            {t("hero_title_part1")}{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 bg-clip-text text-transparent">
              {t("hero_title_part2")}
            </span>{" "}
            {t("hero_title_part3")}
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="max-w-xl text-lg text-white/70 md:text-xl leading-relaxed"
          >
            {t("hero_desc")}
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="/donate"
              className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-500 px-10 text-sm font-bold text-black shadow-lg shadow-emerald-500/40 transition-all hover:bg-emerald-400 hover:scale-105 active:scale-95"
            >
              {t("donate")}
            </a>
            <a
              href="/find"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-10 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/30 active:scale-95"
            >
              {t("find")}
            </a>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="grid max-w-xl grid-cols-2 gap-8 text-left text-sm text-white/60"
          >
            <div className="group border-l border-emerald-500/30 pl-4 py-1 transition-colors hover:border-emerald-500">
              <p className="font-bold text-white group-hover:text-emerald-400 transition-colors">{t("for_donors")}</p>
              <p className="mt-1 leading-relaxed">{t("for_donors_desc")}</p>
            </div>
            <div className="group border-l border-sky-500/30 pl-4 py-1 transition-colors hover:border-sky-500">
              <p className="font-bold text-white group-hover:text-sky-400 transition-colors">{t("for_receivers")}</p>
              <p className="mt-1 leading-relaxed">{t("for_receivers_desc")}</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="relative flex-1 w-full flex items-center justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-emerald-500/20 blur-[120px] rounded-full sm:w-[400px] sm:h-[400px]" />
          <Hero3D />
        </motion.div>
      </section>

      <motion.section 
        className="border-t border-white/10 bg-black/60 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-24 md:gap-16">
          <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3 items-center">
            
            <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl">
              <Food3D />
              <p className="mt-4 text-xs font-medium text-emerald-400 uppercase tracking-widest">Interactive 3D Art</p>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white tracking-tight">About Give2Eat</h2>
              <p className="text-lg leading-relaxed text-white/70">
                Give2Eat is a community-powered food redistribution network. Our
                mission is to reduce food waste and hunger by connecting trusted
                donors with nearby receivers in real time.
              </p>
              <div className="pt-4 flex gap-4">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <p className="text-sm text-white/60 leading-relaxed italic">"Transforming surplus into smiles, one meal at a time."</p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white tracking-tight">How it works</h2>
              <ol className="space-y-6 text-base leading-relaxed text-white/70">
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-sm font-bold text-emerald-400 border border-emerald-500/20">1</span>
                  <span>Donors list fresh, surplus food with pickup details.</span>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 text-sm font-bold text-sky-400 border border-sky-500/20">2</span>
                  <span>Receivers browse nearby listings and request portions.</span>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-sm font-bold text-emerald-400 border border-emerald-500/20">3</span>
                  <span>Donors approve requests and share pickup instructions.</span>
                </li>
              </ol>
            </div>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
             <div className="md:col-span-2 lg:col-span-3">
               <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-transparent p-8 backdrop-blur-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-emerald-400 tracking-tight">{t("safety_disclaimer")}</h2>
                    <p className="max-w-2xl text-base text-white/70 leading-relaxed">{t("safety_desc")}</p>
                  </div>
                  <div className="shrink-0">
                    <ul className="space-y-2 text-sm text-white/60">
                      <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {t("safety_rule1")}</li>
                      <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {t("safety_rule2")}</li>
                      <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {t("safety_rule3")}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
