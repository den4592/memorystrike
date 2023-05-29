import { httpClientForCredentials } from "./index";

export const signUp = async (params: any) => {
  let result: any = { success: false };
  try {
    const response = await httpClientForCredentials.post(
      "http://localhost:8080/api/user/signup",
      {
        name: params.name,
        email: params.email,
        password: params.password,
      }
    );
    if (response.status === 201) {
      result = { success: true };
    }
  } catch (error) {
    result = { success: false };
  }
  return result;
};
