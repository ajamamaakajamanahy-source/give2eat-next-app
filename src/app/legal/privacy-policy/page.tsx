"use client";

import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 space-y-8">
      <ScrollReveal>
        <div className="space-y-3">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400/60">Legal</span>
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <div className="rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 backdrop-blur-sm space-y-4">
          <p className="text-base text-white/50 leading-relaxed">
            Give2Eat respects your privacy. This page describes what data we
            collect, how we use it, and your rights. This is a starter template –
            please have a legal professional review before production use.
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
