"use client";

import { redirect } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import Hero3D from "@/components/Hero3D";
import Food3D from "@/components/Food3D";
import ImpactSection from "@/components/ImpactSection";

export default function Home() {
  redirect("/find");
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
      {/* Hero Section */}
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
            className="max-w-xl text-lg text-white/70 md:text-xl leading-relaxed mx-auto lg:mx-0"
          >
            {t("hero_desc")}
          </motion.p>

          <motion.div 
            variants={fadeInUp}
            className="relative max-w-md w-full group mx-auto lg:mx-0"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full opacity-20 group-hover:opacity-40 transition duration-500 blur" />
            <div className="relative flex items-center bg-black rounded-full border border-white/10 p-1 pl-6 shadow-2xl">
              <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input 
                type="text" 
                placeholder="Search food by location..." 
                className="bg-transparent border-none focus:ring-0 text-sm text-white placeholder-white/40 flex-1 px-4 h-10 w-full outline-none"
              />
              <button className="bg-emerald-500 text-black text-xs font-bold px-6 py-2.5 rounded-full hover:bg-emerald-400 transition-colors whitespace-nowrap">
                {t("find")}
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col gap-4 sm:flex-row justify-center lg:justify-start"
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
            className="grid max-w-xl grid-cols-2 gap-8 text-left text-sm text-white/60 mx-auto lg:mx-0 pt-4"
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
          <div className="absolute inset-x-0 bottom-0 top-0 bg-emerald-500/10 blur-[150px] rounded-full sm:w-[500px] sm:h-[500px]" />
          <Hero3D />
        </motion.div>
      </section>

      {/* Impact Section */}
      <ImpactSection />

      {/* Recent Donations Grid */}
      <section className="py-24 bg-zinc-950/50 relative border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Recent Donations</h2>
              <p className="text-white/60">Real-time local listings near you.</p>
            </div>
            <a href="/find" className="text-emerald-400 font-bold text-sm hover:underline">View all listings →</a>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Fresh Veggie Pack", loc: "Ernakulam", tag: "Vegetarian", time: "2h left", id: 1 },
              { title: "Homemade Biryani", loc: "Kochi", tag: "Non-Veg", time: "1h left", id: 2 },
              { title: "Assorted Fruits", loc: "Aluva", tag: "Vegan", time: "45m left", id: 3 },
            ].map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group rounded-[2rem] border border-white/10 bg-black/40 p-6 hover:border-emerald-500/30 transition-all cursor-pointer backdrop-blur-sm"
              >
                <div className="aspect-[4/3] rounded-2xl bg-zinc-900 mb-6 overflow-hidden relative">
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-emerald-400 z-10">
                    {item.time}
                  </div>
                  <div className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black flex items-center justify-center text-white/5 font-black text-6xl group-hover:scale-110 transition-transform duration-500">
                    G2E
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl group-hover:text-emerald-400 transition-colors">{item.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white/40">
                    <span className="flex items-center gap-1.5">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                       {item.loc}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 uppercase tracking-widest text-[9px] font-bold">{item.tag}</span>
                  </div>
                  <button className="w-full mt-2 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all active:scale-95 outline-none">
                    {t("find")}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Mission Section */}
      <motion.section 
        className="border-t border-white/10 bg-black relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-24 md:gap-16">
          <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3 items-center">
            
            <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-xl group hover:border-emerald-500/20 transition-colors">
              <Food3D />
              <p className="mt-4 text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100 transition-opacity">Interactive 3D Art</p>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white tracking-tight">About Give2Eat</h2>
              <p className="text-lg leading-relaxed text-white/70">
                Give2Eat is a community-powered food redistribution network. Our
                mission is to reduce food waste and hunger by connecting trusted
                donors with nearby receivers in real time.
              </p>
              <div className="pt-4 flex gap-4">
                <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <p className="text-sm text-white/50 leading-relaxed italic">"Transforming surplus into smiles, one meal at a time."</p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white tracking-tight">How it works</h2>
              <ol className="space-y-6 text-base leading-relaxed text-white/70">
                <li className="flex gap-4 group">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-sm font-bold text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-black transition-all">1</span>
                  <span className="pt-2">Donors list fresh, surplus food with pickup details.</span>
                </li>
                <li className="flex gap-4 group">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-500/15 text-sm font-bold text-sky-400 border border-sky-500/20 group-hover:bg-sky-500 group-hover:text-black transition-all">2</span>
                  <span className="pt-2">Receivers browse nearby listings and request portions.</span>
                </li>
                <li className="flex gap-4 group">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-sm font-bold text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-black transition-all">3</span>
                  <span className="pt-2">Donors approve requests and share pickup instructions.</span>
                </li>
              </ol>
            </div>
          </div>
          
          {/* Safety & Trust Footer */}
          <div className="mt-12">
             <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-emerald-500/10 via-transparent to-sky-500/5 p-10 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -z-10" />
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-emerald-400 tracking-tight">{t("safety_disclaimer")}</h2>
                    <p className="max-w-2xl text-lg text-white/60 leading-relaxed font-light">{t("safety_desc")}</p>
                  </div>
                  <div className="shrink-0">
                    <ul className="space-y-4">
                      {[t("safety_rule1"), t("safety_rule2"), t("safety_rule3")].map((rule, idx) => (
                        <li key={idx} className="flex items-center gap-4 text-sm text-white/70 bg-white/5 border border-white/5 px-6 py-3 rounded-2xl">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" /> 
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </motion.section>

      {/* Join Community Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-8">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight md:text-6xl"
          >
            Ready to make a <span className="text-emerald-400 underline decoration-emerald-500/30 underline-offset-8">difference?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/60"
          >
            Join thousands of volunteers and donors in your city.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="/login?view=sign-up" className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-emerald-400 transition-colors">
              Get Started for Free
            </a>
            <a href="/legal/community-guidelines" className="px-10 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              Community Guide
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
