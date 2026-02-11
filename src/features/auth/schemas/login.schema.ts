import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string("Password is required").min(1, "Password is required"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
