import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
  login: (token: boolean, expirationDate: Date) => {},
  logout: () => {},
});
