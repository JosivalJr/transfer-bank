import { PieChart } from '@mui/icons-material';

import { Route } from '../../domain/interfaces';
import { EAuthenticatedPath } from '../../domain/enums/authenticated-path.enum';

export const TRANSACTIONS_ROUTE: Route = {
  name: 'Transactions',
  icon: <PieChart />,
  path: EAuthenticatedPath.TRANSACTIONS,
  element: <h1> Transactions </h1>,
};
