import axios, { AxiosError } from "axios";

//axios로 사용하지 않고, httpClientForCredentials로 사용
export const httpClientForCredentials = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:8080", // 서버 domain
  },
  baseURL: "http://localhost:8080",
  withCredentials: true,
});
