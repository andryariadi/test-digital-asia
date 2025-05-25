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
  imageUrl: z.string().min(1, "Image is required"),
});

export const CategoryFormValidation = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
});
