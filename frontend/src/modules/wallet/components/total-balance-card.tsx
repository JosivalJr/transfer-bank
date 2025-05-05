import { useAuth } from '@/modules/auth/hooks';
import { formatCurrency } from '@/shared/utils';
import { Typography, Box, Stack, Chip, useTheme } from '@mui/material';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const data = [
  { value: 100 },
  { value: 200 },
  { value: 300 },
  { value: 250 },
  { value: 400 },
  { value: 380 },
  { value: 500 },
];

export function TotalBalanceCard() {
  const { wallet } = useAuth();

  const {
    palette: { info },
  } = useTheme();

  return (
    <Stack
      spacing={2}
      justifyContent="space-between"
      height="100%"
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 3,
        position: 'relative',
        padding: 2,
      }}
    >
      <Box>
        <Typography variant="body2">Total Balance</Typography>

        <Stack width="100%" direction="row" spacing={1}>
          <Typography variant="h1" fontWeight="bold">
            {formatCurrency(Number(wallet?.balance))}
          </Typography>
          <Chip color="success" size="small" label={'+10,58%'} />
        </Stack>
      </Box>

      <Typography variant="body2">
        $1,208.24 <br /> (Today)
      </Typography>
      <Box
        sx={{
          height: '100%',
          width: '60%',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          transform: 'translate(69%, 10%)',
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={info.main} stopOpacity={0.7} />
                <stop offset="95%" stopColor={info.dark} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="bump"
              dataKey="value"
              stroke={info.main}
              fillOpacity={0.7}
              fill="url(#colorBalance)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Stack>
  );
}
