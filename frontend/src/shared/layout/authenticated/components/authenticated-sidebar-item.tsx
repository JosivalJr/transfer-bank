import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Theme,
  useMediaQuery,
} from '@mui/material';

import { SidebarItem } from '@/shared/domain/types';

type AuthenticatedSidebarItemProps = {
  item: SidebarItem;
  openedSidebar: boolean;
  toggleSidebar: () => void;
};

export function AuthenticatedSidebarItem({
  item,
  openedSidebar,
  toggleSidebar,
}: AuthenticatedSidebarItemProps) {
  const { pathname } = useLocation();
  const [openSubList, setOpenSubList] = useState(false);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  function toggleSubList() {
    if (!openedSidebar) toggleSidebar();
    setOpenSubList((prev) => !prev);
  }

  useEffect(() => {
    if (!openedSidebar && openSubList) setOpenSubList(false);
  }, [openedSidebar]);

  useEffect(() => {
    if (!isMobile && openedSidebar) toggleSidebar();
  }, [pathname]);

  return (
    <Stack>
      <ListItemButton
        disableGutters
        className="custom-sidebar-button"
        to={item.path}
        component={Link}
        onClick={toggleSubList}
        selected={[item.path, `${item.path}/`].includes(pathname)}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>

        <ListItemText primary={item.name} />
      </ListItemButton>
    </Stack>
  );
}
