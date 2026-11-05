import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import ClientEffects from "@/components/effects/ClientEffects";
import { Locale } from "@/lib/dictionary";
import MusicPlayer from "@/components/MusicPlayer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://deftvalian.vercel.app"),
  title: {
    default: "Gabe Akasia Simanjuntak | Fullstack Developer",
    template: "%s | Gabe Akasia Simanjuntak",
  },
  description:
    "Website portofolio personal Fullstack Developer yang colorful dan interaktif.",
  openGraph: {
    title: "Gabe Akasia Simanjuntak | Fullstack Developer",
    description: "Portofolio interaktif dan modern dari seorang Fullstack Developer.",
    url: "/",
    siteName: "Gabe Akasia Simanjuntak",
    images: [
      {
        url: "/images/hero.webp",
        width: 1200,
        height: 630,
        alt: "Gabe Akasia Simanjuntak Portfolio Thumbnail",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabe Akasia Simanjuntak | Fullstack Developer",
    description: "Portofolio interaktif dan modern dari seorang Fullstack Developer.",
    images: ["/images/hero.webp"],
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // 1. PERUBAHAN DISINI: 'Locale' diganti jadi 'string' agar Next.js tidak marah
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body
        className={`${plusJakartaSans.className} bg-brand-bg text-brand-text antialiased selection:bg-brand-pink selection:text-white `}
      >
        <Preloader />
        <ClientEffects />

        {/* 2. PERUBAHAN DISINI: Tambahkan 'as Locale' agar komponen Navbar tetap aman */}
        <Navbar locale={locale as Locale} />
        <MusicPlayer />

        <main className="pt-14 min-h-screen px-6 md:px-12 max-w-6xl mx-auto w-full overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
