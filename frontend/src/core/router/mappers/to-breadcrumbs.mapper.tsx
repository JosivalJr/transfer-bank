import { Route } from '../domain/interfaces';

function toBreadcrumbPath(
  routes: Array<Route>,
  pathPrefix?: string,
): Record<string, string> {
  return routes.reduce(
    (prev, route) => {
      const children = route.children
        ? toBreadcrumbPath(
            route.children,
            route.path ? `${pathPrefix}/${route.path ?? ''}` : pathPrefix,
          )
        : {};

      const path = [pathPrefix, route.path].filter((x) => x).join('/');

      return {
        ...prev,
        [path]: route.name ?? '',
        ...children,
      };
    },
    {} as Record<string, string>,
  );
}

export function toBreadcrumbs(routes: Array<Route>): Record<string, string> {
  return routes.reduce(
    (prev, route) => {
      const children = route.children
        ? toBreadcrumbPath(route.children, `${route.path ?? ''}`)
        : {};

      return {
        ...prev,
        [`${route.path?.includes('/') ? route.path : '/' + route.path}`]:
          route.name ?? '',
        ...children,
      };
    },
    {} as Record<string, string>,
  );
}
