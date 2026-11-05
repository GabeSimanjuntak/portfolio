"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Image from "next/image";

interface AboutProps {
  dict: {
    sectionTitle: string;
    greeting: string;
    name: string;
    role: string;
    bio: string;
    downloadCv: string;
  };
}

export default function About({ dict }: AboutProps) {
  return (
    <section id="about" className="scroll-mt-14 py-8 md:py-12 ">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 max-w-5xl mx-auto px-6">
        {/* KOLOM KIRI: Image Container (stacks vertically on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-xs md:max-w-sm shrink-0"
        >
          {/* Aksen Background Solid */}
          <div className="absolute inset-0 bg-brand-amber/15 rounded-[32px] transform translate-x-4 translate-y-4 -rotate-3" />

          {/* Frame Foto Utama */}
          <div className="relative aspect-[4/5] bg-white rounded-[32px] shadow-xl border border-brand-text/5 overflow-hidden z-10">
            <Image
              src="/images/about.jpg"
              alt="Profil"
              fill
              sizes="(max-width: 768px) 100vw, 384px"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>

        {/* KOLOM KANAN: Text Container (stacks vertically on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 space-y-6"
        >
          {/* Sapaan dengan Aksen Solid Color (Tetap menggunakan Flexbox responsif) */}
          <h2 className="flex flex-col items-start gap-3 md:gap-4 text-3xl md:text-4xl font-black text-brand-text uppercase">
            {/* Baris 1: Sapaan & Nama */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
              <span>{dict.greeting}</span>
              <span className="bg-brand-blue text-white px-3 py-1 rounded-xl whitespace-nowrap -rotate-1 shadow-sm">
                {dict.name}
              </span>
            </div>

            {/* Baris 2: Role */}
            <span className="bg-brand-mint text-brand-text px-3 py-1 rounded-xl whitespace-nowrap rotate-1 shadow-sm">
              {dict.role}
            </span>
          </h2>

          {/* Bio Container (fix for missing left border on mobile) */}
          {/* Kita gunakan class 'border-l-4' tanpa media query agar garis ungu selalu tampil */}
          {/* Namun kita kurangi padding kiri (pl-4) dan margin vertikal (my-4) khusus mobile */}
          <div className="border-l-4 border-brand-purple pl-4 md:pl-6 py-1.5 md:py-2 my-4 md:my-6">
            <p className="text-lg whitespace-pre-line text-brand-text/70 font-medium leading-relaxed">
              {dict.bio}
            </p>
          </div>

          {/* Tombol Container */}
          <div className="pt-2">
            <a
              href="/CV-DeftValianExanova.pdf"
              download="CV-DeftValianExanova.pdf"
              // fix for button clipping: make horizontal padding responsive (px-6 -> px-8)
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-3.5 bg-brand-text text-white font-black rounded-full shadow-md hover:bg-brand-purple hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <Download className="w-5 h-5" /> {dict.downloadCv}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
