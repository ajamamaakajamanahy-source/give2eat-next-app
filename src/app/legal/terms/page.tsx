"use client";

import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 space-y-8">
      <ScrollReveal>
        <div className="space-y-3">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400/60">Legal</span>
          <h1 className="text-4xl font-bold tracking-tight">Terms and Conditions</h1>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <div className="rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 backdrop-blur-sm space-y-4">
          <p className="text-base text-white/50 leading-relaxed">
            This platform connects donors and receivers to facilitate food sharing.
            By using Give2Eat you agree to our terms of use, including community
            guidelines and food safety responsibilities. Please have a lawyer review
            and extend this page before launch.
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
