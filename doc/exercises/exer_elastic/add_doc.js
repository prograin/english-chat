import esClient from "../../../services/search-service/src/config/elastic";

esClient.create({ index: "users", id: 1 }); //f exists it will raise error
esClient.index({ index: "users", id: 1 }); //f exists it won't raise error
