"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Meals Shared", value: "1,250+", color: "text-emerald-400" },
  { label: "Food Waste Saved", value: "480kg", color: "text-sky-400" },
  { label: "Active Donors", value: "85", color: "text-emerald-400" },
  { label: "Communities Served", value: "12", color: "text-sky-400" },
];

export default function ImpactSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.1),_transparent_70%)] pointer-events-none" />
      
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight md:text-5xl"
          >
            Our Community Impact
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 max-w-2xl mx-auto"
          >
            Together, we're building a sustainable future where no good food goes to waste.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10"
            >
              <div className="space-y-2">
                <p className={`text-3xl font-bold md:text-4xl ${stat.color} group-hover:scale-110 transition-transform`}>
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-white/50 group-hover:text-white/80 transition-colors uppercase tracking-widest text-[10px]">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
