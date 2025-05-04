import { Outlet } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import {
  AuthenticatedHeader,
  AuthenticatedSidebar,
  AuthenticatedContainer,
} from './components';

import 'react-toastify/dist/ReactToastify.css';
import { ConfirmDialog } from '@/shared/components/confirm-dialog';

export function Authenticated() {
  const {
    palette: { mode },
  } = useTheme();

  return (
    <Box
      sx={{
        flex: 1,
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: { sm: '64px', xs: 0 },
      }}
    >
      <ConfirmDialog>
        <AuthenticatedSidebar>
          <AuthenticatedHeader />

          <AuthenticatedContainer>
            <Outlet />
          </AuthenticatedContainer>
        </AuthenticatedSidebar>
      </ConfirmDialog>

      <ToastContainer theme={mode} pauseOnFocusLoss pauseOnHover draggable />
    </Box>
  );
}
