import axios from "axios";

export const httpClient = axios.create({
  headers: {
    "Access-Control-Allow-Origin": import.meta.env.VITE_SERVER_URL, // 서버 domain
  },
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export const httpClientForCredentials = axios.create({
  headers: {
    "Access-Control-Allow-Origin": import.meta.env.VITE_SERVER_URL, // 서버 domain
  },
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});
