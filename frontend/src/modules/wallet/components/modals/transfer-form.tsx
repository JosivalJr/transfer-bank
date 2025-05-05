import { useState } from 'react';
import { toast } from 'react-toastify';
import { useFormContext, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Box } from '@mui/material';

import { ControlledCurrency } from '@/shared/components/fields/controlled-currency';
import {
  transferTransactionSchema,
  TransferTransactionData,
} from '../../domain/schemas';

import { useAuth } from '@/modules/auth/hooks';
import { LoadingButton } from '@/shared/components/buttons';
import {
  callbackOnInvalidZod,
  formatErrorForNotification,
} from '@/shared/utils';
import { LoadingStatus } from '@/shared/domain/types';
import { WalletRepository } from '../../repositories/wallet.repository';
import { ControlledText } from '@/shared/components/fields';

interface TransferFormProps {
  onSuccess: () => void;
}

export function TransferFormWrapper({ onSuccess }: TransferFormProps) {
  const { wallet } = useAuth();
  const walletId = Number(wallet?.id);

  const methods = useForm<TransferTransactionData>({
    defaultValues: {
      walletId,
    },
    resolver: zodResolver(transferTransactionSchema),
  });

  return (
    <FormProvider {...methods}>
      <Box component="form">
        <Grid container spacing={2} paddingY={1}>
          <Grid size={12}>
            <ControlledCurrency
              label="Transfer Value"
              name="amount"
              size="small"
              control={methods.control}
            />
          </Grid>
          <Grid size={12}>
            <ControlledText
              label="Destination Wallet"
              name="destinationWallet"
              size="small"
              control={methods.control}
            />
          </Grid>
        </Grid>
        <Box marginTop={2}>
          <TransferFormAction onSuccess={onSuccess} />
        </Box>
      </Box>
    </FormProvider>
  );
}

export function TransferFormAction({ onSuccess }: TransferFormProps) {
  const methods = useFormContext<TransferTransactionData>();
  const [loading, setLoading] = useState<LoadingStatus>(false);

  const repository = new WalletRepository();

  async function submit(data: TransferTransactionData) {
    try {
      setLoading('POST');
      await repository.transfer(data);
      toast.success('Transfer successful!');
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
      CONFIRM TRANSFER
    </LoadingButton>
  );
}
