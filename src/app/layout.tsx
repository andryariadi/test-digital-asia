import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

// Konfigurasi font Archivo
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Artivo",
    template: "%s | Artivo",
  },
  description: "Artivo is a platform for sharing and discovering articles.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: archivo.style.fontFamily }} className={`font-${archivo.style.fontFamily} antialiased bg-[#F5F5F5]`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
