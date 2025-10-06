import axios, { AxiosInstance } from "axios";
import http from "http";
import https from "https";

export const AdminAxiosInstance: AxiosInstance = axios.create({
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

export const UserAxiosInstance: AxiosInstance = axios.create({
  proxy: false,
  httpAgent: new http.Agent(),
  httpsAgent: new https.Agent(),
});

UserAxiosInstance.interceptors.request.use((config) => {
  if (config.headers?.token) {
    config.headers.Authorization = `Bearer ${config.headers.token}`;
    delete config.headers.token;
  }
  return config;
});
