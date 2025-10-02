import { termsSearchService, rangeSearchService } from "../services/search.service";

export const termsSearchController = async (req, res, next) => {
  try {
    const { index, field, values } = req.query;
    const pagination = req.pagination;

    if (!values) return res.status(400).json({ error: "values is required" });

    let parsedValues;
    try {
      parsedValues = JSON.parse(values);
    } catch {
      return res.status(400).json({ error: "values must be a valid JSON array" });
    }

    const result = await termsSearchService(index, field, parsedValues, pagination);

    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

export const rangeSearchController = async (req, res, next) => {
  try {
    const { index, field, gte, lte } = req.query;
    const pagination = req.pagination;

    const result = await rangeSearchService(index, field, gte, lte, pagination);

    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};
