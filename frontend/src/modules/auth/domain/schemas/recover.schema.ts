import { z } from 'zod';

export const recoverSchema = z.object({
  email: z
    .string()
    .min(1, 'Required field!')
    .email('Invalid Email!')
    .max(100, 'Email too long!')
    .trim(),
});

export type RecoverData = z.infer<typeof recoverSchema>;
