import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["id", "en"];
const defaultLocale = "id";

// Fungsi native untuk mendeteksi bahasa browser tanpa eksternal library
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  // Membaca string header browser, contoh: "en-US,en;q=0.9,id;q=0.8"
  const detectedLocale = acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].trim().toLowerCase())
    .find((lang) => lang.startsWith("id") || lang.startsWith("en"));

  // Jika browser dominan bahasa Inggris, arahkan ke 'en'
  if (detectedLocale?.startsWith("en")) return "en";

  // Default kembali ke bahasa Indonesia
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Cek apakah URL sudah memiliki locale (/id atau /en)
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Jika belum ada locale di URL, lakukan redirect otomatis
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)
    );
  }
}

export const config = {
  // Amankan folder statis dari incaran middleware
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|projects|images|content|music|CV-DeftValianExanova.pdf).*)",
  ],
};
