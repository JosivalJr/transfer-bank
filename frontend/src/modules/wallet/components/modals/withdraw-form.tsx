import { useState } from 'react';
import { toast } from 'react-toastify';
import { useFormContext, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Box } from '@mui/material';

import { ControlledCurrency } from '@/shared/components/fields/controlled-currency';
import {
  withdrawTransactionSchema,
  WithdrawTransactionData,
} from '../../domain/schemas';

import { useAuth } from '@/modules/auth/hooks';
import { LoadingButton } from '@/shared/components/buttons';
import {
  callbackOnInvalidZod,
  formatErrorForNotification,
} from '@/shared/utils';
import { LoadingStatus } from '@/shared/domain/types';
import { WalletRepository } from '../../repositories/wallet.repository';

interface WithdrawFormProps {
  onSuccess: () => void;
}

export function WithdrawFormWrapper({ onSuccess }: WithdrawFormProps) {
  const { wallet } = useAuth();
  const walletId = Number(wallet?.id);
  const currencyId = Number(wallet?.currency?.id);

  const depositTransactionResolver = (
    data: any,
    context: any,
    options: any,
  ) => {
    const newData = {
      ...data,
      amount: Number(data.amount),
    };
    return zodResolver(withdrawTransactionSchema)(newData, context, options);
  };

  const methods = useForm<WithdrawTransactionData>({
    defaultValues: {
      walletId,
      currencyId,
    },
    resolver: (data, context, options) =>
      depositTransactionResolver(data, context, options),
  });

  return (
    <FormProvider {...methods}>
      <Box component="form">
        <Grid container spacing={2} paddingY={1}>
          <Grid size={12}>
            <ControlledCurrency
              label="Withdraw Value"
              name="amount"
              size="small"
              control={methods.control}
            />
          </Grid>
        </Grid>
        <Box marginTop={2}>
          <WithdrawFormAction onSuccess={onSuccess} />
        </Box>
      </Box>
    </FormProvider>
  );
}

export function WithdrawFormAction({ onSuccess }: WithdrawFormProps) {
  const methods = useFormContext<WithdrawTransactionData>();
  const [loading, setLoading] = useState<LoadingStatus>(false);

  const repository = new WalletRepository();

  async function submit(data: WithdrawTransactionData) {
    try {
      setLoading('POST');
      await repository.withdraw(data);
      toast.success('Withdrawal successful!');
      onSuccess();
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton
      size="medium"
      color="primary"
      variant="contained"
      fullWidth
      loadingIndicator="PROCESSING . . ."
      loading={loading === 'POST'}
      onClick={methods.handleSubmit(submit, callbackOnInvalidZod)}
    >
      CONFIRM WITHDRAWAL
    </LoadingButton>
  );
}
