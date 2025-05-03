import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link as LinkRouter } from 'react-router-dom';

import { MailOutline } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

import {
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Paper,
  Typography,
  Divider,
} from '@mui/material';

import { EUnauthenticatedPath } from '@/core/router';

import {
  callbackOnInvalidZod,
  formatErrorForNotification,
} from '@/shared/utils';

import { useAuth } from '../hooks/auth.hook';
import { LoginData, loginSchema } from '../domain/schemas/login.schema';
import {
  UnauthenticatedAlert,
  UnauthenticatedContainerHeader,
} from '@/shared/layout/unauthenticated/components';
import {
  ControlledCheckbox,
  ControlledPassword,
  ControlledText,
} from '@/shared/components/fields';
import { LoadingButton } from '@/shared/components/buttons';

export function Login() {
  const { login, loading } = useAuth();

  const [alert, setAlert] = useState<UnauthenticatedAlert>({
    message: '',
    type: 'error',
  });

  const { control, handleSubmit } = useForm<LoginData>({
    defaultValues: {
      email: '',
      password: '',
      remember: true,
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(data: LoginData) {
    try {
      await login(data);
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
      <UnauthenticatedContainerHeader title="Sign in with Password" />

      <Stack
        component="form"
        onSubmit={handleSubmit(handleLogin, callbackOnInvalidZod)}
        gap={2}
      >
        <UnauthenticatedAlert
          alert={alert}
          clear={() => {
            setAlert({ message: '', type: 'error' });
          }}
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

        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <ControlledCheckbox
            label="Remember me"
            name="remember"
            control={control}
          />

          <Link
            color="text.secondary"
            component={LinkRouter}
            to={EUnauthenticatedPath.RECOVER}
            fontSize={12}
          >
            Forgot your password?
          </Link>
        </Stack>

        <LoadingButton
          type="submit"
          size="large"
          color="success"
          variant="contained"
          loading={loading}
          loadingIndicator="ACCESSING. . ."
        >
          SIGN IN
        </LoadingButton>

        <Divider
          sx={{
            marginY: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            or continue with
          </Typography>
        </Divider>

        <Stack direction="row" spacing={2} justifyContent="center">
          <IconButton size="large">
            <FacebookIcon />
          </IconButton>
          <IconButton size="large">
            <GoogleIcon />
          </IconButton>
          <IconButton size="large">
            <AppleIcon />
          </IconButton>
        </Stack>

        <Typography width="100%" textAlign="center" paddingTop={4}>
          Don't have an account?{' '}
          <Link
            color="text.secondary"
            component={LinkRouter}
            to={EUnauthenticatedPath.CREATE_ACCOUNT}
          >
            Sign up
          </Link>
        </Typography>
      </Stack>
    </Paper>
  );
}
