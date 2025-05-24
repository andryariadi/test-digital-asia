import { z } from "zod";

export const RegisterFormValidation = z.object({
  username: z.string().min(2, "Username must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  password: z.string().min(5, "Password must be at least 5 characters"),
  role: z.enum(["Admin", "User"], { errorMap: () => ({ message: "Role must be either admin or user" }) }),
});

export const LoginFormValidation = z.object({
  username: z.string().min(2, "Username must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

export const ArticleFormValidation = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  category: z.string().min(1, "Category is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  imageUrl: z
    .any()
    .refine((file) => {
      if (!file) return true; // Optional
      return file instanceof File;
    }, "Invalid file type")
    .refine((file) => {
      if (!file) return true; // Optional
      return file.size <= 2 * 1024 * 1024;
    }, "File size must be less than 2MB")
    .refine((file) => {
      if (!file) return true; // Optional
      return ["image/jpeg", "image/png"].includes(file.type);
    }, "Only JPEG and PNG images are allowed"),
});
