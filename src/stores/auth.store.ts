import { create } from "zustand";

type TokenType = string | null | undefined;
type AuthState = {
  token: TokenType;
  isLoading: boolean;
  setToken: (token: TokenType) => void;
  setIsLoading: (isLoading: boolean) => void;
  id: string | null;
  setId: (id: string | null) => void;
  name: string | null;
  setName: (name: string | null) => void;
  email: string | null;
  setEmail: (email: string | null) => void;
  profilePicture: string | null;
  setProfilePicture: (profilePicture: string | null) => void;
  authProvider: "local" | "google" | null;
  setAuthProvider: (authProvider: "local" | "google" | null) => void;
  username: string | null;
  setUsername: (username: string | null) => void;
  setUser: (user: {
    id: string;
    name: string;
    email: string;
    profilePicture: string;
    authProvider: "local" | "google";
    username: string | null;
  }) => void;
  clearUser: () => void;
  userDataError: boolean;
  setUserDataError: (error: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const useAuth = create<AuthState>((set) => ({
  isLoading: false,
  token: undefined,
  isLoggedIn: false,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setToken: (token) => set(() => ({ token })),
  id: null,
  setId: (id) => set(() => ({ id })),
  name: null,
  setName: (name) => set(() => ({ name })),
  email: null,
  setEmail: (email) => set(() => ({ email })),
  profilePicture: null,
  setProfilePicture: (profilePicture) => set(() => ({ profilePicture })),
  authProvider: null,
  setAuthProvider: (authProvider) => set(() => ({ authProvider })),
  username: null,
  setUsername: (username) => set(() => ({ username })),
  setUser: (user) =>
    set(() => ({
      id: user.id,
      name: user.name,
      email: user.email,
      isLoggedIn: true,
      profilePicture: user.profilePicture,
      authProvider: user.authProvider,
      username: user.username,
    })),
  clearUser: () =>
    set(() => ({
      id: null,
      name: null,
      email: null,
      token: null,
      isLoading: false,
      isLoggedIn: false,
    })),
  userDataError: false,
  setUserDataError: (error) => set(() => ({ userDataError: error })),
  setIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
}));
