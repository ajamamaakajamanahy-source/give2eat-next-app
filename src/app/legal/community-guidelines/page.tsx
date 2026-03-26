"use client";

import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

export default function CommunityGuidelinesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 space-y-8">
      <ScrollReveal>
        <div className="space-y-3">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400/60">Community</span>
          <h1 className="text-4xl font-bold tracking-tight">Community Guidelines</h1>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <div className="rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 backdrop-blur-sm space-y-6">
          <p className="text-base text-white/50 leading-relaxed">
            Give2Eat is built on trust, safety, and respect. Donors and receivers
            must act responsibly, communicate clearly, and follow all applicable
            local laws and regulations.
          </p>
          <ul className="space-y-3">
            {[
              "Share only safe, freshly prepared, and unexpired food.",
              "Provide accurate descriptions and pickup details.",
              "Meet in safe, public locations whenever possible.",
              "Treat all members of the community with respect.",
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-base text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </div>
  );
}
