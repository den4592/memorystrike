import { httpClientForCredentials } from "../index";

export const editContent = async (params: any, id: string, token: any) => {
  let response;
  try {
    response = await httpClientForCredentials.patch(
      `http://localhost:8080/api/contents/${id}`,
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
