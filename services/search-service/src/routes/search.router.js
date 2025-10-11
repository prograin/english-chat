import { Router } from "express";

import { termsSearchController, rangeSearchController, querySearchController } from "../controllers/search.controller.js";
import { paginationMiddleware } from "../middlewares/pagination.middleware.js";

import { allowRole } from "../middlewares/allow-role.middleware.js";

const router = Router();

router.get("/terms", allowRole("admin"), paginationMiddleware, termsSearchController);
router.get("/range", allowRole("admin"), paginationMiddleware, rangeSearchController);
router.post("/query", allowRole("admin"), paginationMiddleware, querySearchController);

export default router;
