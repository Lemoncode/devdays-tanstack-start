import * as api from "./api";
import { storage } from "./storage";

export interface Auth {
  isAuthenticated: boolean;
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchAuthUser: () => Promise<void>;
}

export const auth: Auth = {
  isAuthenticated: storage.isAuthenticated,
  user: storage.user,
  login: async (email: string, password: string) => {
    const user = await api.login(email, password);
    auth.user = user;
    auth.isAuthenticated = true;
    storage.set(auth);
  },
  logout: async () => {
    await api.logout();
    auth.isAuthenticated = false;
    auth.user = null;
    storage.set(auth);
  },
  fetchAuthUser: async () => {
    const user = await api.getAuthUser();
    auth.user = user;
    auth.isAuthenticated = !!user;
    storage.set(auth);
  },
};
