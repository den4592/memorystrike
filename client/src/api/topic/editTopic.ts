import { TopicParams } from "../../types/topics";
import { httpClientForCredentials } from "../index";

export const editTopic = async (
  params: TopicParams,
  topicId: string,
  token: string | null
) => {
  let response;
  try {
    response = await httpClientForCredentials.post(
      `${import.meta.env.VITE_SERVER_URL}/topics/${topicId}`,
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
