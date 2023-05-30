import { httpClientForCredentials } from "../index";

export const createTopic = async (params: any, token: any) => {
  let response;
  console.log(params);
  try {
    response = await httpClientForCredentials.post(
      "http://localhost:8080/api/topics",
      params,
      {
        headers: { Authorization: "Bearer" + token },
      }
    );
  } catch (error) {}
  return response;
};
