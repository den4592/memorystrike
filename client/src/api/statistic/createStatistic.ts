import { httpClientForCredentials } from "../index";

export const createStatistic = async (params: any, token: any) => {
  let response;
  try {
    response = await httpClientForCredentials.post(
      "http://localhost:8080/api/statistics",
      params,
      {
        headers: { Authorization: "Bearer" + token },
      }
    );
  } catch (error) {}
  return response;
};
