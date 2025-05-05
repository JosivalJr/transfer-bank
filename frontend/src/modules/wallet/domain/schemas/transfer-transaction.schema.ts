import { z } from 'zod';
import { transactionSchema } from './';

export const transferTransactionSchema = z.object({}).and(transactionSchema);

export type TransferTransactionData = z.infer<typeof transferTransactionSchema>;
