import { httpClientForCredentials } from "./index";

export const signUp = async (params: any) => {
  let response;
  try {
    response = await httpClientForCredentials.post(
      "http://3.39.190.28:8080/api/user/signup",
      {
        name: params.name,
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
