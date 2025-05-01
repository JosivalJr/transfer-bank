import { RouteObject } from 'react-router-dom';
import { Route } from '../domain/interfaces';

function toRouteObject(route: Route): RouteObject {
  return {
    index: route.index,
    path: route.path,
    element: route.element,
    children: route.children?.map((children) => toRouteObject(children)),
  } as RouteObject;
}

export function toRouter(routes: Array<Route>) {
  return routes.map((route) => toRouteObject(route));
}
