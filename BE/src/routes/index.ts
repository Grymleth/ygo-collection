import express from "express";

import { isAuthenticated } from "../middlewares/authMiddleware";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import cardRoutes from "./card.routes";

const router = express.Router();

export default (): express.Router => {
  router.use("/auth", authRoutes);
  router.use("/user", isAuthenticated, userRoutes);
  router.use("/card", isAuthenticated, cardRoutes);
  return router;
};
