import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link as LinkRouter } from 'react-router-dom';

import { MailOutline } from '@mui/icons-material';

import {
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Paper,
  Typography,
} from '@mui/material';

import { EUnauthenticatedPath } from '@/core/router';

import {
  callbackOnInvalidZod,
  formatErrorForNotification,
} from '@/shared/utils';

import { useAuth } from '../hooks/auth.hook';
import {
  UnauthenticatedAlert,
  UnauthenticatedContainerHeader,
} from '@/shared/layout/unauthenticated/components';
import { ControlledPassword, ControlledText } from '@/shared/components/fields';
import { LoadingButton } from '@/shared/components/buttons';
import { CreateAccountData, createAccountSchema } from '../domain/schemas';

export function CreateAccount() {
  const { createAccount, loading } = useAuth();

  const [alert, setAlert] = useState<UnauthenticatedAlert>({
    message: '',
    type: 'error',
  });

  const { control, handleSubmit } = useForm<CreateAccountData>({
    defaultValues: {
      name: '',
      password: '',
    },
    resolver: zodResolver(createAccountSchema),
  });

  async function handleCreateAccount(data: CreateAccountData) {
    try {
      await createAccount(data);
    } catch (error) {
      setAlert({
        message: formatErrorForNotification(error),
        type: 'error',
      });
    }
  }

  return (
    <Paper
      sx={{
        width: '100%',
        maxWidth: '460px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 4,
        padding: 4,
        borderRadius: 0,
      }}
    >
      <UnauthenticatedContainerHeader title="Create an Account" />

      <Stack
        component="form"
        onSubmit={handleSubmit(handleCreateAccount, callbackOnInvalidZod)}
        gap={2}
      >
        <UnauthenticatedAlert
          alert={alert}
          clear={() => {
            setAlert({ message: '', type: 'error' });
          }}
        />

        <ControlledText
          label="Name"
          name="name"
          size="medium"
          placeholder="John Doe"
          control={control}
        />

        <ControlledText
          label="CPF"
          name="cpf"
          size="medium"
          placeholder="123.456.789-01"
          control={control}
        />

        <ControlledText
          label="Email"
          name="email"
          size="medium"
          placeholder="exemplo@email.com"
          control={control}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton edge="end" disableRipple>
                    <MailOutline />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <ControlledPassword
          label="Password"
          name="password"
          size="medium"
          control={control}
        />

        <ControlledPassword
          label="Confirm"
          name="confirm"
          size="medium"
          control={control}
        />

        <LoadingButton
          type="submit"
          size="large"
          color="success"
          variant="contained"
          loading={loading}
          loadingIndicator="CREATING. . ."
        >
          CREATE ACCOUNT
        </LoadingButton>

        <Typography width="100%" textAlign="center" paddingTop={4}>
          Do you want{' '}
          <Link
            color="text.secondary"
            component={LinkRouter}
            to={EUnauthenticatedPath.LOGIN}
          >
            Sign in
          </Link>{' '}
          ?
        </Typography>
      </Stack>
    </Paper>
  );
}
