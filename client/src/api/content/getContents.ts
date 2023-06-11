import { httpClient } from "../index";

export const getContents = async (userId: string) => {
  let response;
  try {
    response = await httpClient.get(
      `${import.meta.env.VITE_SERVER_URL}/contents/user/${userId}`
    );
  } catch (err) {
    console.log(err.response);
    const message = err.response.data.message;
    return message;
  }
  return response;
};
