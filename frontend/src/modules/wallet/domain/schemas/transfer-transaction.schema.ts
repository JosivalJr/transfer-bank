import { z } from 'zod';
import { transactionSchema } from './';

export const transferTransactionSchema = z
  .object({
    senderWalletId: z.number({ required_error: 'Required field.' }),
    recipientWalletId: z.number({ required_error: 'Required field.' }),
  })
  .and(transactionSchema);

export type TransferTransactionData = z.infer<typeof transferTransactionSchema>;
