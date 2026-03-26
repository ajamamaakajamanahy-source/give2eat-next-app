"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero3D from "@/components/Hero3D";
import Food3D from "@/components/Food3D";
import ImpactSection from "@/components/ImpactSection";
import TextReveal from "@/components/TextReveal";
import TiltCard from "@/components/TiltCard";
import MagneticButton from "@/components/MagneticButton";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function Home() {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  return (
    <div className="relative isolate overflow-hidden">

      {/* ===== HERO SECTION ===== */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative mx-auto flex min-h-[95vh] max-w-7xl flex-col items-center justify-center gap-10 px-6 py-20 text-center lg:flex-row lg:items-center lg:text-left"
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[180px] animate-float" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-sky-500/8 rounded-full blur-[160px]" style={{ animationDelay: "3s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-600/5 rounded-full blur-[200px]" />
        </div>

        {/* Left Content */}
        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-300 backdrop-blur-sm glow-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
              {t("welcome")}
            </span>
          </motion.div>

          <TextReveal
            className="text-5xl font-bold tracking-tight md:text-7xl leading-[1.08]"
            delay={0.2}
            staggerDelay={0.04}
          >
            {`${t("hero_title_part1")} ${t("hero_title_part2")} ${t("hero_title_part3")}`}
          </TextReveal>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-xl text-lg text-white/50 md:text-xl leading-relaxed mx-auto lg:mx-0"
          >
            {t("hero_desc")}
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative max-w-md w-full group mx-auto lg:mx-0"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-transparent to-sky-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg" />
            <div className="relative flex items-center bg-white/[0.03] rounded-full border border-white/10 p-1.5 pl-6 shadow-2xl backdrop-blur-sm group-hover:border-white/20 transition-colors duration-500">
              <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search food by location..."
                className="bg-transparent border-none focus:ring-0 text-sm text-white placeholder-white/30 flex-1 px-4 h-10 w-full outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="bg-emerald-500 text-black text-xs font-black px-6 py-2.5 rounded-full hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/25 whitespace-nowrap"
              >
                {t("find")}
              </motion.button>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col gap-4 sm:flex-row justify-center lg:justify-start"
          >
            <MagneticButton
              href="/donate"
              className="inline-flex h-13 items-center justify-center rounded-full bg-emerald-500 px-10 text-sm font-black text-black shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/50 active:scale-95"
            >
              {t("donate")}
            </MagneticButton>
            <MagneticButton
              href="/find"
              className="inline-flex h-13 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-10 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/20 active:scale-95 backdrop-blur-sm"
            >
              {t("find")}
            </MagneticButton>
          </motion.div>

          {/* For Donors / For Receivers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="grid max-w-xl grid-cols-2 gap-8 text-left text-sm text-white/50 mx-auto lg:mx-0 pt-4"
          >
            <div className="group border-l-2 border-emerald-500/20 pl-5 py-2 transition-all hover:border-emerald-500/60 hover:pl-6 duration-300">
              <p className="font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">{t("for_donors")}</p>
              <p className="mt-1.5 leading-relaxed text-white/40">{t("for_donors_desc")}</p>
            </div>
            <div className="group border-l-2 border-sky-500/20 pl-5 py-2 transition-all hover:border-sky-500/60 hover:pl-6 duration-300">
              <p className="font-bold text-white group-hover:text-sky-400 transition-colors duration-300">{t("for_receivers")}</p>
              <p className="mt-1.5 leading-relaxed text-white/40">{t("for_receivers_desc")}</p>
            </div>
          </motion.div>
        </div>

        {/* Right 3D Hero */}
        <motion.div
          className="relative flex-1 w-full flex items-center justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.7, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-emerald-500/8 blur-[180px] rounded-full sm:w-[500px] sm:h-[500px] animate-float" />
          <Hero3D />
        </motion.div>
      </motion.section>

      {/* ===== MARQUEE STRIP ===== */}
      <div className="relative py-6 border-y border-white/5 bg-white/[0.01] overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, j) => (
            <div key={j} className="flex items-center gap-12 mx-6 text-white/15 text-sm font-bold uppercase tracking-[0.3em]">
              <span>Zero Waste</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
              <span>Zero Hunger</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500/40" />
              <span>Community Driven</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
              <span>Real-Time Network</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500/40" />
              <span>Fresh & Safe</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
              <span>Give2Eat</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500/40" />
            </div>
          ))}
        </div>
      </div>

      {/* ===== IMPACT SECTION ===== */}
      <ImpactSection />

      {/* ===== RECENT DONATIONS ===== */}
      <section className="py-28 relative border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/5 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-6xl px-6 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <ScrollReveal direction="left">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400/60">Live Feed</span>
                <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Recent Donations</h2>
                <p className="text-white/40 max-w-md">Real-time local listings near you. Fresh food, no waste.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <a href="/find" className="text-emerald-400 font-bold text-sm hover:text-emerald-300 transition-colors group flex items-center gap-2">
                View all listings
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>
            </ScrollReveal>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Fresh Veggie Pack", loc: "Ernakulam", tag: "Vegetarian", time: "2h left", id: 1 },
              { title: "Homemade Biryani", loc: "Kochi", tag: "Non-Veg", time: "1h left", id: 2 },
              { title: "Assorted Fruits", loc: "Aluva", tag: "Vegan", time: "45m left", id: 3 },
            ].map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.1}>
                <TiltCard
                  className="rounded-[2rem] border border-white/[0.06] bg-white/[0.02] hover:border-emerald-500/20 transition-all backdrop-blur-sm"
                  tiltAmount={8}
                >
                  <div className="p-6">
                    <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-zinc-800/50 via-zinc-900/80 to-black mb-6 overflow-hidden relative group">
                      <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black text-emerald-400 z-10 tracking-wider">
                        {item.time}
                      </div>
                      <div className="w-full h-full flex items-center justify-center text-white/[0.03] font-black text-7xl group-hover:scale-110 group-hover:text-white/[0.06] transition-all duration-700">
                        G2E
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-bold text-xl">{item.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-white/30">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-emerald-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {item.loc}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] uppercase tracking-[0.15em] text-[9px] font-bold">{item.tag}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full mt-2 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs font-bold hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all duration-300"
                      >
                        {t("find")}
                      </motion.button>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT & MISSION ===== */}
      <section className="border-t border-white/5 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-950/5 to-transparent pointer-events-none" />
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-28 md:gap-16 relative">
          <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3 items-center">

            <ScrollReveal direction="left">
              <TiltCard className="flex flex-col items-center justify-center p-8 glass-card rounded-[2.5rem] group" tiltAmount={10}>
                <Food3D />
                <p className="mt-4 text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity duration-500">Interactive 3D Art</p>
              </TiltCard>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="space-y-6">
                <TextReveal className="text-4xl font-bold text-white tracking-tight" as="h2" delay={0.1}>
                  About Give2Eat
                </TextReveal>
                <p className="text-lg leading-relaxed text-white/50">
                  Give2Eat is a community-powered food redistribution network. Our
                  mission is to reduce food waste and hunger by connecting trusted
                  donors with nearby receivers in real time.
                </p>
                <div className="pt-4 flex gap-4 items-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="h-12 w-12 flex items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/15"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.div>
                  <p className="text-sm text-white/35 leading-relaxed italic">"Transforming surplus into smiles, one meal at a time."</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.3}>
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-white tracking-tight">How it works</h2>
                <ol className="space-y-6 text-base leading-relaxed text-white/50">
                  {[
                    { num: "1", color: "emerald", text: "Donors list fresh, surplus food with pickup details." },
                    { num: "2", color: "sky", text: "Receivers browse nearby listings and request portions." },
                    { num: "3", color: "emerald", text: "Donors approve requests and share pickup instructions." },
                  ].map((step, idx) => (
                    <motion.li
                      key={idx}
                      className="flex gap-4 group"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.span
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-bold border transition-all duration-300 ${
                          step.color === "emerald"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/15 group-hover:bg-emerald-500 group-hover:text-black"
                            : "bg-sky-500/10 text-sky-400 border-sky-500/15 group-hover:bg-sky-500 group-hover:text-black"
                        }`}
                      >
                        {step.num}
                      </motion.span>
                      <span className="pt-2 group-hover:text-white/70 transition-colors duration-300">{step.text}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>
          </div>

          {/* Safety & Trust Footer */}
          <ScrollReveal delay={0.1}>
            <TiltCard
              className="rounded-[2.5rem] border border-white/[0.06] overflow-hidden"
              tiltAmount={3}
              glareEnabled={true}
            >
              <div className="bg-gradient-to-br from-emerald-500/[0.06] via-transparent to-sky-500/[0.03] p-10 backdrop-blur-xl relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -z-10" />
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-emerald-400 tracking-tight">{t("safety_disclaimer")}</h2>
                    <p className="max-w-2xl text-lg text-white/40 leading-relaxed font-light">{t("safety_desc")}</p>
                  </div>
                  <div className="shrink-0">
                    <ul className="space-y-4">
                      {[t("safety_rule1"), t("safety_rule2"), t("safety_rule3")].map((rule, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-4 text-sm text-white/50 bg-white/[0.02] border border-white/[0.04] px-6 py-3.5 rounded-2xl hover:border-emerald-500/20 transition-all duration-300"
                        >
                          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] shrink-0" />
                          {rule}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== JOIN COMMUNITY ===== */}
      <section className="py-32 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[200px]" />
        </div>

        <div className="mx-auto max-w-4xl px-6 text-center space-y-10 relative">
          <ScrollReveal>
            <TextReveal
              className="text-4xl font-bold tracking-tight md:text-6xl justify-center"
              as="h2"
              delay={0.1}
            >
              Ready to make a difference?
            </TextReveal>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white/40 max-w-2xl mx-auto">
              Join thousands of volunteers and donors in your city. Every meal shared is a step towards zero hunger.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
              <MagneticButton
                href="/login?view=sign-up"
                className="px-12 py-4 bg-white text-black font-black rounded-full hover:bg-emerald-400 transition-all duration-300 shadow-lg shadow-white/10 hover:shadow-emerald-400/20 text-sm"
              >
                Get Started for Free
              </MagneticButton>
              <MagneticButton
                href="/legal/community-guidelines"
                className="px-12 py-4 bg-white/[0.03] border border-white/10 text-white font-bold rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-sm"
              >
                Community Guide
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
