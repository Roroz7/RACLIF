import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Raclif - Premium Cheats & Hacks",
  description: "Plateforme de revente de cheats/hacks premium pour jeux vidéo (Minecraft, CS2, Battlefield).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col bg-raclif-darkest text-raclif-light selection:bg-raclif-primary/30`}>
        <Navbar />
        <main className="flex-grow flex flex-col relative">
          {/* Subtle background glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-raclif-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
