import { getAllByTestId } from "@testing-library/react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { API } from "../api/fetcher";
import { UserClass } from "../models/models";

interface AuthStoreState {
  user: UserClass;
  _token: string;
  _refreshToken: string;
  _tokenTimeout: number;
  //
  login: (username: string, password: string) => Promise<boolean>;
  checkLogin: () => Promise<boolean>;
  _reLogin: () => Promise<boolean>;
  logout: () => Promise<boolean>;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set, get) => ({
      user: null,
      _token: null,
      _refreshToken: null,
      _tokenTimeout: 0,
      //
      //
      login: async (username: string, password: string) => {
        const { user, token, refreshToken } = await API.authLogin(
          username,
          password
        );
        if (user.id) {
          // const timeoutTimer = Date.now() + 30 * 60 * 1000;
          const timeoutTimer = Date.now() + 1 * 5 * 1000;
          set({
            user: user,
            _token: token,
            _refreshToken: refreshToken,
            _tokenTimeout: timeoutTimer,
          });
          return true;
        } else {
          set({
            user: null,
            _token: null,
            _refreshToken: null,
            _tokenTimeout: 0,
          });
          return false;
        }
      },
      //
      checkLogin: async () => {
        console.log("check login");
        if (Date.now() > get()._tokenTimeout) {
          console.log("reLogin required");
          const value = await get()._reLogin();
          console.log(`reLogin ${value}`);
          return value;
        } else {
          console.log(true);
          return true;
        }
      },
      //
      _reLogin: async () => {
        console.log("reLogin started");
        const refreshToken = get()._refreshToken;
        const { newToken, newRefreshToken } = await API.refreshToken(
          refreshToken
        );
        if (newToken && newRefreshToken) {
          // const timeoutTimer = Date.now() + 30 * 60 * 1000;
          const timeoutTimer = Date.now() + 1 * 5 * 1000;
          set({
            _token: newToken,
            _refreshToken: newRefreshToken,
            _tokenTimeout: timeoutTimer,
          });
          return true;
        } else {
          return false;
        }
      },
      //
      logout: async () => {
        set({
          user: null,
          _token: null,
          _refreshToken: null,
          _tokenTimeout: null,
        });
        console.log(get());
        return true;
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        token: state._token,
        _refreshToken: state._refreshToken,
        tokenTimeout: state._tokenTimeout,
      }),
    }
  )
);
