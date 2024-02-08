import express from "express";
import * as UserCtrl from "../controllers/user.controller";
import { isOwner } from "../middlewares/authMiddleware";

const userRoutes = express.Router();

userRoutes.get("/", UserCtrl.getUsers);
userRoutes.delete("/:id", isOwner, UserCtrl.deleteUser);
userRoutes.patch("/:id", isOwner, UserCtrl.updateUser);

export default userRoutes;
