export const userMapping = {
  settings: {
    number_of_shards: 1,
    number_of_replicas: 1,
    analysis: {
      normalizer: {
        lowercase_normalizer: {
          type: "custom",
          filter: ["lowercase"],
        },
      },
      filter: {
        autocompletion_filter: {
          type: "edge_ngram",
          min_gram: 1,
          max_gram: 20,
        },
      },
      analyzer: {
        autocompletion_analyzer: {
          type: "custom",
          tokenizer: "standard",
          filter: ["lowercase", "autocompletion_filter"],
        },
      },
    },
  },
  mappings: {
    properties: {
      user_id: { type: "integer" },
      age: { type: "integer" },
      gender: { type: "keyword", normalizer: "lowercase_normalizer" },
      career: { type: "keyword", normalizer: "lowercase_normalizer" },
      interests: { type: "keyword", normalizer: "lowercase_normalizer" },
      last_active: { type: "date" },
      username: { type: "text", analyzer: "autocompletion_analyzer", search_analyzer: "standard" },
    },
  },
};
