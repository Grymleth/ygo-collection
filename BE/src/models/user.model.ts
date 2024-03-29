import mongoose from "mongoose";
import { CardSchema } from "./card.model";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  cards: { type: [CardSchema], select: false },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
