import { httpClientForCredentials } from "../index";

export const deleteTopic = async (topicId: string, token: any) => {
  let response;
  try {
    response = await httpClientForCredentials.delete(
      `${import.meta.env.VITE_SERVER_URL}/topics/${topicId}`,
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
