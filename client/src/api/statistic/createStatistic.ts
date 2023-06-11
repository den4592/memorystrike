import { StatisticParams } from "../../types/statistics";
import { httpClientForCredentials } from "../index";

export const createStatistic = async (
  params: StatisticParams,
  token: string | null
) => {
  let response;
  try {
    response = await httpClientForCredentials.post(
      `${import.meta.env.VITE_SERVER_URL}/statistics`,
      params,
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
