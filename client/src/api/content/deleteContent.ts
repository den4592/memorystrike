import { httpClientForCredentials } from "../index";

export const deleteContent = async (
  contentId: string,
  token: string | null
) => {
  let response;
  try {
    response = await httpClientForCredentials.delete(
      `${import.meta.env.VITE_SERVER_URL}/contents/${contentId}`,
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
