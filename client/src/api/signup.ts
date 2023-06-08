import { httpClientForCredentials } from "./index";

export const signUp = async (params: any) => {
  let response;
  try {
    response = await httpClientForCredentials.post(
      `${import.meta.env.VITE_SERVER_URL}/user/signup`,
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
