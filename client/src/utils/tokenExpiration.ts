import jwtDecode, { JwtPayload } from "jwt-decode";
import { generateAccessTokenByRefreshToken } from "../api/generateAccessTokenByRefreshToken";

export const handleAccessTokenRefresh = async () => {
  let res;
  try {
    res = await generateAccessTokenByRefreshToken();
  } catch (err) {
    console.log(err);
  }
  return res;
};

export const getAccessTokenExpiration = (token: string) => {
  const decodedToken: JwtPayload = jwtDecode(token);
  return decodedToken.exp;
};
