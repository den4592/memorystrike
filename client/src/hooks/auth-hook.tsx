import { useCallback, useEffect, useState } from "react";

let logoutTimer: string | number | NodeJS.Timeout | undefined;

const useAuth = () => {
  const [token, setToken] = useState<any>(false);
  const [userId, setUserId] = useState<any>(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>();

  const login = useCallback(
    (uid: boolean, token: boolean, expirationDate?: Date) => {
      setToken(token);
      setUserId(uid);
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
          token: token,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData")!);
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    } else {
      logout();
    }
  }, [login, logout]);

  return { token, login, logout, userId };
};

export default useAuth;
