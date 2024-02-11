import express from "express";
import CardCtrl from "../controllers/card.controller";
import { isAuthenticated } from "../middlewares/authMiddleware";

const cardRouter = express.Router();

cardRouter.get("/search/findByUserId/:userId", CardCtrl.getCardsByUserId);
cardRouter.post("/", isAuthenticated, CardCtrl.addCard);

export default cardRouter;
