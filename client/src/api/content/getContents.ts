import { httpClient } from "../index";

export const getContents = async (userId: any) => {
  let response;
  try {
    response = await httpClient.get(
      `http://localhost:8080/api/contents/user/${userId}`
    );
  } catch (error) {}
  return response;
};
