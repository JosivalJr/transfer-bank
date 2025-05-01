import { Navigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';

import { EAuthenticatedPath } from '../domain/enums/authenticated-path.enum';
import { Route } from '../domain/interfaces';

import { WALLET_ROUTE } from './authenticateds';

export const AUTHENTICATED_ROUTES: Array<Route> = [
  {
    name: 'Redirect',
    hidden: true,
    path: '*',
    element: <Navigate to={EAuthenticatedPath.HOME} />,
  },
  {
    name: 'Home',
    path: EAuthenticatedPath.HOME,
    icon: <Home />,
    element: <h1>Home Page</h1>,
  },
  WALLET_ROUTE,
];
