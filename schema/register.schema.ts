import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(5).max(15),
  email: z.string().email().min(1),
  password: z.string().min(8),
  passwordConfirmation: z.string(), // Adding password confirmation field
}).refine(data => data.password === data.passwordConfirmation, {
  message: "Passwords don't match",
});

export type Register = z.infer<typeof registerSchema>;
