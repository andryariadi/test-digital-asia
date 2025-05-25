import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

// Konfigurasi font Archivo
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  // Anda bisa menambahkan weight atau style yang dibutuhkan
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Artivo",
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
      <body className={`${archivo.variable} font-sans antialiased bg-[#F5F5F5]`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
