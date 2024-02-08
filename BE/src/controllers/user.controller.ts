import { Request, Response, NextFunction } from "express";
import * as UserSrvc from "../services/user.service";
import ApiError from "../classes/ApiError";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = req.params.page ? parseInt(req.params.page) : 1;
  const limit = req.params.limit ? parseInt(req.params.limit) : 1;
  try {
    const users = await UserSrvc.findUsers({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedUser = await UserSrvc.deleteUserById(req);

    return res.status(200).json({
      status: 200,
      data: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};
