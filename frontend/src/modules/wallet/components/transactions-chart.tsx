import { Box, Typography, useTheme } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const data = [
  { name: '1 days', spent: 400, received: 240 },
  { name: '7 days', spent: 300, received: 139 },
  { name: '14 days', spent: 200, received: 980 },
  { name: '1 montly', spent: 278, received: 390 },
  { name: '3 montly', spent: 189, received: 480 },
  { name: '1 year', spent: 239, received: 380 },
  { name: '3 years', spent: 349, received: 430 },
];

export function TransactionsChart() {
  const {
    palette: { grey, primary, secondary },
  } = useTheme();

  return (
    <Box sx={{ height: 350, paddingBottom: 6 }}>
      <Typography variant="subtitle2" paddingBottom={2}>
        Transactions Balance
      </Typography>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={grey[700]} />
          <XAxis dataKey="name" stroke={grey[500]} />
          <YAxis stroke={grey[500]} />
          <Tooltip
            contentStyle={{
              backgroundColor: primary.main,
              border: 'none',
              color: 'white',
            }}
          />
          <Bar dataKey="spent" stackId="a" fill={secondary.main} />
          <Bar dataKey="received" stackId="a" fill={primary.light} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
