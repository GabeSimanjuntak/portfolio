"use client";

import { motion } from "framer-motion";
import { CalendarDays, ExternalLink, GraduationCap } from "lucide-react";

interface EducationItem {
  institution: string;
  category: string;
  period: string;
  description: string;
  instagramLabel: string;
  instagramUrl: string;
  logo: string;
  logoAlt: string;
}

interface EducationProps {
  dict: {
    title: string;
    accent: string;
    subtitle: string;
    list: EducationItem[];
  };
}

export default function Education({ dict }: EducationProps) {
  return (
    <section id="education" className="scroll-mt-14 py-8 md:py-12 relative">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-brand-text">
            {dict.title} <span className="text-brand-purple">{dict.accent}</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg font-medium leading-relaxed text-brand-text/60">
            {dict.subtitle}
          </p>
        </div>

        <div className="relative flex flex-col gap-5 lg:gap-8">
          <div className="absolute bottom-0 left-4 top-0 w-[3px] rounded-full bg-gradient-to-b from-transparent via-brand-purple/35 to-transparent lg:left-1/2 lg:-translate-x-1/2" />
          {dict.list.map((item, index) => (
            <div key={item.institution} className="group/education relative grid grid-cols-[2rem_minmax(0,1fr)] items-stretch gap-x-3 lg:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] lg:gap-x-0">
              <div className="relative z-10 col-start-1 row-start-1 flex items-center justify-center lg:col-start-2">
                <span className="h-3 w-3 rounded-full border-2 border-brand-purple bg-brand-bg shadow-[0_0_0_5px_var(--color-brand-bg)] transition-all duration-300 group-hover/education:scale-150 group-hover/education:bg-brand-purple" />
              </div>

              <motion.a
                href={item.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.instagramLabel}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.99 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`group relative z-10 col-start-2 row-start-1 cursor-pointer overflow-hidden rounded-[30px] border border-brand-text/10 bg-white p-5 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-brand-purple/40 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple md:p-7 lg:col-span-1 ${index % 2 === 0 ? "lg:col-start-1" : "lg:col-start-3"}`}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-purple/10 via-transparent to-brand-blue/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <ExternalLink aria-hidden="true" className="absolute right-5 top-5 z-20 h-4 w-4 -translate-y-1 text-brand-purple opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />

                <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center self-center overflow-hidden rounded-3xl border border-brand-text/10 bg-white p-3 shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1 sm:h-32 sm:w-32 sm:self-auto">
                    <img src={item.logo} alt={item.logoAlt} className="h-full w-full object-contain" />
                  </div>

                  <div className="min-w-0 flex-1 text-center sm:text-left">
                    <div className="mb-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-purple/10 px-3 py-1.5 text-xs font-extrabold text-brand-purple">
                        <GraduationCap aria-hidden="true" className="h-3.5 w-3.5" />
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-black leading-tight tracking-tight text-brand-text md:text-2xl">
                      {item.institution}
                    </h3>

                    <div className="mt-3 flex items-center justify-center gap-2 text-sm font-bold text-brand-text/55 sm:justify-start">
                      <CalendarDays aria-hidden="true" className="h-4 w-4 text-brand-purple/75" />
                      <span>{item.period}</span>
                    </div>

                    <p className="mt-3 text-sm font-medium leading-relaxed text-brand-text/70">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
