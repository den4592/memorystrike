import { httpClient } from "../index";

export const getStatistics = async (userId: any) => {
  let response;
  try {
    response = await httpClient.get(
      `${import.meta.env.VITE_SERVER_URL}/statistics/${userId}`
    );
  } catch (err) {
    console.log(err.response);
    const message = err.response.data.message;
    return message;
  }
  return response;
};
