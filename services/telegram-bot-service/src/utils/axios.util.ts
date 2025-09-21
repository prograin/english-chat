import axios, { AxiosInstance } from "axios";
import http from "http";
import https from "https";

const localAxiosInstance: AxiosInstance = axios.create({
  proxy: false,
  httpAgent: new http.Agent(),
  httpsAgent: new https.Agent(),
});

export default localAxiosInstance;