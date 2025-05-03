import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Stack, Paper, Link } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Link as LinkRouter,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

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
import { ResetData, resetSchema } from '../domain/schemas';
import { ControlledPassword } from '@/shared/components/fields';
import { LoadingButton } from '@/shared/components/buttons';

export function ResetPassword() {
  const { reset, loading } = useAuth();
  const { state } = useLocation();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '6S5A1DS651AS65D1AS5';

  if (!token) {
    navigate(EUnauthenticatedPath.LOGIN);
  }

  const [alert, setAlert] = useState<UnauthenticatedAlert>({
    message: '',
    type: 'error',
  });

  const { control, handleSubmit } = useForm<ResetData>({
    defaultValues: {
      token: token as string,
      password: '',
      confirm: '',
    },
    resolver: zodResolver(resetSchema),
  });

  async function handleReset(data: ResetData) {
    try {
      const response = await reset(data);

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
        title={
          state?.resetPassword ? 'Register New Password' : 'Password Recovery'
        }
        description="Enter a new password for your account and confirm it."
      />

      <Stack
        component="form"
        onSubmit={handleSubmit(handleReset, callbackOnInvalidZod)}
        gap={2}
      >
        <UnauthenticatedAlert
          alert={alert}
          clear={() => setAlert({ message: '', type: 'error' })}
        />

        <ControlledPassword
          label="New Password"
          name="password"
          size="medium"
          control={control}
        />

        <ControlledPassword
          label="Confirm Password"
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
          disabled={alert.type === 'success'}
          loadingIndicator="SAVING. . ."
        >
          SAVE PASSWORD
        </LoadingButton>
      </Stack>

      <Link
        color="text.secondary"
        component={LinkRouter}
        to={EUnauthenticatedPath.LOGIN}
      >
        {state?.resetPassword
          ? 'Have you successfully registered your password? Click here to access'
          : 'Already have an account? Sign in'}
      </Link>
    </Paper>
  );
}
