import { z } from 'zod';
import { passwordSchema } from '@/shared/domain';

export const resetSchema = z
  .object({
    token: z.string().min(1).trim(),
    password: passwordSchema,
    confirm: z.string().min(1, 'Required field!').trim(),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: 'Incorrect password confirmation!',
    path: ['confirm'],
  });
export type ResetData = z.infer<typeof resetSchema>;
