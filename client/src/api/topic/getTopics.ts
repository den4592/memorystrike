import { httpClientForCredentials } from "../index";

export const getTopics = async (contentId: any) => {
  let response;
  try {
    response = await httpClientForCredentials.get(
      `http://localhost:8080/api/topics/${contentId}`
    );
  } catch (error) {}
  return response;
};
