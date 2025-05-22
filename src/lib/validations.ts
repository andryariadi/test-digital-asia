import { z } from "zod";

export const RegisterFormValidation = z.object({
  username: z.string().min(2, "Username must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  password: z.string().min(5, "Password must be at least 5 characters"),
  role: z.enum(["admin", "user"], { errorMap: () => ({ message: "Role must be either admin or user" }) }),
});

export const LoginFormValidation = z.object({
  username: z.string().min(2, "Username must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});
