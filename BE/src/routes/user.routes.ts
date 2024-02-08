import express from "express";
import * as UserCtrl from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/authMiddleware";

const userRoutes = express.Router();

userRoutes.get("/", isAuthenticated, UserCtrl.getUsers);

export default userRoutes;
