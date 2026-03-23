import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { LanguageProvider } from "../context/LanguageContext";
import Header from "../components/Header";
import PageTransition from "../components/PageTransition";

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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check for auth cookie to determine session state
  const cookieStore = await cookies();
  const authCookie = cookieStore.getAll().find(
    (c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token")
  );
  const session = authCookie ? true : null;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Header session={session} />

            <main className="flex-1 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
              <PageTransition>
                {children}
              </PageTransition>
            </main>

            <footer className="border-t border-white/10 bg-black">
              <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between text-sm text-white/60">
                <p>© {new Date().getFullYear()} Give2Eat. All rights reserved.</p>
                <div className="flex flex-wrap gap-4">
                  <a href="/legal/privacy-policy" className="hover:text-white">
                    Privacy Policy
                  </a>
                  <a href="/legal/terms" className="hover:text-white">
                    Terms &amp; Conditions
                  </a>
                  <a href="/legal/food-safety" className="hover:text-white">
                    Food Safety Disclaimer
                  </a>
                  <a href="/legal/community-guidelines" className="hover:text-white">
                    Community Guidelines
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
