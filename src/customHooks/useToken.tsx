import { StoreContext, StoreContextState } from '@/contextStore/storeProvider';
import { TokenProps } from '@/interfaces/authProps';
import { UserProps } from '@/interfaces/userProps';
import axios, { AxiosError } from 'axios';
import { MutableRefObject, useCallback, useContext, useEffect, useRef } from 'react';
import { refreshTokens } from '../services/api/userService';
import {
  deleteTokensFromCookies,
  readTokensFromCookies,
  setBearerHeader,
  storeTokens,
} from '../utils/tokens';
import { useRouter } from "next/router";

export default function useRefreshTokens(
  tokensKey: string = 'tokens',
  onRefreshTokenExpiry: Function
) {
  const accessTokenRef: MutableRefObject<string> = useRef<string>('');
  const refreshTokenRef: MutableRefObject<string> = useRef<string>('');
  const axiosInterceptorRef: MutableRefObject<any> = useRef();
  const silentRefreshTimeoutRef: MutableRefObject<any> = useRef();
  const isRefreshingRef: MutableRefObject<Boolean> = useRef(false);
  const refreshSubscribersRef: MutableRefObject<any[]> = useRef([]);
  const router = useRouter();
  const store = useContext<StoreContextState>(StoreContext);
  const [, setUser] = store.user;

  useEffect(() => {
    try {
      const tokens = readTokensFromCookies()
      if (tokens) {
        const { accessToken, refreshToken, accessTokenExpiresAt } = tokens
        if (accessToken && refreshToken && accessTokenExpiresAt) {
          setTokens(accessToken, accessTokenExpiresAt, refreshToken)
        }
      }
    } catch (error) {
      console.log('Error loading tokens from cookies', error);
    }

    axiosInterceptorRef.current = axios.interceptors.response.use(
      (response) => response,
      onAuthorizationError
    );

    return () => {
      if (axiosInterceptorRef.current) {
        axios.interceptors.response.eject(axiosInterceptorRef.current);
        axiosInterceptorRef.current = null;
      }
    };
  }, []);

  const onAuthorizationError = async (error: any) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    if (status !== 401) return Promise.reject(error);
    if (!isRefreshingRef.current) {
      isRefreshingRef.current = true;
      performTokenRefresh()
        .then((refreshedTokens: TokenProps | any) => {
          isRefreshingRef.current = false;
          const { accessToken, refreshToken, accessTokenExpiresAt } =
            refreshedTokens;

          setTokens(accessToken, accessTokenExpiresAt, refreshToken);
          onRefreshed(refreshedTokens.accessToken);
        })
        .catch((_err) => {
          rejectRefreshSubscribers(_err);
          cleanUpTokens();
        });
    }

    const retryOriginalRequest = new Promise((resolve, reject) => {
      subscribeTokenRefresh((accessToken: string, error?: AxiosError) => {
        if (error) return reject(error);

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        resolve(axios.request(originalRequest));
      });
    });

    return retryOriginalRequest;
  };

  const subscribeTokenRefresh = (cb: Function) => {
    refreshSubscribersRef.current.push(cb);
  };

  const onRefreshed = async (accessToken: string) => {
    refreshSubscribersRef.current.forEach((cb) => cb(accessToken));
    refreshSubscribersRef.current = [];
  };

  const rejectRefreshSubscribers = async (error: AxiosError) => {
    refreshSubscribersRef.current.forEach((cb) => cb(null, error));
    refreshSubscribersRef.current = [];
  };

  const performTokenRefresh = async () => {
    const accessToken = accessTokenRef.current;
    const refreshToken = refreshTokenRef.current;
    return await refreshTokens(accessToken, refreshToken);
  };

  const silentRefresh = (accessTokenExpiresAt: Date) => {
    if (silentRefreshTimeoutRef.current)
      clearTimeout(silentRefreshTimeoutRef.current);

    const tokenExpiry = new Date(accessTokenExpiresAt).valueOf();
    const now = Date.now();
    const refreshTime = tokenExpiry - now;
    silentRefreshTimeoutRef.current = setTimeout(async () => {
      try {
        const refreshedTokens: TokenProps | any = await performTokenRefresh();
        const { accessToken, refreshToken, accessTokenExpiresAt } =
          refreshedTokens;
        setTokens(accessToken, accessTokenExpiresAt, refreshToken);
      } catch (error) {
        cleanUpTokens()
        setUser(new UserProps());
        router.push('/login');
      }
    }, refreshTime);
  };

  const cleanUpTokens = useCallback(async () => {
    setBearerHeader('');
    deleteTokensFromCookies();
    accessTokenRef.current = '';
    refreshTokenRef.current = '';
    isRefreshingRef.current = false;
    refreshSubscribersRef.current = [];

    if (silentRefreshTimeoutRef.current) {
      clearTimeout(silentRefreshTimeoutRef.current);
      silentRefreshTimeoutRef.current = null;
    }
  }, []);

  const setTokens = useCallback(async (accessToken: string, accessTokenExpiresAt: Date, refreshToken: string) => {
  
    setBearerHeader(accessToken);
    accessTokenRef.current = accessToken;
    refreshTokenRef.current = refreshToken;
    
    silentRefresh(accessTokenExpiresAt);
    storeTokens(accessToken, accessTokenExpiresAt, refreshToken)
  }, []);

  return { accessTokenRef, refreshTokenRef, setTokens, cleanUpTokens };
}
