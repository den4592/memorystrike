import { httpClient } from "../index";

export const getTopics = async (contentId: any) => {
  let response;
  try {
    response = await httpClient.get(
      `http://localhost:8080/api/topics/${contentId}`
    );
  } catch (err) {
    console.log(err.response);
    const message = err.response.data.message;
    return message;
  }
  return response;
};
