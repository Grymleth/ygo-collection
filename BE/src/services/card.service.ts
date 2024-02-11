import UserModel from "../models/user.model";

const findCardsByUserId = async (userId: string) => {
  const user = await UserModel.findById(userId).select("+cards");

  return user.cards;
};

const addCardByUserId = async (userId: string, values: Record<string, any>) => {
  const updated = await UserModel.findByIdAndUpdate(userId, {
    $push: { cards: values },
  }).select("+cards");

  return updated.cards;
};

const CardSrvc = {
  findCardsByUserId,
  addCardByUserId,
};

export default CardSrvc;
