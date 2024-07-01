import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { API } from "../api/fetcher";
import { UserClass } from "../models/models";

interface AuthStoreState {
  user: UserClass;
  token: string;
  refreshToken: string;
  //
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      //
      //
      login: async (username: string, password: string) => {
        const { user, token, refreshToken } = await API.authLogin(
          username,
          password
        );
        if (user.id) {
          set({ user: user, token: token, refreshToken: refreshToken });
          return true;
        } else {
          set({ user: null, token: null, refreshToken: null });
          return false;
        }
      },
      //
      logout: async () => {
        set({ user: null, token: null, refreshToken: null });
        return true;
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
