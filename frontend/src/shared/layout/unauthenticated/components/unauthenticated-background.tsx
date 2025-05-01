import { PropsWithChildren } from 'react';
import { Box, useTheme } from '@mui/material';

import BackgroundDark from '@/shared/assets/default-bg.jpg';
import BackgroundLight from '@/shared/assets/default-bg.png';
import { PropsWithSx } from '@/shared/domain/types';

const BACKGROUND = {
  dark: BackgroundDark,
  light: BackgroundLight,
};

export function UnauthenticatedBackground({
  children,
  sx,
}: PropsWithChildren & PropsWithSx) {
  const {
    palette: { mode },
  } = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        minWidth: '100%',
        minHeight: '100vh',
        backgroundImage: `url(${BACKGROUND[mode]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
