import crypto from "crypto";
import config from "../config";
import { IYGOProDeckCard } from "../interfaces";

export const random = () => crypto.randomBytes(128).toString("base64");
export const hash = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(config.secret.AUTH_SECRET)
    .digest("hex");
};

export const mapYGOProDeckCardToModel = (card: IYGOProDeckCard) => ({
  cardId: card.id,
  name: card.name,
  type: card.type,
  frameType: card.frameType,
  desc: card.desc,
  atk: card.atk,
  def: card.def,
  level: card.level,
  race: card.race,
  attribute: card.attribute,
  archetype: card.archetype,
  ygoprodeck_url: card.ygoprodeck_url,
  card_image: card.card_images[0],
});
