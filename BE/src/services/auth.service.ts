import { Request } from "express";
import ApiError from "../classes/ApiError";
import * as UserSrvc from "../services/user.service";
import { hash, random } from "../helpers/authHelper";

export const registerUser = async (req: Request) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    throw new ApiError("Missing parameters", 400);
  }

  const existingUser = await UserSrvc.findUserByEmail(email);

  if (existingUser) {
    throw new ApiError("Email already exists", 409);
  }

  const salt = random();
  const user = await UserSrvc.addUser({
    email,
    username,
    authentication: {
      salt,
      password: hash(salt, password),
    },
  });

  return user;
};

export const loginUser = async (req: Request) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError("Missing parameters", 400);
  }

  const user = await UserSrvc.findUserByEmail(email).select(
    "+authentication.salt +authentication.password +authentication.token"
  );

  if (!user) {
    throw new ApiError("Email does not exist", 401);
  }

  const hashedPassword = hash(user.authentication.salt, password);

  if (user.authentication.password !== hashedPassword) {
    throw new ApiError("Password is incorrect", 401);
  }

  const salt = random();
  user.authentication.sessionToken = hash(salt, user._id.toString());

  await user.save();

  return user;
};
