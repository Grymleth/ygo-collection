import express, { Request, Response, NextFunction } from "express";
import { get, merge } from "lodash";

import { findUserBySessionToken } from "../services/user.service";
import ApiError from "../classes/ApiError";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies["x-user-auth"];

    if (!sessionToken) {
      throw Error("No token provided");
    }

    const existingUser = await findUserBySessionToken(sessionToken);

    if (!existingUser) {
      throw Error("User does not exist");
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    const apiError = new ApiError(error.message, 400);
    next(apiError);
  }
};
