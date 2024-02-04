import express from "express";
import * as AuthCtrl from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", AuthCtrl.register);
router.post("/login", AuthCtrl.login);

export default router;
