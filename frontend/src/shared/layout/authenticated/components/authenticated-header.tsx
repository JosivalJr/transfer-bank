import {
  Theme,
  IconButton,
  useMediaQuery,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Menu } from '@mui/icons-material';

import { AuthenticatedHeaderBreadcrumbs } from './authenticated-header-breadcrumbs';
import { AuthenticatedHeaderProfile } from './authenticated-header-profile';
import { useSidebar } from './authenticated-sidebar';

export function AuthenticatedHeader() {
  const { toggleSidebar } = useSidebar();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  return (
    <>
      <AppBar position="static" square>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          {isMobile && (
            <IconButton onClick={toggleSidebar} title="Menu">
              <Menu sx={{ color: 'primary.contrastText' }} />
            </IconButton>
          )}

          {!isMobile && <AuthenticatedHeaderBreadcrumbs />}

          <AuthenticatedHeaderProfile />
        </Toolbar>
      </AppBar>
    </>
  );
}
