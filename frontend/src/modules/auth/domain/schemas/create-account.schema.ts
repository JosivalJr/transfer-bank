import { z } from 'zod';
import { passwordSchema } from '@/shared/domain';
import {
  formatCPF,
  removeSpecialCharacters,
  validateCPF,
} from '@/shared/utils';

export const createAccountSchema = z
  .object({
    name: z.string().min(2, 'Required field!'),
    email: z.string().min(8, 'Required field!').toLowerCase().trim(),
    cpf: z
      .string({
        required_error: 'Required field!',
        invalid_type_error: 'Invalid CPF!',
      })
      .transform((cpf) => formatCPF(cpf))
      .refine((cpf) => validateCPF(cpf), 'Invalid CPF!')
      .transform((cpf) => removeSpecialCharacters(cpf)),
    password: passwordSchema,
    confirm: z.string().min(1, 'Required field!').trim(),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: 'Incorrect password confirmation!',
    path: ['confirm'],
  });

export type CreateAccountData = z.infer<typeof createAccountSchema>;
