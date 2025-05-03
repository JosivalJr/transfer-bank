import { LoginResponseDTO } from '@/modules/auth/domain/dto';
import { EUnauthenticatedPath } from '../router';
import { Client } from './client';

export function getToken(): string {
  const item: string | null = localStorage.getItem('@transfer-bank/auth');
  const token: string | undefined = item ? JSON.parse(item)['token'] : 'none';

  return token ?? 'none';
}

export async function refreshToken() {
  const item: string | null = localStorage.getItem('@transfer-bank/auth');
  const refreshToken: string | undefined = item
    ? JSON.parse(item)['refreshToken']
    : 'none';

  if (!refreshToken) {
    return localStorage.removeItem('@transfer-bank/auth');
  }

  const { status, data } = await Client.post<LoginResponseDTO>(
    '/auth/refresh',
    {
      refresh: refreshToken,
    },
  );

  if (status >= 200 && status < 300) {
    return localStorage.setItem('@transfer-bank/auth', JSON.stringify(data));
  }

  return localStorage.removeItem('@transfer-bank/auth');
}

export function redirect(message?: string) {
  if (
    !window.location.pathname
      .split('/')
      .some((path) =>
        [
          EUnauthenticatedPath.LOGIN,
          EUnauthenticatedPath.RECOVER,
          EUnauthenticatedPath.RESET,
        ].includes(('/' + path) as EUnauthenticatedPath),
      )
  ) {
    throw new Error(message || 'Unauthorized!');
  }
}
