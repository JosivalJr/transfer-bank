import {
  Login,
  CreateAccount,
  RecoverPassword,
  ResetPassword,
} from '@/modules/auth/pages';
import { EUnauthenticatedPath } from '../domain/enums/unauthenticated-path.enum';
import { Route } from '../domain/interfaces';

export const UNAUTHENTICATED_ROUTES: Array<Route> = [
  {
    name: 'Access',
    element: <Login />,
    path: EUnauthenticatedPath.LOGIN,
  },
  {
    name: 'Create Account',
    element: <CreateAccount />,
    path: EUnauthenticatedPath.CREATE_ACCOUNT,
  },
  {
    name: 'Recover Password',
    path: EUnauthenticatedPath.RECOVER,
    element: <RecoverPassword />,
  },
  {
    name: 'Create new Password',
    path: EUnauthenticatedPath.RESET,
    element: <ResetPassword />,
  },
];
