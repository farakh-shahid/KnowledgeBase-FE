import { TokenProps } from '@/interfaces/authProps';
import { UserProps } from '@/interfaces/userProps';
import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';

const cookies = new Cookies();

export const storeTokens = (
  accessToken: string,
  accessTokenExpiresAt: Date,
  refreshToken: string
) => {
  cookies.set('accessToken', accessToken);
  cookies.set('refreshToken', refreshToken);
  cookies.set('accessTokenExpiresAt', accessTokenExpiresAt);
};

export const readTokensFromCookies = (): TokenProps | undefined => {
  const tokens = {
    accessToken: cookies.get('accessToken') || null,
    refreshToken: cookies.get('refreshToken') || null,
    accessTokenExpiresAt: cookies.get('accessTokenExpiresAt') || null,
  };
  if (!tokens) return undefined;
  return tokens;
};

export const readUserFromToken = (
  accessToken: string = ''
): UserProps | null => {
  if (!accessToken) {
    accessToken = cookies.get('accessToken') || '';
  }
  if (accessToken && accessToken !== 'undefined') {
    const accessDecoded: any = jwt(accessToken);
    return accessDecoded;
  }
  return null;
};

export const deleteTokensFromCookies = () => {
  const tokens = readTokensFromCookies();
  if (tokens) {
    cookies.remove('accessToken', { path: '/' });
    cookies.remove('refreshToken', { path: '/' });
    cookies.remove('accessTokenExpiresAt', { path: '/' });
  }
};

export const setBearerHeader = (accessToken: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};
