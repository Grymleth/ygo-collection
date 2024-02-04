import express from "express";
import * as UserCtrl from "../controllers/user.controller";

const router = express.Router();

router.get("/", UserCtrl.getUsers);

export default router;
