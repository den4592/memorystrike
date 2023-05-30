import { httpClientForCredentials } from "../index";

export const editTopic = async (params: any, topicId: string, token: any) => {
  let response;
  try {
    response = await httpClientForCredentials.post(
      `http://localhost:8080/api/topics/${topicId}`,
      params,
      {
        headers: { Authorization: "Bearer" + token },
      }
    );
  } catch (error) {}
  return response;
};
