import { SidebarItem } from '@/shared/domain/types';
import { Route } from '../domain/interfaces';

function toSidebarItems(route: Route): SidebarItem {
  if (route.index || route.hidden) return {} as SidebarItem;

  return {
    name: route.name,
    path: route.path,
    icon: route.icon,
    children: [],
  } as SidebarItem;
}

export function toSidebar(routes: Array<Route>): Array<SidebarItem> {
  return routes.map((route) => toSidebarItems(route)).filter((r) => !!r.name);
}
