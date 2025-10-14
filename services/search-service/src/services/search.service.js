//LINK services\search-service\doc\examples\search.service.example.md

import { searchRepository } from "../repositories/search.repository.js";

export const termsSearchService = async (index, field, terms, pagination) => {
  const body = {
    query: {
      terms: { [field]: terms },
    },
    from: pagination.page * pagination.size,
    size: pagination.size,
    sort: [{ last_active: "asc" }],
  };

  const result = await searchRepository(index, body);
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

  const body = {
    query: { range: { [field]: rangeFilter } },
    from: pagination.page * pagination.size,
    size: pagination.size,
    sort: [{ last_active: "asc" }],
  };

  const result = await searchRepository(index, body);
  if (result?.hits?.hits?.length) {
    return result.hits.hits.map((hit) => hit._id);
  } else {
    const error = new Error("Search not found");
    error.status = 404;
    throw error;
  }
};

export const querySearchService = async (index, query, pagination) => {
  const from = pagination.page * pagination.size;
  const size = pagination.size;

  const body = {
    query,
    from,
    size,
    sort: [{ last_active: "asc" }],
  };
  const result = await searchRepository(index, body);
  if (result?.hits?.hits?.length) {
    return {
      result: result?.hits?.hits?.map((hit) => hit._source) || [],
      is_next_page: result?.hits?.total.value > from + size || false,
    };
  } else {
    const error = new Error("Search not found");
    error.status = 404;
    throw error;
  }
};
