import { Home } from '@mui/icons-material';

import { Route } from '../../domain/interfaces';
import { EAuthenticatedPath } from '../../domain/enums/authenticated-path.enum';

export const HOME_ROUTE: Route = {
  name: 'Home',
  icon: <Home />,
  path: EAuthenticatedPath.HOME,
  element: <h1> Home </h1>,
};
