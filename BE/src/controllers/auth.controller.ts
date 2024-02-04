import { Request, Response, NextFunction } from "express";
import { findUserByEmail, addUser } from "../services/user.service";
import ApiError from "../classes/ApiError";
import { hash, random } from "../helpers/authHelper";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    throw new ApiError("Missing parameters", 400);
  }

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new ApiError("Email already exists", 409);
  }

  try {
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
    console.log(error);
    return res.sendStatus(400);
  }
};
