import { Grid } from '@mui/material';
import {
  CardList,
  WalletActions,
  TotalBalanceCard,
  TransactionSummary,
  TransactionsChart,
} from '../components';

export function WalletPage() {
  return (
    <Grid container spacing={2}>
      <Grid container size={12} spacing={2}>
        <Grid size={{ lg: 4, md: 4, sm: 12, xs: 12 }}>
          <TotalBalanceCard />
        </Grid>

        <Grid container size={{ lg: 8, md: 8, sm: 12, xs: 12 }}>
          <Grid size={12}>
            <WalletActions />
          </Grid>

          <Grid size={12}>
            <TransactionSummary />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        size="auto"
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 3,
          paddingY: 2,
          paddingX: 3,
        }}
      >
        <CardList />
      </Grid>

      <Grid
        size="grow"
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 3,
          paddingY: 2,
          paddingX: 3,
        }}
      >
        <TransactionsChart />
      </Grid>
    </Grid>
  );
}
