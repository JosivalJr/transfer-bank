import { Outlet, Navigate } from 'react-router-dom';
import { createTheme, CssBaseline, Theme, ThemeProvider } from '@mui/material';

import { EAuthenticatedPath } from '@/core/router';
import { useAuth } from '@/modules/auth/hooks';
import {
  UnauthenticatedFooter,
  UnauthenticatedBackground,
  UnauthenticatedContainer,
} from './components';

function unauthenticatedTheme(theme: Theme) {
  return createTheme({
    ...theme,
  });
}

export function Unauthenticated() {
  const { authenticated } = useAuth();

  if (authenticated) return <Navigate to={EAuthenticatedPath.HOME} replace />;

  return (
    <ThemeProvider theme={(theme: Theme) => unauthenticatedTheme(theme)}>
      <CssBaseline />

      <UnauthenticatedBackground>
        <UnauthenticatedContainer>
          <Outlet />
        </UnauthenticatedContainer>

        <UnauthenticatedFooter />
      </UnauthenticatedBackground>
    </ThemeProvider>
  );
}
