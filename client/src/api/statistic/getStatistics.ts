import { httpClient } from "../index";

export const getStatistics = async (userId: any) => {
  let response;
  try {
    response = await httpClient.get(
      `http://localhost:8080/api/statistics/${userId}`
    );
  } catch (error) {}
  return response;
};
