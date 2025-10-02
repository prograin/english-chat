import { Router } from "express";

import { termsSearchController, rangeSearchController } from "../controllers/search.controller.js";
import { paginationMiddleware } from "../middlewares/pagination.middleware.js";

const router = Router();

router.get("/terms", paginationMiddleware, termsSearchController);
router.get("/range", paginationMiddleware, rangeSearchController);

export default router;
