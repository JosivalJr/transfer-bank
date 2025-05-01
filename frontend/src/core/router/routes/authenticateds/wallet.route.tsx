import { Wallet } from '@mui/icons-material';

import { Route } from '../../domain/interfaces';
import { EAuthenticatedPath } from '../../domain/enums/authenticated-path.enum';

export const WALLET_ROUTE: Route = {
  name: 'Wallet',
  icon: <Wallet />,
  path: EAuthenticatedPath.WALLET,
  element: <h1> Wallet </h1>,
};
