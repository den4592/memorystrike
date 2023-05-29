import { httpClientForCredentials } from "./index";

export const logIn = async (params: any) => {
  let response;
  try {
    response = await httpClientForCredentials.post(
      "http://localhost:8080/api/user/login",
      {
        email: params.email,
        password: params.password,
      }
    );
  } catch (error) {}
  return response;
};
