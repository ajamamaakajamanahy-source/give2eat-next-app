"use client";

import React from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter";
import ScrollReveal from "@/components/ScrollReveal";
import TiltCard from "@/components/TiltCard";

const stats = [
  { label: "Meals Shared", value: 1250, suffix: "+", color: "text-emerald-400", borderColor: "hover:border-emerald-500/30" },
  { label: "Food Waste Saved", value: 480, suffix: "kg", color: "text-sky-400", borderColor: "hover:border-sky-500/30" },
  { label: "Active Donors", value: 85, suffix: "", color: "text-emerald-400", borderColor: "hover:border-emerald-500/30" },
  { label: "Communities Served", value: 12, suffix: "", color: "text-sky-400", borderColor: "hover:border-sky-500/30" },
];

export default function ImpactSection() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/5 rounded-full blur-[200px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 relative">
        <div className="text-center mb-20 space-y-6">
          <ScrollReveal>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400/50">Impact Metrics</span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Our Community Impact
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-white/40 max-w-2xl mx-auto text-lg">
              Together, we&apos;re building a sustainable future where no good food goes to waste.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <TiltCard
                className={`rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 text-center backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-500 ${stat.borderColor}`}
                tiltAmount={12}
              >
                <div className="space-y-3">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    className={`text-3xl font-bold md:text-4xl ${stat.color} inline-block`}
                    duration={2.5}
                  />
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                    {stat.label}
                  </p>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
