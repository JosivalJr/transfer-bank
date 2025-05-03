import { Stack, Typography } from '@mui/material';

interface UnauthenticatedContainerHeaderProps {
  title: string;
  description?: string;
}

export function UnauthenticatedContainerHeader({
  title,
  description,
}: UnauthenticatedContainerHeaderProps) {
  return (
    <Stack gap={2} width="100%">
      <Typography
        component="h3"
        variant="h3"
        fontWeight="bold"
        textAlign="start"
      >
        {title}
      </Typography>

      {description && <Typography variant="body1">{description}</Typography>}
    </Stack>
  );
}
