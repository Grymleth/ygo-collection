import { Request, Response, NextFunction } from "express";
import { findUserByEmail, addUser } from "../services/user.service";
import ApiError from "../classes/ApiError";
import { hash, random } from "../helpers/authHelper";
import * as logging from "../config/logging";

const NAMESPACE = "AuthController";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      throw new ApiError("Missing parameters", 400);
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      throw new ApiError("Email already exists", 409);
    }

    const salt = random();
    const user = await addUser({
      email,
      username,
      authentication: {
        salt,
        password: hash(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError("Missing parameters", 400);
    }

    const user = await findUserByEmail(email).select(
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

    res.cookie("x-user-auth", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (error) {
    logging.info(NAMESPACE, "Error occured when logging in user", error);
    next(error);
  }
};
