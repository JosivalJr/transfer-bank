import { ReactNode } from 'react';

type ItemChildren = {
  name: string;
  path: string;
};

export type SidebarItem = {
  icon: ReactNode;
  name: string;
  path: string;
  children?: Array<ItemChildren>;
};
