import { z } from 'zod';

export const transactionSchema = z.object({
  walletId: z.number({ required_error: 'Required field.' }),
  currencyId: z.number({ required_error: 'Required field.' }),
  amount: z.number({ required_error: 'Required field.' }),
});

export type TransactionData = z.infer<typeof transactionSchema>;
