"use client"; // Tambahkan use client

import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import ProjectDrawer from "@/components/ProjectDrawer";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectsProps {
  dict: any;
  projects: any[];
}

export default function Projects({ dict, projects }: ProjectsProps) {
  // State untuk melacak proyek mana yang sedang dipilih (null = laci tertutup)
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // Inisialisasi Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start", dragFree: true });
  
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="projects" className="scroll-mt-28 relative">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Header Section & Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center md:items-end justify-between mb-12 gap-6"
        >
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3 text-brand-text">
              {dict.title} <span className="text-brand-amber">{dict.accent}</span>.
            </h2>
            <p className="text-brand-text/60 font-medium max-w-md text-lg">
              {dict.subtitle}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              aria-label="Previous Project"
              className="w-12 h-12 rounded-full border border-brand-text/10 flex items-center justify-center text-brand-text/70 hover:bg-brand-text/5 hover:text-brand-amber transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              aria-label="Next Project"
              className="w-12 h-12 rounded-full border border-brand-text/10 flex items-center justify-center text-brand-text/70 hover:bg-brand-text/5 hover:text-brand-amber transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </motion.div>

        {/* Embla Carousel Viewport */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="overflow-hidden -mx-6 px-6" ref={emblaRef}>
            <div className="flex gap-6 pb-8 pt-2">
              {projects.map((project, index) => (
                <div 
                  key={project.slug} 
                  onClick={() => setSelectedProject(project)}
                  className="cursor-pointer flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[450px]" 
                >
                  {/* Kita hapus fungsi klik bawaan link di ProjectCard (jika ada) di langkah 4 */}
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Komponen Laci (Drawer) */}
      <ProjectDrawer 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject} 
        dict={dict.drawer} 
      />
    </section>
  );
}