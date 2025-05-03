import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link as LinkRouter } from 'react-router-dom';

import { MailOutline } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  Stack,
  Paper,
  Link,
  Typography,
} from '@mui/material';

import { EUnauthenticatedPath } from '@/core/router';
import {
  callbackOnInvalidZod,
  formatErrorForNotification,
} from '@/shared/utils';

import { useAuth } from '../hooks';
import {
  UnauthenticatedAlert,
  UnauthenticatedContainerHeader,
} from '@/shared/layout/unauthenticated/components';
import { ControlledText } from '@/shared/components/fields';
import { LoadingButton } from '@/shared/components/buttons';
import { RecoverData, recoverSchema } from '../domain/schemas';

export function RecoverPassword() {
  const { recover, loading } = useAuth();

  const [alert, setAlert] = useState<UnauthenticatedAlert>({
    message: '',
    type: 'error',
  });

  const { control, handleSubmit } = useForm<RecoverData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(recoverSchema),
  });

  async function handleRecover(data: RecoverData) {
    try {
      const response = await recover(data);

      setAlert({
        message: response,
        type: 'success',
      });
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
      <UnauthenticatedContainerHeader
        title=" Forgot your password?"
        description="Enter your account email address and we will send you the recovery link."
      />

      <Stack
        component="form"
        onSubmit={handleSubmit(handleRecover, callbackOnInvalidZod)}
        gap={2}
      >
        <UnauthenticatedAlert
          alert={alert}
          clear={() => setAlert({ message: '', type: 'error' })}
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
                  <IconButton edge="end" color="inherit">
                    <MailOutline />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <LoadingButton
          loading={loading}
          disabled={alert.type === 'success'}
          loadingIndicator="SENDING. . ."
          variant="contained"
          type="submit"
          size="large"
          color="success"
        >
          SEND
        </LoadingButton>
      </Stack>

      <Typography>
        Already have an account?{' '}
        <Link
          color="text.secondary"
          component={LinkRouter}
          to={EUnauthenticatedPath.LOGIN}
        >
          Sign in
        </Link>
      </Typography>
    </Paper>
  );
}
