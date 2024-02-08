import express from "express";
import * as AuthCtrl from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/register", AuthCtrl.register);
authRouter.post("/login", AuthCtrl.login);

export default authRouter;
