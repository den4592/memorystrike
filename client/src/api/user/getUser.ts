import { httpClientForCredentials } from "../index";

export const getUser = async (userId: string) => {
  let response;
  try {
    response = await httpClientForCredentials.get(
      `${import.meta.env.VITE_SERVER_URL}/user/${userId}`
    );
  } catch (err) {
    console.log(err.response);
    const message = err.response.data.message;
    return message;
  }
  return response;
};
