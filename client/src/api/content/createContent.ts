import { ContentParams } from "../../types/contents";
import { httpClientForCredentials } from "../index";

export const createContent = async (
  params: ContentParams,
  token: string | null
) => {
  let response;
  try {
    response = await httpClientForCredentials.post(
      `${import.meta.env.VITE_SERVER_URL}/contents`,
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
