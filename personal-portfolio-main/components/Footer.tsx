"use client";

import { motion } from "framer-motion";
import { ArrowUp, Mail, MapPin } from "lucide-react";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const isIndonesian = locale !== "en";
  const links = [
    { id: "home", label: isIndonesian ? "Beranda" : "Home" },
    { id: "about", label: isIndonesian ? "Tentang" : "About" },
    { id: "skills", label: isIndonesian ? "Keahlian" : "Skills" },
    { id: "certificates", label: isIndonesian ? "Sertifikat" : "Certificates" },
    { id: "education", label: isIndonesian ? "Pendidikan" : "Education" },
    { id: "projects", label: isIndonesian ? "Proyek" : "Projects" },
    { id: "contact", label: isIndonesian ? "Kontak" : "Contact" },
  ];

  const socials = [
    { label: "GitHub", href: "https://github.com/GabeSimanjuntak", Icon: GitHubMark },
    { label: "Instagram", href: "https://www.instagram.com/bbbbaag9", Icon: InstagramMark },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/gabe-simanjuntak", Icon: LinkedInMark },
    { label: "Email", href: "mailto:gabesimanjuntak102@gmail.com", Icon: Mail },
  ];

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-brand-text/10 bg-brand-text/[0.045] text-brand-text">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-brand-purple/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-36 left-1/4 h-72 w-72 rounded-full bg-brand-blue/15 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-0 md:px-12 md:pt-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-start">
          <div>
            <a href="#home" aria-label={isIndonesian ? "Kembali ke beranda" : "Back to home"} className="inline-flex items-center text-2xl font-black tracking-tight text-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple rounded">
              GAS<span className="text-brand-pink">.</span>
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-brand-text/60">
              Gabe Akasia Simanjuntak · Fullstack Developer
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  title={label}
                  whileHover={{ y: -3, scale: 1.06 }}
                  whileTap={{ scale: 0.93 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-text/10 bg-brand-text/5 text-brand-text/75 transition-colors hover:border-brand-purple/40 hover:bg-brand-purple hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="hidden h-full min-h-32 w-px bg-brand-text/10 lg:block" />

          <div className="flex flex-col gap-7 sm:flex-row sm:justify-between lg:gap-12">
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-text/45">
                {isIndonesian ? "Jelajahi" : "Explore"}
              </h3>
              <nav aria-label={isIndonesian ? "Navigasi footer" : "Footer navigation"} className="mt-4 flex max-w-sm flex-wrap gap-2">
                {links.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className="rounded-full border border-brand-text/10 bg-brand-text/[0.03] px-3 py-1.5 text-xs font-bold text-brand-text/75 transition-colors hover:border-brand-purple/40 hover:bg-brand-purple/10 hover:text-brand-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="min-w-48">
              <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-text/45">
                {isIndonesian ? "Temukan saya" : "Find me"}
              </h3>
              <a href="mailto:gabesimanjuntak102@gmail.com" className="mt-4 inline-flex items-start gap-2 text-sm font-bold text-brand-text/85 transition-colors hover:text-brand-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple rounded">
                <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-purple" />
                <span className="break-all">gabesimanjuntak102@gmail.com</span>
              </a>
              <p className="mt-3 flex items-start gap-2 text-sm text-brand-text/65">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-pink" />
                {isIndonesian ? "Sumatera Utara, Indonesia" : "North Sumatra, Indonesia"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 border-b border-brand-text/10 pt-5 pb-5">
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label={isIndonesian ? "Kembali ke atas" : "Back to top"}
            title={isIndonesian ? "Kembali ke atas" : "Back to top"}
            whileHover={{ y: -3, scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-text/5 text-brand-text transition-colors hover:bg-brand-purple hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
          >
            <ArrowUp aria-hidden="true" className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.51-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.61 1.21 3.25.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.12-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.3-2.62 5.25-5.11 5.53.4.35.76 1.03.76 2.08v3.07c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function InstagramMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}
