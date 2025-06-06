import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toastStyle = {
  borderRadius: "10px",
  background: "#333",
  color: "#fff",
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const formatDatee = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

export const stripHtmlTags = (html: string) => {
  if (typeof window === "undefined") {
    // Untuk server-side
    return html.replace(/<[^>]*>?/gm, "");
  } else {
    // Untuk client-side
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }
};

export function formatRouteName(route: string): string {
  // Hapus slash di awal dan akhir
  const cleaned = route.replace(/^\/|\/$/g, "");

  // Ubah dash/tanda hubung menjadi spasi
  const withSpaces = cleaned.replace(/-/g, " ");

  // Kapitalisasi setiap kata
  return withSpaces.replace(/\b\w/g, (char) => char.toUpperCase());
}
