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
