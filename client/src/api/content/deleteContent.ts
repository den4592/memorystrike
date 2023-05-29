import { httpClientForCredentials } from "../index";

export const deleteContent = async (
  params: any,
  contentId: string,
  token: any
) => {
  let response;
  try {
    response = await httpClientForCredentials.delete(
      `http://localhost:8080/api/contents/${contentId}`,
      {
        data: { params },
        headers: { Authorization: "Bearer" + token },
      }
    );
  } catch (error) {}
  return response;
};
