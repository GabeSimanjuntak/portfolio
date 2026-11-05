"use client";

import React from "react";
import { motion } from "framer-motion";

interface SkillsProps {
  dict: {
    title: string;
    accent: string;
  };
}

const topRowSkills = [
  { name: "Laravel", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
  { name: "ReactJS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Tailwind CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "PostgreSQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "Flutter", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
  { name: "Dart", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg" },
];

const bottomRowSkills = [
  { name: "PHP", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "MySQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "TypeScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "Bootstrap", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
  { name: "REST API", img: "/images/skills/rest-api.svg" },
];

export default function Skills({ dict }: SkillsProps) {
  const multipliedTop = [...topRowSkills, ...topRowSkills, ...topRowSkills, ...topRowSkills];
  const multipliedBottom = [...bottomRowSkills, ...bottomRowSkills, ...bottomRowSkills, ...bottomRowSkills];

  return (
    <section id="skills" className="py-10 overflow-hidden relative">
      
      {/* PERBAIKAN 1: Judul besar dan tebal, persis seperti section Projects */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16 relative z-20"
      >
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-brand-text">
          {dict.title} <span className="text-brand-pink">{dict.accent}</span>.
        </h2>
      </motion.div>

      <div className="flex flex-col gap-6 md:gap-8 relative">
        
        {/* Gradient Blur di Kiri dan Kanan */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-brand-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-brand-bg to-transparent z-10 pointer-events-none" />

        {/* Baris 1: Jalan ke Kiri */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex w-max animate-scroll pause-on-hover py-4"
        >
          <div className="flex gap-4 md:gap-6 pr-4 md:pr-6">
            {multipliedTop.map((skill, index) => (
              <SkillCard key={`top-1-${index}`} skill={skill} />
            ))}
          </div>
          <div className="flex gap-4 md:gap-6 pr-4 md:pr-6">
            {multipliedTop.map((skill, index) => (
              <SkillCard key={`top-2-${index}`} skill={skill} />
            ))}
          </div>
        </motion.div>

        {/* Baris 2: Jalan ke Kanan (Reverse) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex w-max animate-scroll-reverse pause-on-hover py-4"
        >
          <div className="flex gap-4 md:gap-6 pr-4 md:pr-6">
            {multipliedBottom.map((skill, index) => (
              <SkillCard key={`bottom-1-${index}`} skill={skill} />
            ))}
          </div>
          <div className="flex gap-4 md:gap-6 pr-4 md:pr-6">
            {multipliedBottom.map((skill, index) => (
              <SkillCard key={`bottom-2-${index}`} skill={skill} />
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
        @keyframes scroll-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll-reverse {
          animation: scroll-reverse 40s linear infinite;
        }
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}</style>

    </section>
  );
}

// Komponen Card dengan Hover Interaktif Baru
function SkillCard({ skill }: { skill: { name: string; img: string } }) {
  return (
    <div className="group flex items-center gap-3 md:gap-4 px-6 md:px-8 py-4 md:py-5 bg-white/60 backdrop-blur-md border border-brand-text/10 rounded-[24px] shadow-sm hover:shadow-xl hover:scale-110 hover:-translate-y-2 hover:border-brand-purple/30 hover:bg-white transition-all duration-300 cursor-pointer">
      
      {/* PERBAIKAN 2: Grayscale dihapus, warna asli selalu tampil */}
      <img 
        src={skill.img} 
        alt={skill.name} 
        className="w-6 h-6 md:w-8 md:h-8 object-contain drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300" 
      />
      
      {/* PERBAIKAN 3: Teks berubah warna saat di-hover */}
      <span className="font-bold text-brand-text group-hover:text-brand-purple text-base md:text-lg whitespace-nowrap transition-colors duration-300">
        {skill.name}
      </span>
      
    </div>
  );
}