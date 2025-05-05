import { z } from 'zod';
import { transactionSchema } from './';

export const withdrawTransactionSchema = z.object({}).and(transactionSchema);

export type WithdrawTransactionData = z.infer<typeof withdrawTransactionSchema>;
