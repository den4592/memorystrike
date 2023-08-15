import { httpClientForCredentials } from "./index";

export const generateAccessTokenByRefreshToken = async () => {
  let response;
  try {
    response = await httpClientForCredentials.post(
      `${import.meta.env.VITE_LOCAL_SERVER_URL}/user/refresh`
    );
  } catch (err) {
    console.log(err.response);
    const message = err.response.data.message;
    return message;
  }
  return response;
};
