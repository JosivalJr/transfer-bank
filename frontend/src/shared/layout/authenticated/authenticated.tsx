import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ConfirmDialog } from '@/shared/components';

export function Authenticated() {
  const {
    palette: { mode },
  } = useTheme();

  return (
    <>
      <ConfirmDialog>
        <Outlet />
      </ConfirmDialog>

      <ToastContainer theme={mode} pauseOnFocusLoss pauseOnHover draggable />
    </>
  );
}
