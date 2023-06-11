import { httpClient } from "./index";
import { LogIn } from "../types/user";

export const logIn = async (params: LogIn) => {
  let response;
  try {
    response = await httpClient.post(
      `${import.meta.env.VITE_SERVER_URL}/user/login`,
      {
        email: params.email,
        password: params.password,
      }
    );
  } catch (err) {
    console.log(err.response);
    const message = err.response.data.message;
    return message;
  }
  return response;
};
