import { httpClientForCredentials } from "../index";

export const editContent = async (params: any, id: string, token: any) => {
  let response;
  try {
    response = await httpClientForCredentials.post(
      `http://localhost:8080/api/contents/${id}`,
      params,
      {
        headers: { Authorization: "Bearer" + token },
      }
    );
  } catch (error) {}
  return response;
};
