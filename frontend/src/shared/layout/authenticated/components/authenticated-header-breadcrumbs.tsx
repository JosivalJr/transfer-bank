import { Link as LinkRouter, useLocation, useParams } from 'react-router-dom';
import { Breadcrumbs, Link, Typography } from '@mui/material';

import { toBreadcrumbs } from '@/core/router';
import { AUTHENTICATED_ROUTES } from '@/core/router/routes';

export const BREADCRUMBS = toBreadcrumbs(AUTHENTICATED_ROUTES);

export function AuthenticatedHeaderBreadcrumbs() {
  const { id } = useParams();
  const { pathname } = useLocation();

  const pathnames: Array<string> = pathname.split('/').reduce((prev, route) => {
    if (route) prev.push(!isNaN(route as any) ? ':id' : route);

    return prev;
  }, [] as Array<string>);

  return (
    <Breadcrumbs className="custom-breadcrumbs">
      {pathnames.map((_pathname, index) => {
        const last: boolean = index === pathnames.length - 1;
        const to: string = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography
            key={to}
            color="primary.contrastText"
            variant="h3"
            fontWeight="bold"
          >
            {BREADCRUMBS[to]}
          </Typography>
        ) : (
          <Link
            key={to}
            underline="hover"
            component={LinkRouter}
            color="primary.contrastText"
            to={to.includes(':id') ? to.replace(':id', id ?? '') : to}
          >
            <Typography variant="h3" fontWeight="bold">
              {BREADCRUMBS[to]}
            </Typography>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
