import { httpClient } from "../index";

export const getStatisticsDay = async (userId: string, day: string) => {
  let response;
  try {
    response = await httpClient.get(
      `${import.meta.env.VITE_SERVER_URL}/statistics/${userId}/${day}`
    );
  } catch (err) {
    console.log(err.response);
    const message = err.response.data.message;
    return message;
  }
  return response;
};
