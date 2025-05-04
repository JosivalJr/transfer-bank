import { Navigate } from 'react-router-dom';

import { EAuthenticatedPath } from '../domain/enums/authenticated-path.enum';
import { Route } from '../domain/interfaces';

import {
  HOME_ROUTE,
  WALLET_ROUTE,
  TRANSACTIONS_ROUTE,
  PORTIFOIL_ROUTE,
} from './authenticateds';

export const AUTHENTICATED_ROUTES: Array<Route> = [
  {
    name: 'Redirect',
    hidden: true,
    path: '*',
    element: <Navigate to={EAuthenticatedPath.HOME} />,
  },
  HOME_ROUTE,
  TRANSACTIONS_ROUTE,
  PORTIFOIL_ROUTE,
  WALLET_ROUTE,
];
