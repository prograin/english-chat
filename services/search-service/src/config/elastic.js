import { Client } from "@elastic/elasticsearch";

const esClient = new Client({
  node: `https://${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`,
  auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  },
});

export default esClient;
