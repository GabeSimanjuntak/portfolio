import Hero from "@/components/Hero"; 
import { getAllProjects } from "@/lib/mdx";
import ProjectCard from "@/components/ProjectCard";
import { getDictionary } from "@/lib/dictionary";

// Gunakan 'any' pada params agar aman & kompatibel di Next.js 14 maupun Next.js 15
export default async function Home({ params }: { params: any }) {
  // Trik universal: await tetap aman digunakan walaupun params ternyata objek sync
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || "id";
  
  // Ambil data bahasa dan cast sebagai 'any' agar TypeScript tidak protes saat membaca properti JSON
  const dict = (await getDictionary(locale)) as any;
  const projects = getAllProjects(locale);

  return (
    <div className="space-y-28 pb-20">
      {/* Pastikan objek dict.hero tersedia sebelum di-render */}
      {dict?.hero && <Hero dict={dict.hero} />}

      {/* Section Daftar Proyek */}
      <section id="projects" className="scroll-mt-28">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3 text-brand-text">
            {dict?.projects?.title} <span className="text-brand-purple">{dict?.projects?.accent}</span>.
          </h2>
          <p className="text-brand-text/60 font-medium max-w-md mx-auto text-lg">
            {dict?.projects?.subtitle}
          </p>
        </div>

        {/* Grid Proyek Terlokalisasi */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.slug} 
              project={project as any} // Cast sebagai 'any' untuk meredam perbedaan tipe data internal komponen
              index={index} 
            />
          ))}
        </div>
      </section>

      {/* Section Kontak */}
      <section id="contact" className="min-h-[30vh] flex flex-col items-center justify-center text-center pb-20 scroll-mt-28">
          <h3 className="text-2xl font-bold text-brand-text/70 mb-4">
            {locale === "id" ? "Ingin berkolaborasi?" : "Interested in collaborating?"}
          </h3>
          <p className="text-lg text-brand-text/50 font-medium max-w-lg">
            {locale === "id" ? "Section kontak sedang dalam pengembangan." : "The contact section is currently under development."}
          </p>
      </section>
    </div>
  );
}