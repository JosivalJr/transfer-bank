import { ReactNode } from 'react';
import { IndexRouteObject } from 'react-router-dom';

export interface Route extends Omit<IndexRouteObject, 'index' | 'children'> {
  name: string;
  icon?: ReactNode;
  index?: boolean;
  hidden?: boolean;
  children?: Array<Route>;
}
