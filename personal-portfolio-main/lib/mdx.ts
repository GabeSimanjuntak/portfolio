import fs from "fs";
import path from "path";

// Definisikan tipe data struktur proyek yang baku
export interface Project {
  slug: string;
  meta: {
    title?: string;
    description?: string;
    tech?: string[];
    color?: string;
    liveUrl?: string;
    githubUrl?: string;
    image?: string;
  };
  content: string;
}

// Fungsi ringan untuk membedah Frontmatter MDX secara native tanpa 'gray-matter'
function parseMDX(fileContent: string) {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: fileContent };
  }

  const frontmatterBlock = match[1];
  const content = match[2].trim();
  const data: Record<string, any> = {};

  // Bedah baris demi baris teks di dalam blok ---
  frontmatterBlock.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) return;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Bersihkan tanda kutip pembungkus teks jika ada
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Deteksi dan ubah teks array menjadi array asli (untuk properti tech stack)
    if (value.startsWith("[") && value.endsWith("]")) {
      try {
        const validJson = value.replace(/'/g, '"');
        data[key] = JSON.parse(validJson);
      } catch (e) {
        data[key] = value
          .slice(1, -1)
          .split(",")
          .map((v) => v.trim().replace(/['"]/g, ""));
      }
      return;
    }

    data[key] = value;
  });

  return { data, content };
}

export function getAllProjects(locale: string = "id"): Project[] {
  const contentDirectory = path.join(process.cwd(), "content", locale);

  // Amankan sistem jika folder bahasa belum terbentuk
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);

  const projects = files
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(".mdx", "");
      const filePath = path.join(contentDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");

      // Eksekusi fungsi pembongkar mdx buatan sendiri
      const { data, content } = parseMDX(fileContent);

      return {
        slug,
        meta: data,
        content,
      };
    });

  return projects;
}

export function getProjectSlugs(locale: string = "id"): string[] {
  const contentDirectory = path.join(process.cwd(), "content", locale);

  // Amankan jika folder locale belum dibuat
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  // Baca folder dan kembalikan nama file tanpa ekstensi .mdx
  return fs
    .readdirSync(contentDirectory)
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => filename.replace(".mdx", ""));
}

export function getProjectBySlug(
  slug: string,
  locale: string = "id"
): Project | null {
  const filePath = path.join(process.cwd(), "content", locale, `${slug}.mdx`);

  // Antisipasi jika file .mdx tidak ditemukan agar web tidak crash
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");

  // Gunakan fungsi parseMDX native buatan kita kemarin
  const { data, content } = parseMDX(fileContent);

  return {
    slug,
    meta: data,
    content,
  };
}
