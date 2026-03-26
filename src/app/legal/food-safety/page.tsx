"use client";

import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

export default function FoodSafetyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 space-y-8">
      <ScrollReveal>
        <div className="space-y-3">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400/60">Legal</span>
          <h1 className="text-4xl font-bold tracking-tight">Food Safety Disclaimer</h1>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <div className="rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 backdrop-blur-sm space-y-6">
          <p className="text-base text-white/50 leading-relaxed">
            This platform only connects food donors and recipients. Food safety and
            hygiene are the responsibility of the donor. Give2Eat does not prepare,
            store, or transport food and cannot guarantee its quality.
          </p>
          <p className="text-base text-white/50 leading-relaxed">
            Donors should follow food safety guidance inspired by the Food Safety
            and Standards Authority of India (FSSAI): share only freshly prepared,
            properly stored, and unexpired food.
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
