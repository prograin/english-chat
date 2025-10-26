import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";
dotenv.config({ path: ".search.env" });

console.log("---------------");
console.log(process.env.ELASTIC_HOST, process.env.ELASTIC_PORT, process.env.ELASTIC_USERNAME, process.env.ELASTIC_PASSWORD);

const esClient = new Client({
  node: `http://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`, // <-- HTTP
  auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  },
  ...(process.env.NODE_ENV != "production" && {
    tls: {
      rejectUnauthorized: false,
    },
  }),
});

export default esClient;
