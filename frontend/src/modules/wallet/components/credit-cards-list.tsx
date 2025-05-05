import { useAuth } from '@/modules/auth/hooks';
import { Grid, Typography } from '@mui/material';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

export function CardList() {
  const { user } = useAuth();

  const cards = [
    {
      number: 5466546654665466,
      expiry: '06/28',
      balance: 1900.1,
    },
    {
      number: 4901490149014901,
      expiry: '01/26',
      balance: 1200.2,
    },
  ];

  return (
    <Grid container spacing={2} flexDirection="column">
      <Grid>
        <Typography variant="subtitle2">Credit Cards</Typography>
      </Grid>
      {cards.map((card) => (
        <Grid size="auto">
          <Cards
            number={card.number}
            expiry={30}
            cvc={330}
            name={user?.name || 'John Doe'}
          />
        </Grid>
      ))}
    </Grid>
  );
}
