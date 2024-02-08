import express from "express";

import { isAuthenticated } from "../middlewares/authMiddleware";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

const router = express.Router();

export default (): express.Router => {
  router.use("/auth", authRoutes);
  router.use("/user", isAuthenticated, userRoutes);
  return router;
};
