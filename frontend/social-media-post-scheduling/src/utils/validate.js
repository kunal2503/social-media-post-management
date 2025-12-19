import {z}  from "zod";

const passwordRules = z
  .string()
  .min(8, "Password must be at least 8 characters")
  // .regex(/[A-Z]/, "Password must contain at least one uppercase letter");

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("invalid email address"),
  password: passwordRules,
});

export const signupSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  email: z.string().min(1, "Email is required").email("invalid email address"),
  password: passwordRules,
});
