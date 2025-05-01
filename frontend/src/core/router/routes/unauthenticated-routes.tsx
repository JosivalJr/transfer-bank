import { EUnauthenticatedPath } from '../domain/enums/unauthenticated-path.enum';
import { Route } from '../domain/interfaces';

export const UNAUTHENTICATED_ROUTES: Array<Route> = [
  {
    name: 'Acessar',
    element: <h1>Login</h1>,
    path: EUnauthenticatedPath.LOGIN,
  },
  {
    name: 'Recuperar Senha',
    path: EUnauthenticatedPath.RECOVER,
    element: <h1>Recover</h1>,
  },
  {
    name: 'Recuperação de Senha',
    path: EUnauthenticatedPath.RESET,
    element: <h1>Reset</h1>,
  },
];
