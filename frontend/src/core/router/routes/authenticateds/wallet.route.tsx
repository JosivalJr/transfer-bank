import { Wallet } from '@mui/icons-material';

import { Route } from '../../domain/interfaces';
import { EAuthenticatedPath } from '../../domain/enums/authenticated-path.enum';
import { WalletPage } from '@/modules/wallet/pages/wallet';

export const WALLET_ROUTE: Route = {
  name: 'Wallet',
  icon: <Wallet />,
  path: EAuthenticatedPath.WALLET,
  element: <WalletPage />,
};
