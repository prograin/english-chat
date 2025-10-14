export const paginationMiddleware = (req, res, next) => {
  const page = parseInt(req.query.page) || 0;
  const size = parseInt(req.query.size) || 5;

  const searchAfter = req.query.search_after || null;

  req.pagination = { page, size, searchAfter };
  next();
};
