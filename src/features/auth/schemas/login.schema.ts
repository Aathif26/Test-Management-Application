import { z } from "zod";

export const loginSchema = z.object({
    userId: z.string().min(1, "Please enter a valid user ID"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export type LoginFormData = z.infer<typeof loginSchema>;