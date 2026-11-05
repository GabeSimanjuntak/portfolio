import { getAllProjects } from "@/lib/mdx";
import ProjectCard from "@/components/ProjectCard";

// Ini adalah Server Component (bisa membaca fs secara aman saat build/rendering)
export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="py-10">
      <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
        Koleksi <span className="text-brand-purple">Proyek</span>
      </h1>
      <p className="text-brand-text/60 font-medium mb-10">
        Beberapa aplikasi dan sistem yang pernah saya rancang dan bangun.
      </p>

      {/* Grid untuk menampilkan kartu proyek */}
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.slug} 
            project={project} 
            index={index} 
          />
        ))}
      </div>
    </div>
  );
}