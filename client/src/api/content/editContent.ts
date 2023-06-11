import { ContentParams } from "../../types/contents";
import { httpClientForCredentials } from "../index";

export const editContent = async (
  params: ContentParams,
  id: string,
  token: string | null
) => {
  let response;
  try {
    response = await httpClientForCredentials.patch(
      `${import.meta.env.VITE_SERVER_URL}/contents/${id}`,
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
