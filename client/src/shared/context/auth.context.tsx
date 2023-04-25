import { createContext } from "react";

export interface IAuthContext {
  token: string;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
