import { httpClient } from "../index";

export const getStatisticsDay = async (userId: any, day: any) => {
  let response;
  try {
    response = await httpClient.get(
      `http://localhost:8080/api/statistics/${userId}/${day}`
    );
  } catch (err) {
    console.log(err.response);
    const message = err.response.data.message;
    return message;
  }
  return response;
};
