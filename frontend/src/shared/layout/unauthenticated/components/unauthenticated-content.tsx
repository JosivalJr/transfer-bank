import { Container, Typography, Link } from '@mui/material';
import { PropsWithSx } from '@/shared/domain/types';

export function UnauthenticatedContent({ sx }: PropsWithSx) {
  const currentYear = new Date().getFullYear();

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: { sm: 3, xs: 2 },
        paddingY: { sm: 3, xs: 2 },
        ...sx,
      }}
    >
      <h3>CONTENT</h3>
      <Typography variant="body2" fontWeight="light" textAlign="center">
        Developed by&nbsp;
        <Link
          href="https://www.linkedin.com/in/josivaloliveira/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Josival Oliveira
        </Link>
        &nbsp; &copy; {currentYear}
      </Typography>
    </Container>
  );
}
