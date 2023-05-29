import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
  userId: null,
  login: (userId: boolean, token: boolean, expirationDate?: Date) => {},
  logout: () => {},
});
