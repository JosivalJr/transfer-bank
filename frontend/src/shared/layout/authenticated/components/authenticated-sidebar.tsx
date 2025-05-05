import {
  Box,
  ClickAwayListener,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Logout } from '@mui/icons-material';

import { AUTHENTICATED_ROUTES } from '@/core/router/routes';
import { toSidebar } from '@/core/router';

import { useAuth } from '@/modules/auth/hooks';

import { AuthenticatedSidebarItem } from './authenticated-sidebar-item';

interface ISidebarContext {
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<ISidebarContext>({
  openSidebar: () => {},
  closeSidebar: () => {},
  toggleSidebar: () => {},
});

function SidebarPaper(open: boolean, isMobile?: boolean) {
  const style = {
    overflow: 'hidden',
    maxWidth: 280,
    width: 280,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    border: 'none',
    backgroundColor: 'primary.main',
  };

  if (!isMobile) {
    Object.assign(style, {
      minWidth: open ? 280 : 64,
      width: open ? 280 : 64,
      transition: '0.3s ease',
    });
  }

  return style;
}

export const SIDEBAR_ITEMS = toSidebar(AUTHENTICATED_ROUTES);

export function AuthenticatedSidebar({ children }: PropsWithChildren) {
  const { logout } = useAuth();

  const [open, setOpen] = useState<boolean>(false);

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleToggle() {
    setOpen(!open);
  }

  function handleConfirmLogout() {
    logout();
  }

  return (
    <SidebarContext.Provider
      value={{
        openSidebar: handleOpen,
        closeSidebar: handleClose,
        toggleSidebar: handleToggle,
      }}
    >
      <ClickAwayListener onClickAway={!isMobile ? handleClose : () => {}}>
        <Drawer
          className="custom-sidebar"
          variant={isMobile ? 'temporary' : 'permanent'}
          onMouseEnter={!isMobile ? handleOpen : undefined}
          onMouseLeave={!isMobile ? handleClose : undefined}
          onClose={isMobile ? handleClose : undefined}
          open={open}
          anchor="left"
          slotProps={{
            paper: {
              elevation: 3,
              sx: SidebarPaper(open, isMobile),
            },
          }}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            flexWrap="nowrap"
            direction="row"
            padding={1}
            gap={1}
          >
            <Box className="custom-sidebar-logo">
              <Typography sx={{ color: 'primary.contrastText' }}>
                Logo
              </Typography>
            </Box>
          </Stack>

          <Box className="custom-sidebar-items" data-open={open}>
            <List dense disablePadding>
              {SIDEBAR_ITEMS.map((item, index) => (
                <AuthenticatedSidebarItem
                  key={`sidebar-item-${index}`}
                  toggleSidebar={handleToggle}
                  openedSidebar={open}
                  item={item}
                />
              ))}
            </List>
          </Box>

          <List dense disablePadding>
            <ListItemButton
              className="custom-sidebar-button"
              onClick={handleConfirmLogout}
              sx={{ margin: 1 }}
              disableGutters
            >
              <ListItemIcon>
                <Logout />
              </ListItemIcon>

              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Drawer>
      </ClickAwayListener>

      <Box
        sx={{
          paddingLeft: open ? '216px' : '0px',
          transition: '0.3s ease',
        }}
      >
        {children}
      </Box>
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (context === undefined) {
    throw new Error('useSidebar must be used within a AuthenticatedSidebar');
  }

  return context;
}
