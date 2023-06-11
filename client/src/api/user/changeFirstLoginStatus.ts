import { httpClientForCredentials } from "../index";

export const changeFirstLoginStatus = async (
  userId: string,
  token: string | null
) => {
  let response;
  try {
    response = await httpClientForCredentials.post(
      `${import.meta.env.VITE_SERVER_URL}/user/${userId}`,
      {
        headers: { Authorization: "Bearer" + token },
      }
    );
  } catch (err) {
    console.log(err.response);
    const message = err.response.data.message;
    return message;
  }
  return response;
};
