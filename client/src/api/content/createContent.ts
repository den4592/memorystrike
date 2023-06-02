import { httpClientForCredentials } from "../index";

export const createContent = async (params: any, token: any) => {
  let response;
  try {
    response = await httpClientForCredentials.post(
      "http://localhost:8080/api/contents",
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
