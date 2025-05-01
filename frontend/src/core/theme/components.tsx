import { Components, Theme } from '@mui/material';

export const components: Components<Omit<Theme, 'components'>> = {
  MuiCssBaseline: {
    styleOverrides: ({ palette }) => ({
      '*': {
        scrollBehavior: 'smooth',
      },
      '*::-webkit-scrollbar': {
        height: 8,
        width: 8,
        background: 'transparent',
        borderRadius: 4,
      },
      '*::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: palette.primary.main,
        borderRadius: 4,
      },
    }),
  },
};
