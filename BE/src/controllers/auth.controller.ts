import { Request, Response, NextFunction } from "express";
import * as AuthSrvc from "../services/auth.service";
import * as logging from "../config/logging";

const NAMESPACE = "AuthController";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await AuthSrvc.registerUser(req);
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
    const user = await AuthSrvc.loginUser(req);
    res.cookie("x-user-auth", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (error) {
    logging.info(NAMESPACE, "Error occured when logging in user");
    next(error);
  }
};
