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

  MuiTypography: {
    styleOverrides: {
      root: {
        letterSpacing: 1,
        fontWeight: 400,
      },
      h1: { fontSize: '24px' },
      h2: { fontSize: '20px' },
      h3: { fontSize: '18px' },
      h4: { fontSize: '16px' },
      h5: { fontSize: '14px' },
      h6: { fontSize: '12px' },
      subtitle1: { fontSize: '22px' },
      subtitle2: { fontSize: '18px' },
      body1: { fontSize: '14px' },
      body2: { fontSize: '12px' },
      caption: { fontSize: '10px' },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: {
        rounded: { borderRadius: 8 },
        '& .MuiList-root': {
          backgroundColor: 'transparent',
          padding: 0,
        },
        '& .MuiAccordion-root': {
          position: 'static',
          boxShadow: 'none',
        },
      },
    },
  },

  MuiDrawer: {
    styleOverrides: {
      root: ({ theme: { palette } }) => ({
        '&.custom-sidebar': {
          '.custom-sidebar-logo': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 48,
            height: 48,
            maxWidth: 192,
            maxHeight: {
              sm: 48,
              xs: 48,
            },
            '& svg': { transform: '0.3s ease' },
          },
          '.custom-sidebar-items': {
            overflowY: 'auto',
            overflowX: 'hidden',
            flexGrow: 1,
            '[open=true]': {
              overflowX: 'auto',
            },
            '& ul.MuiList-root': {
              padding: 6,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            },
            '&::-webkit-scrollbar': {
              width: 0,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'transparent',
            },
          },
          '.custom-sidebar-button': {
            fontWeight: 'bold',
            borderRadius: 4,
            padding: '6px',
            gap: 16,
            '& .MuiListItemIcon-root': {
              backgroundColor: 'transparent',
              color: palette.primary.contrastText,
              border: '1',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              borderRadius: 4,
              minWidth: 0,
              padding: 0,
              height: 40,
              width: 40,
            },
            '& .MuiListItemText-root': {
              color: palette.primary.contrastText,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              '& .MuiTypography-root': {
                fontSize: '14px',
              },
            },
            '& .custom-sidebar-button-toggle': {
              color: palette.primary.contrastText,
            },
            '&.Mui-selected, &.Mui-selected:hover': {
              backgroundColor: palette.secondary.main,
              '.MuiListItemText-root': {
                color: palette.secondary.contrastText,
                '& .MuiTypography-root': {
                  fontWeight: 600,
                },
              },
              '.custom-sidebar-button-toggle': {
                color: palette.primary.main,
              },
            },
          },
          '& .MuiDivider-root': {
            backgroundColor: palette.primary.contrastText,
            marginRight: 8,
            marginLeft: 8,
          },
        },
      }),
    },
  },

  MuiLink: {
    styleOverrides: {
      root: ({ theme: { palette } }) => ({
        textDecoration: 'none',
        color: palette.secondary.main,
        '&:hover': {
          textDecoration: 'underline',
        },
      }),
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme: { palette } }) => ({
        fontSize: '13px',
        padding: '10px 14px',
        '&:hover': {
          backgroundColor: palette.secondary.main,
          color: palette.secondary.contrastText,
        },
      }),
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme: { palette } }) => ({
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.text.primary,
        },
      }),
    },
  },

  MuiTextField: {
    styleOverrides: {
      root: ({ theme: { palette } }) => ({
        '& .Mui-disabled': {
          color:
            palette.mode === 'dark' ? palette.grey[600] : palette.grey[300],
        },
        '& label.Mui-focused': {
          color: palette.text.primary,
        },
        '& .MuiInput-underline:after': {
          color: palette.text.primary,
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            color: palette.text.primary,
          },
          '&:hover fieldset': {
            color: palette.text.primary,
          },
          '&.Mui-focused fieldset': {
            color: palette.text.primary,
          },
        },
      }),
    },
  },
};
