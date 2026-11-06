"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Briefcase, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import MagneticButton from "@/components/effects/MagneticButton";

// Lazy-load particles so they don't block initial render
const InteractiveParticles = dynamic(
  () => import("@/components/effects/InteractiveParticles"),
  { ssr: false }
);

interface HeroProps {
  dict: {
    greeting: string;
    role: string;
    tagline: string;
    ctaProjects: string;
    ctaContact: string;
  };
}

export default function Hero({ dict }: HeroProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 22 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 22 });

  const rotateX = useTransform(ySpring, [-300, 300], [15, -15]);
  const rotateY = useTransform(xSpring, [-300, 300], [-15, 15]);

  return (
    <section id="home" className="py-12 md:py-20 scroll-mt-28 relative">
      {/* Interactive Particles Background */}
      <InteractiveParticles />

      <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16 relative z-10">

        {/* Kolom Kiri */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-6 text-left"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-brand-text/60">
            {dict.greeting}
          </p>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight text-brand-text">
            Gabe Akasia <span className="text-shimmer">Simanjuntak</span>.
          </h1>

          <p className="text-2xl font-bold text-brand-text/90">
            {dict.role}
          </p>

          <div className="flex gap-5 items-center text-brand-text/60">
            <MagneticButton strength={0.5}>
              <motion.a href="https://github.com/GabeSimanjuntak" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }} className="hover:text-brand-purple transition-colors block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple rounded" title="GitHub">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
              </motion.a>
            </MagneticButton>
            <MagneticButton strength={0.5}>
              <motion.a href="https://www.instagram.com/bbbbaag9" target="_blank" rel="noopener noreferrer" aria-label="Instagram profile" whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }} className="hover:text-brand-pink transition-colors block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink rounded" title="Instagram">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </motion.a>
            </MagneticButton>
            <MagneticButton strength={0.5}>
              <motion.a href="https://www.linkedin.com/in/gabe-simanjuntak" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }} className="hover:text-brand-blue transition-colors block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded" title="LinkedIn">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </motion.a>
            </MagneticButton>
          </div>

          <p className="text-lg text-brand-text/70 max-w-xl font-medium leading-relaxed">
            {dict.tagline}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <MagneticButton strength={0.25}>
              <motion.a href="#projects" whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 px-8 py-3 bg-brand-purple hover:bg-brand-purple/90 text-white font-black rounded-full shadow-md transition-colors text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2">
                <Briefcase className="w-5 h-5" /> {dict.ctaProjects}
              </motion.a>
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <motion.a href="#contact" whileHover={{ y: -3, scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 px-8 py-3 border-2 border-brand-text/10 hover:border-brand-text/20 text-brand-text/80 font-black rounded-full transition-colors text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2">
                <Mail className="w-5 h-5" /> {dict.ctaContact}
              </motion.a>
            </MagneticButton>
          </div>
        </motion.div>

        {/* Kolom Kanan: Kartu Profil Clean & Modern (Tidak Alay) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 flex justify-center md:justify-end"
        >
          <div
            className="relative w-full max-w-sm perspective-1000"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              x.set(e.clientX - (rect.left + rect.width / 2));
              y.set(e.clientY - (rect.top + rect.height / 2));
            }}
            onMouseLeave={() => {
              x.set(0);
              y.set(0);
            }}
          >
            {/* Glow via box-shadow — not affected by overflow clipping */}
            <motion.div
              className="relative aspect-[3/4] w-full max-w-sm rounded-[32px] overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.35),0_0_80px_rgba(99,102,241,0.2)] border border-white/20"
              style={{ rotateX, rotateY }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* PERBAIKAN 1: Hapus 'opacity-80' dan 'mix-blend-overlay' agar foto tampil 100% natural */}
              <Image
                src="/images/hero.webp"
                alt="Gabe Simanjuntak"
                fill
                priority
                className="object-cover"
              />

              {/* PERBAIKAN 2: Ubah gradient overlay menjadi transparan natural (hanya gelap di bawah agar teks putih tetap terbaca) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute top-10 left-10 text-white">
                <h2 className="text-3xl font-black tracking-tight">Gabe Akasia <span className="text-brand-amber">Simanjuntak</span></h2>
                <p className="text-base font-bold text-white/80">Fullstack Developer</p>
              </div>

              {/* Bento Detail Bawah: Glassmorphism elegan, transparan tanpa warna ngejreng */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white p-4 bg-white/10 rounded-full shadow-lg backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/hero2.webp"
                    alt="Foto Profil dftvln"
                    width={40}
                    height={40}
                    className="rounded-full aspect-square border border-white/20 object-cover"
                  />
                  <div>
                    <p className="text-base font-black text-white/90">@bbbbaag9</p>
                    <div className="flex items-center gap-1.5">
                      {/* Titik neon cyan menyala */}
                      <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_10px_2px_rgba(34,211,238,0.8)]" />
                      <p className="text-xs font-bold text-white/90">Online</p>
                    </div>
                  </div>
                </div>
                <a
                  href="#contact"
                  className="px-4 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-black rounded-full transition-colors backdrop-blur-sm"
                >
                  Contact Me
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
