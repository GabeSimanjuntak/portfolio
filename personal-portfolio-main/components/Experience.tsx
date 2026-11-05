"use client";

import { motion } from "framer-motion";
import { Award, CalendarDays, UsersRound } from "lucide-react";

interface CampusExperienceItem {
  number: string;
  context: string;
  type: "achievement" | "committee";
  category: string;
  title: string;
  period: string;
  description: string;
}

interface ExperienceProps {
  dict: {
    title: string;
    accent: string;
    subtitle: string;
    list: CampusExperienceItem[];
  };
}

export default function Experience({ dict }: ExperienceProps) {
  return (
    <section id="experience" className="scroll-mt-14 py-8 md:py-12 relative">
      <div className="max-w-5xl mx-auto md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-brand-text">
            {dict.title} <span className="text-brand-purple">{dict.accent}</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg font-medium leading-relaxed text-brand-text/60">
            {dict.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {dict.list.map((item, index) => {
            const Icon = item.type === "achievement" ? Award : UsersRound;
            const isAchievement = item.type === "achievement";

            return (
              <motion.article
                key={item.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-[28px] border border-brand-text/10 bg-white p-6 md:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-purple/25 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

                <div className="relative z-10 flex items-start justify-between gap-4 mb-7">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="shrink-0 text-sm font-black tracking-widest text-brand-purple">{item.number}</span>
                    <span className="h-px w-5 shrink-0 bg-brand-text/20" />
                    <p className="truncate text-xs md:text-sm font-bold text-brand-text/55">{item.context}</p>
                  </div>
                  <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold ${isAchievement ? "bg-brand-amber/10 text-amber-700" : "bg-brand-blue/10 text-brand-blue"}`}>
                    <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                    {item.category}
                  </span>
                </div>

                <h3 className="relative z-10 mb-4 text-2xl md:text-[1.7rem] font-black leading-tight tracking-tight text-brand-text">
                  {item.title}
                </h3>

                <div className="relative z-10 mb-4 flex items-center gap-2 text-sm font-bold text-brand-text/55">
                  <CalendarDays aria-hidden="true" className="h-4 w-4 text-brand-purple/70" />
                  <span>{item.period}</span>
                </div>

                <p className="relative z-10 text-sm md:text-base font-medium leading-relaxed text-brand-text/70">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}