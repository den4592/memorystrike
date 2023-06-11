import { TopicParams } from "../../types/topics";
import { httpClientForCredentials } from "../index";

export const createTopic = async (
  params: TopicParams,
  token: string | null
) => {
  let response;
  try {
    response = await httpClientForCredentials.post(
      `${import.meta.env.VITE_SERVER_URL}/topics`,
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
