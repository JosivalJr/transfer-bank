import { useState } from 'react';
import {
  Box,
  Typography,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Divider,
} from '@mui/material';

import { formatCurrency } from '@/shared/utils';

export function TransactionSummary() {
  const [period, setPeriod] = useState('30');

  const handleChange = (event: SelectChangeEvent) => {
    setPeriod(event.target.value);
  };

  return (
    <Stack
      direction="row"
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 3,
        paddingY: 2,
        paddingX: 3,
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Select
          value={period}
          onChange={handleChange}
          variant="standard"
          size="small"
        >
          <MenuItem value="7">
            Last <br />7 days
          </MenuItem>
          <MenuItem value="30">
            Last <br />
            30 days
          </MenuItem>
          <MenuItem value="90">
            Last
            <br /> 90 days
          </MenuItem>
        </Select>
      </Box>

      <Divider
        orientation="vertical"
        sx={{
          backgroundColor: 'primary.contrastText',
          opacity: 0.1,
          width: '1px',
        }}
      />

      <Box>
        <Typography variant="body2">Transactions</Typography>
        <Typography variant="subtitle2" fontWeight="bold">
          54
        </Typography>
      </Box>

      <Box>
        <Typography variant="body2">Total spent</Typography>
        <Typography variant="subtitle2" fontWeight="bold">
          {formatCurrency(10890.5)}
        </Typography>
      </Box>

      <Box>
        <Typography variant="body2">Total received</Typography>
        <Typography variant="subtitle2" fontWeight="bold">
          {formatCurrency(20120.2)}
        </Typography>
      </Box>
    </Stack>
  );
}
