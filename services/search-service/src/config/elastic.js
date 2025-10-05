import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";
dotenv.config({ path: ".search.env" });

const esClient = new Client({
  node: `https://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`,
  auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default esClient;
