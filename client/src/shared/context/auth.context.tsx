import { createContext } from "react";

export type AuthContextType = {
  token: string | null;
  userId: string | null;
  login: (userId: string | null, token: string | null) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  userId: null,
  login: (userId, token) => {},
  logout: () => {},
});
