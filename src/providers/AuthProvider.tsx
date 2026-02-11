import {
  authRoutes,
  authVerificationRoutes,
  DEFAULT_AUTH_REDIRECT_ROUTE,
  DEFAULT_REDIRECT_ROUTE,
  publicRoutes,
} from "@/data/routes.data";
import api from "@/lib/api";
import { useAuth } from "@/stores";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useEffect, useLayoutEffect } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";

type AuthProviderProps = {
  children: React.ReactNode;
};

interface AxiosConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setIsLoading, setToken, token, id, setUserDataError, setUser } =
    useAuth((s) => s);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.post("/auth/refresh-token");
        setToken(data.token.accessToken);
      } catch {
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, [setToken, setIsLoading]);

  useEffect(() => {
    const fetchUser = async () => {
      if (token && !id) {
        try {
          const { data } = await api.get("/user/me");
          setUser({
            id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            profilePicture: data.user.profilePicture,
            authProvider: data.user.authProvider,
            username: data.user.username,
          });
          setUserDataError(false);
        } catch {
          setUserDataError(true);
        }
      }
    };

    fetchUser();
  }, [id, token, setUserDataError, setUser]);

  useLayoutEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config: AxiosConfig) => {
        config.headers.Authorization =
          !config._retry && token
            ? `Bearer ${token}`
            : config.headers.Authorization;

        return config;
      },
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosConfig;

        if (!originalRequest) return Promise.reject(error);

        if (originalRequest.url === "/auth/refresh-token")
          return Promise.reject(error);

        if (
          error.status === 401 &&
          (error.response?.data as { message: string })?.message ===
            "User not authenticated"
        ) {
          try {
            const { data } = await api.get("/auth/refresh-token");
            setToken(data.accessToken);

            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            originalRequest._retry = true;
            return api(originalRequest);
          } catch {
            setToken(null);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [setToken]);

  useLayoutEffect(() => {
    const isPublicRoute = publicRoutes.some((route) =>
      matchPath({ path: route, end: true }, pathname),
    );

    const isAuthRoute = authRoutes.some((route) =>
      matchPath({ path: route, end: true }, pathname),
    );

    const isAuthVerificationRoute = authVerificationRoutes.some((route) =>
      matchPath({ path: route, end: true }, pathname),
    );

    if (token === undefined) return;
    if (isAuthRoute && !token) return;
    if (token === null && !isPublicRoute) {
      navigate(DEFAULT_AUTH_REDIRECT_ROUTE);
      return;
    }

    if (token && isAuthVerificationRoute) return;

    if (token && isAuthRoute) {
      navigate(DEFAULT_REDIRECT_ROUTE);
    }
  }, [token, pathname, navigate]);

  return <>{children}</>;
}
