import { CircularProgress, Stack, useTheme } from '@mui/material';

export function Loading() {
  const {
    palette: { mode },
  } = useTheme();

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
    >
      <CircularProgress
        title="LOADING. . ."
        sx={{ color: mode === 'dark' ? 'white' : 'primary.main' }}
      />
    </Stack>
  );
}
