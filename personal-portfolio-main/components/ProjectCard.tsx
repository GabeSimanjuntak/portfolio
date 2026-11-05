"use client";

import { motion } from "framer-motion";

// Fungsi pemetaan Tag ke URL Logo Devicon
const getTechIcon = (tag: string) => {
  const icons: Record<string, string> = {
    Laravel:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
    ReactJS:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    "Tailwind CSS":
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    MySQL:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    PostgreSQL:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    Nextjs:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    Typescript:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    Figma:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    WordPress:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg",
    PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
    Bootstrap:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
    Flutter:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
    HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    JS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    Dart: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg",
  };
  return icons[tag]; // Mengembalikan URL logo jika ada, jika tidak ada akan mengembalikan undefined
};

interface ProjectCardProps {
  project: any;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const data = project?.frontmatter || project?.meta || project || {};

  const title = data.title || "Proyek Tanpa Judul";
  const description = data.description || "";
  const image =
    data.image ||
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop";
  const tags = data.tags || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-full"
    >
      <div className="bg-white border border-brand-text/10 rounded-[32px] overflow-hidden group hover:shadow-xl hover:border-brand-amber/30 transition-all duration-300 hover:-translate-y-1.5 transform-gpu h-full flex flex-col">
        <div className="relative aspect-video w-full bg-brand-text/5 overflow-hidden border-b border-brand-text/5">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-brand-text/0 group-hover:bg-brand-amber/5 transition-colors duration-300 pointer-events-none" />
        </div>

        <div className="p-6 md:p-8 flex flex-col flex-1">
          <h4 className="text-2xl font-black text-brand-text mb-3 group-hover:text-brand-amber transition-colors duration-300 line-clamp-1">
            {title}
          </h4>

          <p className="text-brand-text/70 font-medium leading-relaxed mb-6 line-clamp-2 flex-1">
            {description}
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto pt-5 border-t border-brand-text/5">
              {tags.slice(0, 3).map((tag: string, i: number) => (
                // UPDATE: Desain Pill Baru dengan Logo
                <span
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-text/5 text-brand-text/80 text-xs font-bold rounded-full border border-brand-text/5 transition-colors group-hover:bg-white group-hover:shadow-sm group-hover:border-brand-text/10"
                >
                  {/* Cek apakah logonya ada di fungsi mapping kita */}
                  {getTechIcon(tag) && (
                    <img
                      src={getTechIcon(tag)}
                      alt={tag}
                      className="w-3.5 h-3.5 object-contain"
                    />
                  )}
                  {tag}
                </span>
              ))}

              {tags.length > 3 && (
                <span className="flex items-center px-3 py-1.5 bg-brand-text/5 text-brand-text/50 text-xs font-bold rounded-full border border-brand-text/5">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
