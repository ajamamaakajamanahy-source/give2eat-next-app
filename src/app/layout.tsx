import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import ClientLayout from "@/components/ClientLayout";
import { createClient } from "@/utils/supabase/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Give2Eat – Reduce Food Waste",
  description:
    "Give2Eat connects donors and receivers to reduce food waste through safe, real-time food sharing.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session = null;

  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
  const anonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();
  const isConfigured = url.startsWith("https://") && !url.includes("your-project-url") && !!anonKey && anonKey !== "your-anon-key";

  if (isConfigured) {
    try {
      const supabase = await createClient();
      const { data } = await supabase.auth.getSession();
      session = data?.session ?? null;
    } catch (e) {
      // Supabase not reachable — continue without session
    }
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#030304] text-white`}
      >
        <LanguageProvider>
          <ClientLayout>
            <div className="min-h-screen flex flex-col relative">
              <Header session={session} />

              <main className="flex-1 relative overflow-hidden">
                <PageTransition>
                  {children}
                </PageTransition>
              </main>

              <footer className="relative border-t border-white/5 bg-[#030304]">
                <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between text-sm text-white/40">
                  <p className="font-medium">© {new Date().getFullYear()} Give2Eat. All rights reserved.</p>
                  <div className="flex flex-wrap gap-6">
                    <a href="/legal/privacy-policy" className="hover:text-emerald-400 transition-colors duration-300">
                      Privacy Policy
                    </a>
                    <a href="/legal/terms" className="hover:text-emerald-400 transition-colors duration-300">
                      Terms &amp; Conditions
                    </a>
                    <a href="/legal/food-safety" className="hover:text-emerald-400 transition-colors duration-300">
                      Food Safety Disclaimer
                    </a>
                    <a href="/legal/community-guidelines" className="hover:text-emerald-400 transition-colors duration-300">
                      Community Guidelines
                    </a>
                  </div>
                </div>
              </footer>
            </div>
          </ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
