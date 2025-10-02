import axios from "axios";
import http from "http";
import https from "https";

export const AdminAxiosInstance = axios.create({
  proxy: false,
  httpAgent: new http.Agent(),
  httpsAgent: new https.Agent(),
});

AdminAxiosInstance.interceptors.request.use((config) => {
  const token = process.env.ADMIN_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
