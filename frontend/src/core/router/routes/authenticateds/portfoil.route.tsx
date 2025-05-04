import { Badge } from '@mui/icons-material';

import { Route } from '../../domain/interfaces';
import { EAuthenticatedPath } from '../../domain/enums/authenticated-path.enum';

export const PORTIFOIL_ROUTE: Route = {
  name: 'Portifoil',
  icon: <Badge />,
  path: EAuthenticatedPath.PORTFOIL,
  element: <h1> Portifoil </h1>,
};
