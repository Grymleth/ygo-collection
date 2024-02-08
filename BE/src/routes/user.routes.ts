import express from "express";
import * as UserCtrl from "../controllers/user.controller";
import { isAuthenticated, isOwner } from "../middlewares/authMiddleware";

const userRoutes = express.Router();

userRoutes.get("/", UserCtrl.getUsers);
userRoutes.delete("/:id", isOwner, UserCtrl.deleteUser);

export default userRoutes;
