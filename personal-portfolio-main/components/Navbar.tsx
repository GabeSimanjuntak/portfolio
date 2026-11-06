"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Home, User, GraduationCap, Folder, Mail, Globe, Moon, Sun, Award } from "lucide-react";
import { Locale } from "@/lib/dictionary";

interface NavbarProps {
  locale: Locale;
}

export default function Navbar({ locale }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const router = useRouter();
  
  const isClickScrolling = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const initialTheme = savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    document.documentElement.dataset.theme = initialTheme;
    setTheme(initialTheme);
  }, []);

  const handleThemeToggle = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
    setTheme(nextTheme);
  };
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (isClickScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "-20% 0px -50% 0px", 
      threshold: 0.1,
    });

    // PERBAIKAN 1: Tambahkan "contact" ke dalam array untuk deteksi scroll
    const sections = ["home", "about", "education", "certificates", "projects", "contact"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const targetLocale = window.sessionStorage.getItem("portfolio-scroll-locale");
    const targetSection = window.sessionStorage.getItem("portfolio-scroll-section");
    if (targetLocale !== locale || !targetSection) return;

    window.sessionStorage.removeItem("portfolio-scroll-locale");
    window.sessionStorage.removeItem("portfolio-scroll-section");
    setActiveSection(targetSection);

    requestAnimationFrame(() => {
      document.getElementById(targetSection)?.scrollIntoView({ block: "start", behavior: "auto" });
    });
  }, [locale]);
  const handleLanguageToggle = () => {
    const nextLocale = locale === "id" ? "en" : "id";
    window.sessionStorage.setItem("portfolio-scroll-locale", nextLocale);
    window.sessionStorage.setItem("portfolio-scroll-section", activeSection);
    const pathname = window.location.pathname;
    const localizedPath = /^\/(id|en)(?=\/|$)/.test(pathname)
      ? pathname.replace(/^\/(id|en)(?=\/|$)/, `/${nextLocale}`)
      : `/${nextLocale}${pathname}`;

    router.push(`${localizedPath}${window.location.search}${window.location.hash}`, { scroll: false });
  };

  const handleNavLinkClick = (id: string) => {
    setActiveSection(id);
    isClickScrolling.current = true;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000);
  };

  // PERBAIKAN 2: Tambahkan objek menu Kontak di baris terakhir
  const menuItems = [
    { id: "home", name: locale === "id" ? "Beranda" : "Home", path: "#home", icon: Home, color: "bg-brand-blue" },
    { id: "about", name: locale === "id" ? "Tentang" : "About", path: "#about", icon: User, color: "bg-brand-pink" },
    { id: "certificates", name: locale === "id" ? "Sertifikat" : "Certificates", path: "#certificates", icon: Award, color: "bg-brand-mint" },
    { id: "education", name: locale === "id" ? "Pendidikan" : "Education", path: "#education", icon: GraduationCap, color: "bg-brand-purple" },
    { id: "projects", name: locale === "id" ? "Proyek" : "Projects", path: "#projects", icon: Folder, color: "bg-brand-amber" },
    { id: "contact", name: locale === "id" ? "Kontak" : "Contact", path: "#contact", icon: Mail, color: "bg-brand-purple" },
  ];

  return (
    <header className="fixed bottom-4 md:top-4 md:bottom-auto inset-x-0 z-50 flex justify-center px-4 transition-all duration-300">
      <nav className="flex items-center gap-1 md:gap-2 bg-white/80 backdrop-blur-md border-2 border-brand-text/10 px-2 md:px-4 py-2 rounded-full shadow-lg">
        
        {/* Logo */}
        <span
          aria-label="GAS"
          className="font-black text-lg md:text-xl tracking-tighter px-2 text-brand-text select-none"
        >
          GAS<span className="text-brand-pink">.</span>
        </span>

        <div className="h-5 md:h-6 w-[1px] bg-brand-text/10 mx-1" />

        {/* Menu Navigasi */}
        {menuItems.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;
          const activeTextColor = item.id === "certificates" || item.id === "projects" ? "text-slate-950" : "text-white";

          return (
            <motion.a 
              key={item.id} 
              href={item.path} 
              onClick={() => handleNavLinkClick(item.id)} 
              aria-current={isActive ? "location" : undefined}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="relative px-3 md:px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-colors text-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
              title={item.name}
            >
              {isActive && (
                <motion.span 
                  layoutId="activeNav" 
                  className={`absolute inset-0 rounded-full ${item.color} -z-10`} 
                  transition={{ type: "spring", stiffness: 380, damping: 30 }} 
                />
              )}
              <Icon className={`w-4 h-4 md:w-4 md:h-4 ${isActive ? activeTextColor : "text-brand-text"}`} />
              
              <span className={`hidden lg:block ${isActive ? activeTextColor : "hover:text-brand-purple transition-colors"}`}>
                {item.name}
              </span>
            </motion.a>
          );
        })}

        <div className="h-5 md:h-6 w-[1px] bg-brand-text/10 mx-1" />

        {/* Language Switcher */}
        <motion.button 
          onClick={handleLanguageToggle}
          aria-label={locale === "id" ? "Switch language to English" : "Ganti bahasa ke Indonesia"}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.94 }}
          className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 border border-brand-text/10 rounded-full text-xs font-black bg-brand-text/5 hover:bg-brand-text/10 text-brand-text transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
        >
          <Globe className="w-3.5 h-3.5 text-brand-text/70" />
          <span>{locale.toUpperCase()}</span>
        </motion.button>
        <motion.button
          type="button"
          onClick={handleThemeToggle}
          aria-label={theme === "dark" ? (locale === "id" ? "Aktifkan tema terang" : "Switch to light theme") : (locale === "id" ? "Aktifkan tema gelap" : "Switch to dark theme")}
          title={theme === "dark" ? (locale === "id" ? "Tema terang" : "Light theme") : (locale === "id" ? "Tema gelap" : "Dark theme")}
          whileHover={{ rotate: theme === "dark" ? 25 : -15, scale: 1.06 }}
          whileTap={{ scale: 0.9 }}
          className="ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-text/10 bg-brand-text/5 text-brand-text transition hover:bg-brand-text/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
        >
          {theme === "dark" ? <Sun aria-hidden="true" className="h-4 w-4" /> : <Moon aria-hidden="true" className="h-4 w-4" />}
        </motion.button>
      </nav>
    </header>
  );
}
