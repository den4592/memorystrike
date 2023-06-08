import { httpClientForCredentials } from "./index";

export const logIn = async (params: any) => {
  let response;
  try {
    response = await httpClientForCredentials.post(
      "https://api.memorystrike.com/api/user/login",
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
