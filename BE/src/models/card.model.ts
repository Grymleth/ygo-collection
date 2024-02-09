import mongoose from "mongoose";

export const CardSchema = new mongoose.Schema({
  cardId: { type: Number, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  desc: { type: String, required: true },
  atk: { type: Number, required: false },
  def: { type: Number, required: false },
  level: { type: Number, required: false },
  race: { type: String, required: true },
  attritibute: { type: String, required: false },
  archetype: { type: String, required: false },
  ygoprodeck_url: { type: String, required: true },
  card_image: {
    image_url: { type: String, required: true },
    image_url_small: { type: String, required: true },
    image_url_cropped: { type: String, required: true },
  },
  qty: { type: Number, required: true },
});

const CardModel = mongoose.model("Card", CardSchema);

export default CardModel;
