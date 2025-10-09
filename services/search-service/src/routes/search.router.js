import { Router } from "express";

import { termsSearchController, rangeSearchController, advancedSearchController } from "../controllers/search.controller.js";
import { paginationMiddleware } from "../middlewares/pagination.middleware.js";

import { allowRole } from "../middlewares/allow-role.middleware.js";

const router = Router();

router.get("/terms", allowRole("admin"), paginationMiddleware, termsSearchController);
router.get("/range", allowRole("admin"), paginationMiddleware, rangeSearchController);
router.get("/advanced", allowRole("admin"), paginationMiddleware, advancedSearchController);

export default router;
