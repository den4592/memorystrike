import { httpClientForCredentials } from "../index";

export const deleteTopic = async (topicId: string, token: any) => {
  let response;
  try {
    response = await httpClientForCredentials.delete(
      `http://localhost:8080/api/topics/${topicId}`,
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
