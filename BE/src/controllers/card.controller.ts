import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import CardSrvc from "../services/card.service";
import ApiError from "../classes/ApiError";
import { ICard } from "interfaces";

const getCardsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      throw new ApiError("Missing params", 400);
    }

    const cards = await CardSrvc.findCardsByUserId(userId);
    return res.status(200).json({
      status: 200,
      data: cards,
    });
  } catch (error) {
    next(error);
  }
};

const addCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cardParams = req.body as ICard;

    const currentUserId = get(req, "identity._id") as string;

    const newCard = await CardSrvc.addCardByUserId(currentUserId, {
      ...cardParams,
    });

    return res.status(201).json({
      status: 200,
      data: newCard,
    });
  } catch (error) {
    next(error);
  }
};

const CardCtrl = {
  getCardsByUserId,
  addCard,
};

export default CardCtrl;
