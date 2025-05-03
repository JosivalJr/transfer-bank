import { passwordSchema } from '@/shared/domain';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(8, 'Required field!')
    .max(100, 'Email too long')
    .toLowerCase()
    .trim(),
  password: passwordSchema,
  remember: z.boolean(),
});

export type LoginData = z.infer<typeof loginSchema>;
