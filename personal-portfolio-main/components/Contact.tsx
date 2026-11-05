"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react"; // Tambah icon Loader & Check

interface ContactProps {
  dict: {
    title: string;
    accent: string;
    subtitle: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    send: string;
  };
}

export default function Contact({ dict }: ContactProps) {
  // State untuk melacak status pengiriman (idle, loading, success, error)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Ganti URL_FORMSPREE_ANDA dengan link asli dari Formspree
      const response = await fetch("https://formspree.io/f/mvkklloj", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json", // Kunci agar Formspree mengembalikan JSON, bukan redirect
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset(); // Kosongkan form setelah sukses
        
        // Kembalikan ke status awal setelah 5 detik agar bisa kirim pesan lagi
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="scroll-mt-14 py-8 md:py-12 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Kolom Kiri: Teks & Info Kontak */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1 space-y-8"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-brand-text mb-4">
                {dict.title} {dict.accent}.
              </h2>
              <p className="text-lg text-brand-text/70 font-medium leading-relaxed">
                {dict.subtitle}
              </p>
            </div>

            {/* Kartu Info Kontak */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0 border border-brand-blue/20">
                  <Mail className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-text/60 uppercase tracking-wide">Email</p>
                  <a href="mailto:gabesimanjuntak102@gmail.com" className="text-lg font-black text-brand-text hover:text-brand-purple transition-colors">
                    gabesimanjuntak102@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-pink/10 flex items-center justify-center shrink-0 border border-brand-pink/20">
                  <MapPin className="w-5 h-5 text-brand-pink" />
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-text/60 uppercase tracking-wide">Lokasi</p>
                  <p className="text-lg font-black text-brand-text">
                    Sumatera Utara, Indonesia
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Kolom Kanan: Formulir Kontak AJAX */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1"
          >
            <div className="bg-white border border-brand-text/10 rounded-[32px] p-8 md:p-10 shadow-lg relative overflow-hidden">
              
              {/* Overlay Pesan Sukses */}
              {status === "success" && (
                <div className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center text-center p-8">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-brand-mint/20 text-brand-mint rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  <h4 className="text-2xl font-black text-brand-text mb-2">Pesan Terkirim!</h4>
                  <p className="text-brand-text/70 font-medium">Terima kasih telah menghubungi. Saya akan segera membalas pesan Anda.</p>
                </div>
              )}

              {/* Formulir */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-brand-text/80 pl-2">
                    {dict.name}
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    name="name" 
                    placeholder={dict.namePlaceholder}
                    disabled={status === "loading"}
                    className="w-full px-5 py-4 bg-brand-text/[0.03] border border-brand-text/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all font-medium text-brand-text placeholder:text-brand-text/30 disabled:opacity-50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-brand-text/80 pl-2">
                    {dict.email}
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder={dict.emailPlaceholder}
                    disabled={status === "loading"}
                    className="w-full px-5 py-4 bg-brand-text/[0.03] border border-brand-text/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all font-medium text-brand-text placeholder:text-brand-text/30 disabled:opacity-50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold text-brand-text/80 pl-2">
                    {dict.message}
                  </label>
                  <textarea 
                    id="message" 
                    name="message"
                    rows={4}
                    placeholder={dict.messagePlaceholder}
                    disabled={status === "loading"}
                    className="w-full px-5 py-4 bg-brand-text/[0.03] border border-brand-text/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all font-medium text-brand-text placeholder:text-brand-text/30 resize-none disabled:opacity-50"
                    required
                  ></textarea>
                </div>

                {/* Pesan Error jika gagal */}
                {status === "error" && (
                  <p className="text-red-500 text-sm font-bold text-center">Gagal mengirim pesan. Silakan coba lagi nanti.</p>
                )}

                {/* Tombol Kirim Dinamis */}
                <button 
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full inline-flex justify-center items-center gap-2 px-8 py-4 bg-brand-text text-white font-black rounded-2xl shadow-md hover:bg-brand-purple hover:shadow-lg hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:bg-brand-text cursor-pointer disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> {dict.send}
                    </>
                  )}
                </button>

              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}