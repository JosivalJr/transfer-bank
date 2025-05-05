import { z } from 'zod';
import { transactionSchema } from './';

export const depositTransactionSchema = z.object({}).and(transactionSchema);

export type DepositTransactionData = z.infer<typeof depositTransactionSchema>;
