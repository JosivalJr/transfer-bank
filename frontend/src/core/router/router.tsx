import { useMemo } from 'react';
import { useRoutes } from 'react-router-dom';

import { AUTHENTICATED_ROUTES, UNAUTHENTICATED_ROUTES } from './routes';
import { RequiredAuth } from './hocs';
import { toRouter } from './mappers';
import { Authenticated, Unauthenticated } from '@/shared/layout';

export function Router() {
  const { authenticatedRoutes, unauthenticatedRoutes } = useMemo(
    () => ({
      authenticatedRoutes: toRouter(AUTHENTICATED_ROUTES),
      unauthenticatedRoutes: toRouter(UNAUTHENTICATED_ROUTES),
    }),
    [],
  );

  return useRoutes([
    {
      element: <Unauthenticated />,
      children: unauthenticatedRoutes,
    },
    {
      element: <RequiredAuth />,
      children: [
        {
          element: <Authenticated />,
          children: authenticatedRoutes,
        },
      ],
    },
  ]);
}
