import { searchRepository } from "../repositories/search.repository.js";

export const termsSearchService = async (index, field, terms, pagination) => {
  const query = {
    query: {
      terms: { [field]: terms },
    },
    from: pagination.page * pagination.size,
    size: pagination.size,
    sort: [{ last_active: "asc" }],
  };

  const result = await searchRepository(index, query);
  if (result?.hits?.hits?.length) {
    return result.hits.hits.map((hit) => hit._id);
    ``;
  } else {
    const error = new Error("Search not found");
    error.status = 404;
    throw error;
  }
};

export const rangeSearchService = async (index, field, gte, lte, pagination) => {
  const rangeFilter = {};
  if (gte !== undefined) rangeFilter.gte = gte;
  if (lte !== undefined) rangeFilter.lte = lte;

  const query = {
    query: { range: { [field]: rangeFilter } },
    from: pagination.page * pagination.size,
    size: pagination.size,
    sort: [{ last_active: "asc" }],
  };

  const result = await searchRepository(index, query);
  if (result?.hits?.hits?.length) {
    return result.hits.hits.map((hit) => hit._id);
  } else {
    const error = new Error("Search not found");
    error.status = 404;
    throw error;
  }
};
