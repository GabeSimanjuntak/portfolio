"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";

interface CertificatesProps {
  dict: {
    title: string;
    accent: string;
  };
}

const certificates = [
  { id: 15, alt: "Oracle AI Database Certified Foundations Associate", img: "/images/certificate/oracle-ai-database-foundations-associate.jpg" },
  { id: 16, alt: "Agentic AI Certified Foundations Associate", img: "/images/certificate/agentic-ai-foundations-associate.jpg" },
  { id: 17, alt: "Oracle Cloud Infrastructure Certified AI Foundations Associate", img: "/images/certificate/oracle-cloud-infrastructure-ai-foundations-associate.jpg" },
  { id: 1, alt: "Certificate 1", img: "images/certificate/Starting Programming with Python.png" },
  { id: 2, alt: "Certificate 2", img: "images/certificate/Starting Programming with C.png" },
  { id: 3, alt: "Certificate 3", img: "images/certificate/Scientific Computing with Python.png" },
  { id: 4, alt: "Certificate 4", img: "images/certificate/Responsive Web Design.png" },
  { id: 5, alt: "Certificate 5", img: "images/certificate/Legacy JavaScript Algorithms and Data Structures.png" },
  { id: 6, alt: "Certificate 6", img: "images/certificate/Learning the Basics of Web Programming.png" },
  { id: 7, alt: "Certificate 7", img: "images/certificate/Learning Data Science Applications with Microsoft Fabric.png" },
  { id: 8, alt: "Certificate 8", img: "images/certificate/Learn the Basics of HTML and CSS.jpg" },
  { id: 9, alt: "Certificate 9", img: "images/certificate/HTML Essentials.jpg" },
  { id: 10, alt: "Certificate 10", img: "images/certificate/Data Science & Analytics.jpg" },
  { id: 11, alt: "Certificate 11", img: "images/certificate/Building Gen AI Applications with Microsoft Azure.png" },
  { id: 12, alt: "Certificate 12", img: "images/certificate/Automation Webiner.png" },
  { id: 13, alt: "Certificate 12", img: "images/certificate/AI Foundation.png" },
  { id: 14, alt: "Certificate 12", img: "images/certificate/AI for Beginners.jpg" },
  { id: 18, alt: "ReWork AI Engineering Fundamentals Mini Course", img: "/images/certificate/rework-ai-engineering-fundamentals.jpg" },
  { id: 19, alt: "Saylor University CS302 Software Engineering", img: "/images/certificate/saylor-cs302-software-engineering.jpg" },
];

export default function Certificates({ dict }: CertificatesProps) {
  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(1);
  const [selectedCert, setSelectedCert] = useState<number | null>(null);
  const totalPages = Math.ceil(certificates.length / ITEMS_PER_PAGE);

  const currentCertificates = certificates.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <section id="certificates" className="scroll-mt-14 py-12 md:py-20 relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Badge Judul */}
        <div className="text-center mb-12 md:mb-16">
          
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-brand-text">
            {dict.title} <span className="text-brand-mint">{dict.accent}</span>.
          </h2>
        </div>

        {/* Grid Sertifikat */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {currentCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.07,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="group cursor-pointer"
                onClick={() => setSelectedCert(cert.id)}
              >
                <div className="relative rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-brand-mint/30 transition-all duration-300">
                  {/* Sertifikat Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-brand-text/5 to-brand-mint/5">
                    <img
                      src={cert.img}
                      alt={cert.alt}
                      className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Hover Effect - Sedikit overlay gelap */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="group relative w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border-2 border-brand-mint/30 text-brand-mint hover:bg-brand-mint hover:text-white hover:border-brand-mint transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-brand-mint disabled:hover:border-brand-mint/30 shadow-lg shadow-brand-mint/10 hover:shadow-brand-mint/30 flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-x-0.5" />
          </motion.button>

          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-brand-mint/20 shadow-inner">
            <span className="text-sm font-bold text-brand-mint">
              {String(page).padStart(2, '0')}
            </span>
            <span className="text-brand-text/30 font-light">/</span>
            <span className="text-sm font-medium text-brand-text/50">
              {String(totalPages).padStart(2, '0')}
            </span>
            
            <div className="flex gap-1.5 ml-3 pl-3 border-l border-brand-text/10">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i + 1 === page
                      ? 'w-6 bg-brand-mint shadow-lg shadow-brand-mint/30'
                      : 'w-2 bg-brand-text/20 hover:bg-brand-text/40'
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="group relative w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border-2 border-brand-mint/30 text-brand-mint hover:bg-brand-mint hover:text-white hover:border-brand-mint transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-brand-mint disabled:hover:border-brand-mint/30 shadow-lg shadow-brand-mint/10 hover:shadow-brand-mint/30 flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-0.5" />
          </motion.button>
        </div>
      </div>

      {/* Modal Preview */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={certificates.find(c => c.id === selectedCert)?.img}
                alt="Preview Sertifikat"
                className="w-full h-auto"
              />
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all hover:scale-110 text-2xl"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}