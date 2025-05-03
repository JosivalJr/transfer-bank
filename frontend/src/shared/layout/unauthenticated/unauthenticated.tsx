import { Outlet, Navigate } from 'react-router-dom';
import {
  Box,
  createTheme,
  CssBaseline,
  Theme,
  ThemeProvider,
} from '@mui/material';

import { EAuthenticatedPath } from '@/core/router';
import { useAuth } from '@/modules/auth/hooks';
import { UnauthenticatedContent } from './components';

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

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <UnauthenticatedContent />
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}
