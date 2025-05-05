import { useState } from 'react';
import { toast } from 'react-toastify';
import { useFormContext, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Box } from '@mui/material';

import { ControlledCurrency } from '@/shared/components/fields/controlled-currency';
import {
  DepositTransactionData,
  depositTransactionSchema,
} from '../../domain/schemas';

import { useAuth } from '@/modules/auth/hooks';
import { LoadingButton } from '@/shared/components/buttons';
import {
  callbackOnInvalidZod,
  formatErrorForNotification,
} from '@/shared/utils';
import { LoadingStatus } from '@/shared/domain/types';
import { WalletRepository } from '../../repositories/wallet.repository';

interface DepositFormProps {
  onSuccess: () => void;
}

export function DepositFormWrapper({ onSuccess }: DepositFormProps) {
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
    return zodResolver(depositTransactionSchema)(newData, context, options);
  };

  const methods = useForm<DepositTransactionData>({
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
        <Grid container width="100%" spacing={2} paddingY={1}>
          <Grid size={12}>
            <ControlledCurrency
              label="Deposit Value"
              name="amount"
              size="small"
              control={methods.control}
            />
          </Grid>
        </Grid>
        <Box marginTop={2}>
          <DepositFormAction onSuccess={onSuccess} />
        </Box>
      </Box>
    </FormProvider>
  );
}

export function DepositFormAction({ onSuccess }: DepositFormProps) {
  const methods = useFormContext<DepositTransactionData>();
  const [loading, setLoading] = useState<LoadingStatus>(false);

  const repository = new WalletRepository();

  async function submit(data: DepositTransactionData) {
    try {
      setLoading('POST');
      await repository.deposit(data);
      toast.success('Deposit made successfully!');
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
      CONFIRM DEPOSIT
    </LoadingButton>
  );
}
