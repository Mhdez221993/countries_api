import express from "express";
import { getAuthRoutes } from "./auth";
import { getUserRoutes } from "./countries";


function getRoutes() {
  const router = express.Router();

  // router.use() prefixes our route (i.e. /api/v1/auth)
  router.use("/auth", getAuthRoutes());
  router.use("/countries", getUserRoutes());

  return router;
}

export { getRoutes };
