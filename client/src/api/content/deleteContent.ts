import { httpClientForCredentials } from "../index";

export const deleteContent = async (contentId: string, token: any) => {
  let response;
  try {
    response = await httpClientForCredentials.delete(
      `http://localhost:8080/api/contents/${contentId}`,
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
