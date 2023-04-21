import { createContext } from "react";

export interface IAuthContext {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
