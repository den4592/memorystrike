import { useCallback, useEffect, useState } from "react";
import { generateAccessTokenByRefreshToken } from "../api/generateAccessTokenByRefreshToken";
import { getAccessTokenExpiration } from "../utils/tokenExpiration";

let logoutTimer: string | number | NodeJS.Timeout | undefined;

const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<any>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(
    null
  );

  const login = useCallback(
    (uid: string | null, token: string | null) => {
      //확인
      if (token !== null && uid !== null) {
        const tokenExpirationTime = new Date(
          getAccessTokenExpiration(token)! * 1000
        );
        setToken(token);
        setUserId(uid);
        setTokenExpirationDate(tokenExpirationTime);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            userId: uid,
            isLoggedIn: true,
            expiration: tokenExpirationTime?.toLocaleString(),
          })
        );
      }
    },
    [token]
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
      storedData?.isLoggedIn &&
      new Date(storedData?.expiration) > new Date()
    ) {
      const getToken = async () => {
        let res = await generateAccessTokenByRefreshToken();
        console.log(res);
        login(storedData?.userId, res.data.accessToken);
      };
      getToken();
    } else if (new Date(storedData?.expiration) < new Date()) {
      logout();
    }
  }, [token]);

  return { token, login, logout, userId, setToken, tokenExpirationDate };
};

export default useAuth;
